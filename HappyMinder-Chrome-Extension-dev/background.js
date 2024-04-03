"use strict";

/* global chrome, URL */
const url = "http://localhost:4001/graphql";
const options = {
    body: '',
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    method: "POST"
}

let urls = [{url: "", date: "",n: 0}];


function instalationInitStorage() {
    chrome.storage.local.get(function (local) {
        if (!Array.isArray(local.blocked)) {
            chrome.storage.local.set({ blocked: [] });
        }
        if (!Array.isArray(local.temporarilyEnabled)) {
            chrome.storage.local.set({ temporarilyEnabled: [] });
        }
        if (typeof local.doneHabitAt !== "string") {
            let currentTime = (new Date()).toJSON();
            chrome.storage.local.set({ doneHabitAt: currentTime });
        }
        if (!local.freeTime) {
            // default free time 15 minutes
            chrome.storage.local.set({ freeTime: 15 });
        }
        if (!local.alertTime) {
            // default alert time 60 minutes
            chrome.storage.local.set({ alertTime: 60 });
        }
        if (!local.runningHabit) {
            // default running habbit 0 (boolean value)
            chrome.storage.local.set({ runningHabit: 0 });
        }
        if (!local.runningHabitID) {
            // default running habbit id
            chrome.storage.local.set({ runningHabitID: 0 });
        }
    });
};

function validateUrl(url) {
    if (!url || !url.startsWith("http")) {
        return false;
    }
    return true;
}

function checkTemporarilyEnabled(temporarilyEnabled, doneHabitAt, freeTime) {
    if (Array.isArray(temporarilyEnabled) && temporarilyEnabled.length > 0) {
        let now = new Date();
        let doneAt = new Date(doneHabitAt);
        let diff = parseInt(Math.abs(doneAt.getTime() - now.getTime()) / (1000 * 60) % 60);
        if (diff >= freeTime) {
            chrome.storage.local.set({ blocked: temporarilyEnabled });
            chrome.storage.local.set({ temporarilyEnabled: [] });
            chrome.storage.local.set({ runningHabit: 0 });
            return false;
        }
    }
    return true;
};

function blockUrl(blocked, hostname,freeTime,user) {
    if (Array.isArray(blocked) && blocked.find(domain => hostname.includes(domain))) {
        UrlTime(hostname,freeTime,user);
        var newURL = chrome.runtime.getURL('minder.html');
        chrome.tabs.update(undefined, { url: newURL });
    }
};

function doneUrl(blocked, hostname,freeTime,user) {
    if (Array.isArray(blocked) && blocked.find(domain => hostname.includes(domain))) {
        UrlTime(hostname,freeTime,user);
        var newURL = chrome.runtime.getURL('done.html');
        chrome.tabs.update(undefined, { url: newURL });
    }
};

chrome.runtime.onInstalled.addListener(function () { instalationInitStorage(); });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    const url = tab.url;
    if (validateUrl(url)) {
        const hostname = new URL(url).hostname;
        
        chrome.storage.local.get(function (s) {
            if (checkTemporarilyEnabled(s.temporarilyEnabled, s.doneHabitAt, s.freeTime)) {
                blockUrl(s.blocked, hostname,s.freeTime,s.user.id);
            } else {
                doneUrl(s.blocked, hostname,s.freeTime,s.user.id);
            }
        });
    }
});

async function UrlTime(urlOrigin, time, user) {
    try {
        let dateComplet = new Date();
        let date = dateToDMY(dateComplet);
        let findOb = urls.find(item => item.url === urlOrigin);

        if (findOb) {
            let rest = dateComplet - new Date(findOb.date);
            var restInMin = (rest / 1000) / 60;

            if (restInMin > time) {
                options.body = JSON.stringify({
                    query: `mutation createOrUpdatePagetime($input: pageTimeInput) {
                        createOrUpdatePagetime(input: $input) {
                            id
                        }
                    }`,
                    variables: {
                        input: {
                            user: user,
                            time: time,
                            url: urlOrigin,
                            date: date
                        }
                    }
                });

                const response = await fetch("http://localhost:4001/graphql", options);
                const result = await response.json();
                console.log(urls);
                return result;
            } else {
                console.log("No se pudo");
                return 0;
            }
        } else {
            urls.push({ url: urlOrigin, date: dateComplet });
            options.body = JSON.stringify({
                query: `mutation createOrUpdatePagetime($input: pageTimeInput) {
                    createOrUpdatePagetime(input: $input) {
                        id
                    }
                }`,
                variables: {
                    input: {
                        user: user,
                        time: time,
                        url: urlOrigin,
                        date: date
                    }
                }
            });

            const response = await fetch("http://localhost:4001/graphql", options);
            const result = await response.json();
            console.log(urls);
            return result;
        }

    } catch (error) {
        console.error("Error in UrlTime:", error);
        throw new Error("Error in UrlTime");
    }
}


var dateToDMY = function (date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
}


