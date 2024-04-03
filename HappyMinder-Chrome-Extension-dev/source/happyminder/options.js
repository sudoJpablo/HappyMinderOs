var optionsModule = (function () {

    const url = "http://localhost:4001/graphql";
    const options = {
        body: '',
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        method: "POST"
    }

    const $primaryContent = $('#primary-content');
    const $loginContent = $('#login-content');
    const $userIdProfile = $('#user-id');
    const $userNameProfile = $('#user-name');

    const $habitsMenu = $('.habits');
    const $staticsMenu = $('.statics');
    const $linksMenu = $('.links');
    const $profileMenu = $('.profile');
    const $formMenu = $('.form');

    const $habitsBtn = $('#show-habits');
    const $staticsBtn = $('#show-statics');
    const $linksBtn = $('#show-links');
    const $profileBtn = $('#show-profile');
    const $formBtn = $('#show-form');
    const onBtnClass = 'bg-color-dark';
    const offBtnClass = 'bg-color-lighter';
    const $saveCategoryBtn = $('#category-save');

    const $categoryList = $('#category-habits');

    const $urlDataTable = $('#t-url');
    const $urlInput = $('#input-url');
    const $freeTimeInput = $('#input-free-time');

    var allUserCategories;

    var storage = {};
    var initializeStorage = function (localStorage) {
        storage = localStorage;
    }

    var showCategoriesMenu = function () {
        $habitsMenu.show();
        $habitsBtn.removeClass(offBtnClass);
        $habitsBtn.addClass(onBtnClass);

        $staticsMenu.hide();
        $staticsBtn.addClass(offBtnClass);
        $staticsBtn.removeClass(onBtnClass);
        
        $linksMenu.hide();
        $linksBtn.addClass(offBtnClass);
        $linksBtn.removeClass(onBtnClass);

        $profileMenu.hide();
        $profileBtn.addClass(offBtnClass);
        $profileBtn.removeClass(onBtnClass);

        $formMenu.hide();
        $formBtn.addClass(offBtnClass);
        $formBtn.removeClass(onBtnClass);
    };

    var showLinksMenu = function () {
        $habitsMenu.hide();
        $habitsBtn.addClass(offBtnClass);
        $habitsBtn.removeClass(onBtnClass);

        $staticsMenu.hide();
        $staticsBtn.addClass(offBtnClass);
        $staticsBtn.removeClass(onBtnClass);

        $linksMenu.show();
        $linksBtn.removeClass(offBtnClass);
        $linksBtn.addClass(onBtnClass);

        $profileMenu.hide();
        $profileBtn.addClass(offBtnClass);
        $profileBtn.removeClass(onBtnClass);

        $formMenu.hide();
        $formBtn.addClass(offBtnClass);
        $formBtn.removeClass(onBtnClass);
    };

    var showProfileMenu = function () {
        $habitsMenu.hide();
        $habitsBtn.addClass(offBtnClass);
        $habitsBtn.removeClass(onBtnClass);

        $staticsMenu.hide();
        $staticsBtn.addClass(offBtnClass);
        $staticsBtn.removeClass(onBtnClass);

        $linksMenu.hide();
        $linksBtn.addClass(offBtnClass);
        $linksBtn.removeClass(onBtnClass);

        $profileMenu.show();
        $profileBtn.removeClass(offBtnClass);
        $profileBtn.addClass(onBtnClass);

        $formMenu.hide();
        $formBtn.addClass(offBtnClass);
        $formBtn.removeClass(onBtnClass);
    };

    var showStaticsMenu = function (){
        $habitsMenu.hide();
        $habitsBtn.addClass(offBtnClass);
        $habitsBtn.removeClass(onBtnClass);

        $staticsMenu.show();
        $staticsBtn.removeClass(offBtnClass);
        $staticsBtn.addClass(onBtnClass);

        $linksMenu.hide();
        $linksBtn.addClass(offBtnClass);
        $linksBtn.removeClass(onBtnClass);

        $profileMenu.hide();
        $profileBtn.addClass(offBtnClass);
        $profileBtn.removeClass(onBtnClass);

        $formMenu.hide();
        $formBtn.addClass(offBtnClass);
        $formBtn.removeClass(onBtnClass);
    };

    var showFormMenu = function () {
        $habitsMenu.hide();
        $habitsBtn.addClass(offBtnClass);
        $habitsBtn.removeClass(onBtnClass);

        $staticsMenu.hide();
        $staticsBtn.addClass(offBtnClass);
        $staticsBtn.removeClass(onBtnClass);

        $linksMenu.hide();
        $linksBtn.addClass(offBtnClass);
        $linksBtn.removeClass(onBtnClass);

        $profileMenu.hide();
        $profileBtn.addClass(offBtnClass);
        $profileBtn.removeClass(onBtnClass);

        $formMenu.show();
        $formBtn.removeClass(offBtnClass);
        $formBtn.addClass(onBtnClass);
    };

     // Función para mostrar u ocultar la contraseña
     function togglePasswordVisibility() {
        var passwordField = $('#password');
        if (passwordField.attr('type') === 'password') {
            passwordField.attr('type', 'text');
        } else {
            passwordField.attr('type', 'password');
        }
    }

    var loadContentByUser = function () {
        if (storage.user) {
            $primaryContent.show();
            $loginContent.hide();
            $userIdProfile.html(storage.user.id);
            $userNameProfile.html(storage.user.name);
        } else {
            $primaryContent.hide();
            $loginContent.show();
            $loginContent.html(
                `
                <button id="login-btn" class="btn btn-secondary">Iniciar Sesión</button>
                <button id="register-btn" class="btn btn-secondary">Registrar</button>
                `
            );
            
            // Al hacer clic en "Iniciar Sesión", muestra la opción para seleccionar si tiene o no contraseña
            $('#login-btn').on('click', function () {
                $loginContent.html(
                    `
                    <div class="btn-group" id="passwordOptions" role="group">
                        <button id="has-password" type="button" class="btn btn-secondary">Usuario con contraseña</button>
                        <button id="no-password" type="button" class="btn btn-secondary">Usuario sin contraseña</button>
                    </div>
                    `
                );
            
                // Al hacer clic en "Usuario con contraseña", muestra los campos de ingreso
                $('#has-password').on('click', function () {
                    $loginContent.html(
                        `
                        <div class="form-group">
                            <label for="username">Nombre de usuario:</label>
                            <input type="text" class="form-control" id="username" placeholder="Ingresa tu nombre de usuario">
                        </div>
                        <div class="form-group" id="passwordField">
                            <label for="password">Contraseña:</label>
                            <div class="input-group">
                                <input type="password" class="form-control" id="password" placeholder="Ingresa tu contraseña">
                                <div class="input-group-append">
                                    <button id="toggle-password" class="btn btn-outline-secondary" type="button">
                                        <span class="fas fa-eye"></span>
                                    </button>
                                </div>
                            </div>    
                        </div>
                        <button id="login-in" type="button" class="btn btn-secondary">Ingresar</button>
                        `
                    );
                    $('#toggle-password').on('click', togglePasswordVisibility);
                    $('#login-in').on("click", function () { ValidateUser() });
                });
            
                // Al hacer clic en "Usuario sin contraseña", muestra el mensaje y campo para crear la contraseña
                $('#no-password').on('click', function () {
                    $loginContent.html(
                        `
                        <p>Para tu cuenta necesitas crear una contraseña.</p>
                        <div class="form-group">
                            <label for="username">Nombre de usuario:</label>
                            <input type="text" class="form-control" id="username" placeholder="Ingresa tu nombre de usuario">
                        </div>
                        <div class="form-group" id="passwordField">
                            <label for="password">Nueva Contraseña:</label>
                            <div class="input-group">
                                <input type="password" class="form-control" id="password" placeholder="Ingresa tu contraseña">
                                <div class="input-group-append">
                                    <button id="toggle-password" class="btn btn-outline-secondary" type="button">
                                        <span class="fas fa-eye"></span>
                                    </button>
                                </div>
                            </div>   
                        </div>
                        <button id="login-in" type="button" class="btn btn-secondary">Ingresar</button>
                        `
                    );
                    $('#toggle-password').on('click', togglePasswordVisibility);
                    $('#login-in').on("click", function () { ValidateOldUser() });
                });
            });
            
            // Al hacer clic en "Registrar", muestra los campos de usuario y contraseña
            $('#register-btn').on('click', function () {
                $loginContent.html(
                    `
                    <div class="form-group">
                        <label for="username">Nombre de usuario:</label>
                        <input type="text" class="form-control" id="username" placeholder="Ingresa tu nombre de usuario">
                    </div>
                    <div class="form-group" id="passwordField">
                        <label for="password">Contraseña:</label>
                        <div class="input-group">
                            <input type="password" class="form-control" id="password" placeholder="Ingresa tu contraseña">
                            <div class="input-group-append">
                                <button id="toggle-password" class="btn btn-outline-secondary" type="button">
                                    <span class="fas fa-eye"></span>
                                </button>
                            </div>
                        </div>   
                    </div>
                    <button id="register" type="button" class="btn btn-secondary">Registrar</button>
                    `
                );
                $('#toggle-password').on('click', togglePasswordVisibility);
                $('#register').on("click", function () { createUser() });
            });
            
        }
    }

/*     //document.getElementById('logout-btn').addEventListener('click', logout);
    var logout = function () {
        console.log('La función logout se ha llamado.');
        // Eliminar la información del usuario del almacenamiento local
        chrome.storage.local.remove('user', function() {
            console.log('Usuario eliminado del almacenamiento local');
            //window.location.href = '/options.html';
            //location.reload();
            
        });
        //loadContentByUser();
        //window.location.href = '/options.html';

        // Redirigir al usuario a la sección de inicio de sesión
         // Esta función mostrará la sección de inicio de sesión
    } */

    // Espera a que el documento HTML esté completamente cargado
    document.addEventListener('DOMContentLoaded', function() {
        // Encuentra el botón por su ID
        var logoutButton = document.getElementById('logout-btn');

        // Agrega un manejador de evento al botón
        logoutButton.addEventListener('click', function() {
            logout(); // Llama a la función logout al hacer clic en el botón
        });
    });


    async function logout() {
        console.log('La función logout se ha llamado.');
        // Eliminar la información del usuario del almacenamiento local
        await chrome.storage.local.set({ temporarilyEnabled: [] }, function() {
            console.log('temporarilyEnabled ha sido creada con un nuevo valor');
            });
        await chrome.storage.local.remove('user', function() {
            console.log('Usuario eliminado del almacenamiento local');
            // Redirigir al usuario a la página de inicio de sesión
            localStorage.removeItem('hasRun');
            location.reload();
        });
    }

    var createUser = async function () {
        try {
            let username = $('#username').val();
            let password = $('#password').val();
            if (!password){
                password = '';
            }
            console.log(password);
            if (username.length == 0) username = 'user';
            options['body'] = `{"query":"mutation createNewUser($input: UserInput) {createNewUser(input: $input) {id, user_name}}","variables":{"input":{"user_name":"${username}", "password":"${password}"}}}`;
            const response = await fetch(url, options);
            const user = await response.json();
            console.log("Usuario ", user);
            await registerUserStorageCreateNewUser(user);
        } catch (error) {
            console.log(error);
            $loginContent.html(
                `<div class="alert alert-danger" role="alert">
                Error al registrar
                </div>`
            );
            setTimeout(function () {
                loadContentByUser();
              }, 2000);
            

        }
    }

    var ValidateOldUser = async function () {
        try {
            let username = $('#username').val();
            let password = $('#password').val();
            if (!password){
                console.log(error);
                setTimeout(function () {
                    return loadContentByUser();
                  }, 2000);
                
                password = '';
            }
            console.log(password);
            if (username.length == 0) username = 'user';
            options['body'] = `{"query":"mutation ValidateOldUser($input: UserInput) {ValidateOldUser(input: $input) {id, user_name}}","variables":{"input":{"user_name":"${username}", "password":"${password}"}}}`;
            const response = await fetch(url, options);
            const user = await response.json();
            console.log("Usuario ", user);
            await registerUserStorageValidateOldUser(user);
        } catch (error) {
            console.log(error);
            $loginContent.html(
                `<div class="alert alert-danger" role="alert">
                Error al iniciar sesión
                </div>`
            );
            setTimeout(function () {
                loadContentByUser();
              }, 2000);
            

        }
    }

    var ValidateUser = async function () {
        try {
            let username = $('#username').val();
            let password = $('#password').val();
            if (!password){
                console.log(error);
                setTimeout(function () {
                    return loadContentByUser();
                  }, 2000);
                
                password = '';
            }
            console.log(password);
            if (username.length == 0) username = 'user';
            options['body'] = `{"query":"mutation ValidateUser($input: UserInput) {ValidateUser(input: $input) {id, user_name}}","variables":{"input":{"user_name":"${username}", "password":"${password}"}}}`;
            const response = await fetch(url, options);
            const user = await response.json();
            console.log("Usuario ", user);
            await registerUserStorageValidateUser(user);
        } catch (error) {
            console.log(error);
            $loginContent.html(
                `<div class="alert alert-danger" role="alert">
                Error al iniciar sesión
                </div>`
            );
            setTimeout(function () {
                loadContentByUser();
              }, 2000);
            

        }
    }

/*     var createUserNoPassword = async function () {
        try {
            let username = $('#username').val();
            console.log(username);
            if (username.length == 0) username = 'user';
            options['body'] = `{"query":"mutation ValidateUserNotPassword($input: UserInput) {ValidateUserNotPassword(input: $input) {id, user_name}}","variables":{"input":{"user_name":"${username}"}}}`;
            const response = await fetch(url, options);
            const user = await response.json();
            console.log("Usuario ", user);
            await registerUserStorage(user);
        } catch (error) {
            console.log(error);
            $loginContent.html(
                `<div class="alert alert-danger" role="alert">
                Error al iniciar sesión
                </div>`
            );
            setTimeout(function () {
                loadContentByUser();
              }, 2000);
            

        }
    } */

    var registerUserStorageCreateNewUser = async (user) => {
        let idUser = user.data.createNewUser.id;
        let nameUser = user.data.createNewUser.user_name;
        chrome.storage.local.set({ user: { id: idUser, name: nameUser } }, function () {
            console.log('User ID is set to ' + idUser);
        });
        location.reload();
    }

    var registerUserStorageValidateOldUser = async (user) => {
        let idUser = user.data.ValidateOldUser.id;
        let nameUser = user.data.ValidateOldUser.user_name;
        chrome.storage.local.set({ user: { id: idUser, name: nameUser } }, function () {
            console.log('User ID is set to ' + idUser);
        });
        location.reload();
    }

    var registerUserStorageValidateUser = async (user) => {
        let idUser = user.data.ValidateUser.id;
        let nameUser = user.data.ValidateUser.user_name;
        chrome.storage.local.set({ user: { id: idUser, name: nameUser } }, function () {
            console.log('User ID is set to ' + idUser);
        });
        location.reload();
    }

    var cont = function(date,Jdata){
        // Inicializar el contador
        var count = 0;

        // Recorrer el JSON
        for (var i = 0; i < Jdata.data.trackHabitsByUser.length; i++) {
            // Verificar si la fecha en el elemento actual es igual a la fecha específica
            if (data[i].date === date) {
                count++;
            }
        }
        return count
    }

    var graphic =async function(){
            const options = {
                body: '',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                method: "POST"
            }
            let query = { "query": `query {trackHabitsByUser(userId:"${storage.user.id}"){action, date} pagetimesByUser(userId:"${storage.user.id}"){time, date}}` };
            options['body'] = JSON.stringify(query);
            const response = await fetch(url, options);
            const data = await response.json();
            
            // Crear un arreglo para almacenar los nombres de los días de la semana
            var labels = [];
            // Crear un arreglo para almacenar las fechas formateadas
            var formattedDates = [];
            var datafil=[];
            var dataUrlfil=[];
            var days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

            var currentDate = new Date();

            for (var i = 0; i < 7; i++) {
                var previousDate = new Date(currentDate);
                previousDate.setDate(currentDate.getDate() - i);

                formattedDates.push(
                    previousDate.getDate().toString().padStart(2, '0') + '-' +
                    (previousDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
                    previousDate.getFullYear()
                );

                // Obtener el nombre del día de la semana y agregarlo al arreglo de días de la semana
                var day = days[previousDate.getDay()];
                labels.push(day);
            }

            formattedDates.reverse();
            labels.reverse();
            for(var i= 0;i<7;i++){
                var count = 0;
                var minutes = 0;
                for (var j = 0; j <data.data.trackHabitsByUser.length; j++) {
                    if (data.data.trackHabitsByUser[j].date == formattedDates[i] && data.data.trackHabitsByUser[j].action.toUpperCase() == "DONE" ) {
                        count++;
                    }
                }
                for(var j = 0; j <data.data.pagetimesByUser.length; j++){
                    if (data.data.pagetimesByUser[j].date == formattedDates[i]) {
                        minutes += parseInt( data.data.pagetimesByUser[j].time, 10);
                    }
                }
                dataUrlfil.push(minutes)
                datafil.push(count);
            }
            
            // Obtener una referencia al elemento canvas del DOM
            const $graph = document.querySelector("#grafica");

            const habitsMade = {
                label: "Habitos Realizados",
                data: datafil, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
                backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo
                borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
                borderWidth: 1,// Ancho del borde
                yAxisID: 'y-axis-1', // Identificador del eje Y para este conjunto de datos
            };
            const appUsageTime = {
                label: "Tiempo de uso de Aplicaciones en minutos",
                data: dataUrlfil, // Los datos de 2021, asegúrate de que tengan la misma cantidad de valores que las etiquetas
                backgroundColor: 'rgba(51, 202, 223, 0.2)', // Color de fondo
                borderColor: 'rgba(51, 202, 223, 1)', // Color del borde
                borderWidth: 1, // Ancho del borde
                yAxisID: 'y-axis-2', // Identificador del eje Y para este conjunto de datos
            };
            new Chart($graph, {
                type: 'line',// Tipo de gráfica
                data: {
                    labels: labels,
                    datasets: [
                        habitsMade,
                        appUsageTime,
                        // Aquí más datos...
                    ]
                },
                options: {
                    scales: {
                        yAxes:[
                            {
                                id: 'y-axis-1',
                                position: 'left',
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                            {
                                id: 'y-axis-2',
                                position: 'right',
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                }
            });
    }

    var tracking = async function (){
            const options = {
                body: '',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                method: "POST"
            }
            const optiooons = {
                body: '',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                method: "POST"
            }
            const optiowns = {
                body: '',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                method: "POST"
            }
            const defaultItem = {
                id: "60d36d8739c4ec57b0727874",
                message: "La cantidad de agua diaria recomendada son 2Lt. ¿Qué tal si comenzamos con un vaso?",
                timer_long: 30,
                url_image: "https://media.tenor.com/images/0b631d0205d7248e4c4a76ec03c3ef6e/tenor.gif",
                frequency: "daily"
            };
            let valuesPercentage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let query = { "query": `query {trackHabitsByUser(userId:"${storage.user.id}"){habitSelected, action}}` };
            options['body'] = JSON.stringify(query);
            const response = await fetch(url, options);
            const data = await response.json();

            let num = 1;
            let errorsHabitsID = 0;
            const promises = data.data.trackHabitsByUser.map(async (item) => {
                const habitId = item.habitSelected;
                const actionString = item.action.toUpperCase();

                num++;
                try{
                    let query2 = { "query": `query {userHabitsbyID(id:"${habitId}"){habit}}` };
                    optiooons['body'] = JSON.stringify(query2);
                    const response2 = await fetch(url, optiooons);
                    const data2 = await response2.json();
                    const userHabitID = data2.data.userHabitsbyID.habit;
                    let query3 = {"query": `query {habitById(id:"${userHabitID}"){desired_impact}}` };
                    optiowns['body'] = JSON.stringify(query3);
                    const response3 = await fetch(url, optiowns);
                    const data3 = await response3.json();
                    let DesiredImpact = data3.data.habitById.desired_impact;
                    if(actionString=="DONE"){
                        if(DesiredImpact=="Bienestar"){
                            valuesPercentage[0]++;
                        }
                        if(DesiredImpact=="Cultivar emociones positivas"){
                            valuesPercentage[2]++;
                        }
                        if(DesiredImpact=="Ejercicio"){
                            valuesPercentage[4]++;
                        }
                        if(DesiredImpact=="Nutrición"){
                            valuesPercentage[6]++;
                        }
                        if(DesiredImpact=="Organización"){
                            valuesPercentage[8]++;
                        }
                        if(DesiredImpact=="Ánimo"){
                            valuesPercentage[10]++;
                        }
                    }else if (actionString=="UNDONE"){
                        if(DesiredImpact=="Bienestar"){
                            valuesPercentage[1]++;
                        }
                        if(DesiredImpact=="Cultivar emociones positivas"){
                            valuesPercentage[3]++;
                        }
                        if(DesiredImpact=="Ejercicio"){
                            valuesPercentage[5]++;
                        }
                        if(DesiredImpact=="Nutrición"){
                            valuesPercentage[7]++;
                        }
                        if(DesiredImpact=="Organización"){
                            valuesPercentage[9]++;
                        }
                        if(DesiredImpact=="Ánimo"){
                            valuesPercentage[11]++;
                        }
                    }else{
                        console.log("El string de la accion no esta en los parametros Done y Undone");
                    }
                }
                catch{
                    console.log("Error al tratar de revisar el habito: ",habitId);
                    console.error();
                    errorsHabitsID++;
                };
            return Promise.resolve(); // o cualquier otra promesa que desees resolver
            });
            await Promise.all(promises);
            num=0;
            console.log("Cantidad de habitos erroneos: ", errorsHabitsID);
            return valuesPercentage;
    }



    var loadInformationBoxes = async function (){
        
        const data = [
            {
                title: "Bienestar",
                percentage: 50,
                icon: "source/icon/bienestar.png"
            },
            {
                title: "Cultivar emociones positivas",
                percentage: 80,
                icon: "source/icon/cultivaremociones.png"
            },
            {
                title: "Ejercicio",
                percentage: 100,
                icon: "source/icon/ejercicio.png"
            },
            {
                title: "Nutrición",
                percentage: 5,
                icon: "source/icon/nutricion.png"
            },
            {
                title: "Organización",
                percentage: 60,
                icon: "source/icon/organizacion.png"
            },
            {
                title: "Ánimo",
                percentage: 10,
                icon: "source/icon/animo.png"
            }
        ]; 
    
        const habitsTracked = await tracking();
    
        if (!habitsTracked) {
            console.error("Error: habitosTrackeados es undefined");
            return;
        }

        let i = 0;
        let pos = 0;
        let percentage = 0;
        let sum = 0;
        while(i < habitsTracked.length){
            if (habitsTracked[i] == 0){
                percentage = 0;
            }
            else{
                sum = habitsTracked[i] + habitsTracked[i+1];
                percentage = ((habitsTracked[i]/sum)*100).toFixed(2);
                
            }
            data[pos].percentage = percentage;
            i = i+2;
            pos++;
            
        }
        
         const optCategorias = {
            body: '',
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            method: "POST"
        }
        const infoContainer = document.getElementById('info-container');
        let query4 = {"query": `query {desiredImpactsByUser(userId:"${storage.user.id}")}` };
        optCategorias['body'] = JSON.stringify(query4);
        const response4 = await fetch(url, optCategorias);
        const data4 = await response4.json();
        const desiredImpactsData = data4.data && data4.data.desiredImpactsByUser;

        data.forEach(item => {
            if(desiredImpactsData.includes(item.title)){
            const infoBox = document.createElement('div');
            infoBox.className = 'info-box';

            const infoTitle = document.createElement('div');
            infoTitle.className = 'info-title';
            infoTitle.textContent = item.title;

            const icon = document.createElement('img');
            icon.className = 'icon';
            icon.src = item.icon;

            const progressBarContainer = document.createElement('div');
            progressBarContainer.className = 'progress-bar-container';

            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';

            const progressFill = document.createElement('div');
            progressFill.className = 'progress-fill';
            progressFill.style.width = item.percentage + '%';

            const percentage = document.createElement('span');
            percentage.className = 'percentage';
            percentage.textContent = item.percentage + '%';

            progressBar.appendChild(progressFill);
            progressBarContainer.appendChild(progressBar);
            progressBarContainer.appendChild(percentage);
            infoBox.appendChild(icon);
            infoBox.appendChild(infoTitle);
            // infoBox.appendChild(progressBar);
            infoBox.appendChild(progressBarContainer);

            infoContainer.appendChild(infoBox);
         }
    });
}

    var fetchCategories = async function () {
        try {
            options['body'] = '{"query":"{desiredImpacts}"}';
            const response = await fetch(url, options);
            const categories = await response.json();
            await showCategories(categories);

            let query = { "query": `query {desiredImpactsByUser (userId:"${storage.user.id}")}` };
            options['body'] = JSON.stringify(query);
            const r = await fetch(url, options);
            const userCategories = await r.json();
            await selectUserCategories(userCategories);

        } catch (error) {
            console.error(error)
            $saveCategoryBtn.prop("disabled", true);
            $categoryList.html(
                `<div class="alert alert-danger" role="alert">
                Sin conexión
                </div>`
            );
        }
    }

    var showCategories = async (categories) => {
        let items = [];
        let count = 1;
        $saveCategoryBtn.prop("disabled", false);
        categories.data.desiredImpacts.forEach((category) => {
            if (category !== null){
                let id = "category" + count;
                items.push(
                    `<div class="funkyradio-default">
                    <input type="checkbox" name="checkbox" class="category-checkbox" id="${id}" value="${category}"/>
                    <label for="${id}">${category}</label>
                    </div>`
                );
                count += 1;
            }
        });
        $categoryList.html(items.join(''));
    };

    var selectUserCategories = async (categories) => {
        allUserCategories = categories.data.desiredImpactsByUser;
        categories.data.desiredImpactsByUser.forEach((category) => {
            $(`:checkbox[value="${category}"]`).prop('checked', true);
        });
    };

    var saveCategoryUser = async function () {
        let selectedCategories = [];
        $('.category-checkbox:checked').each(function (i) {
            selectedCategories[i] = $(this).val();
        });
        let add = selectedCategories.filter(x => !allUserCategories.includes(x));
        let remove = allUserCategories.filter(x => !selectedCategories.includes(x));

        add.forEach((category) => {
            createHabitsUser(storage.user.id, category);
        });
        remove.forEach((category) => {
            removeHabitsUser(storage.user.id, category);
        });

        $.notify("Guardado exitosamente", "success");
    };

    var createHabitsUser = async function (user, category) {
        try {
            options['body'] = `{
                "query":"mutation createHabitsUser ($input: HabitsDesiredImpactInput){createHabitsUser(input:$input)}",
                "variables":{"input":{"user":"${user}","desiredImpact":"${category}"}}
            }`;
            const response = await fetch(url, options);
            const id = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    var removeHabitsUser = async function (user, category) {
        try {
            options['body'] = `{
                "query":"mutation deleteHabitsUserByCategory ($input: HabitsDesiredImpactInput){deleteHabitsUserByCategory(input:$input)}",
                "variables":{"input":{"user":"${user}","desiredImpact":"${category}"}}
            }`;
            const response = await fetch(url, options);
            const id = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    var initializeUrlDataTable = async function () {
        let query = { "query": `query{urls{user,url_name}}` };
        options['body'] = JSON.stringify(query);
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
    
        // Usuario específico a filtrar
        const userToFilter = storage.user.id;
    
        // Filtrar las URLs del usuario específico
        const filteredUrls = data.data.urls.filter(item => item.user === userToFilter);
    
        // Obtener solo los nombres de las URLs
        const userUrls = filteredUrls.map(item => item.url_name);
        console.log(userUrls);
    
        // Asegúrate de que el código solo se ejecute si la bandera en localStorage es falsa.
        // Lee el valor actual de la bandera desde localStorage.
        var hasRun = localStorage.getItem('hasRun');

        // Asegúrate de que el código solo se ejecute si la bandera en localStorage es falsa.
        if (!hasRun) {
            userUrls.forEach(url => {
                console.log(url);
                blockedUrl = storage.blocked;
                blockedUrl.push(url);
                chrome.storage.local.set({ blocked: blockedUrl });
            });

            // Establece la bandera en localStorage para indicar que el código ya se ha ejecutado.
            localStorage.setItem('hasRun', 'true');
        }
          storage.blocked.forEach(url => {
            console.log(url);
        });
          

        // Crear filas HTML para las URLs
        let items = userUrls.map(url => `
            <tr>
                <td>${url}</td>
                <td>
                    <button type="button" data-url="${url}" class="btn btn-sm btn-secondary remove-url">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `);
    
        // Insertar las filas en la tabla
        if (items.length > 0) {
            $('#tbody-url').html(items.join(''));
        }
    
        $urlDataTable.DataTable({
            "lengthChange": false,
            "pageLength": 5,
        });
    
        $('.remove-url').on("click", function () { removeUrl($(this).data('url')) });
    }

/*     var saveUrl = function () {
        var url = $urlInput.val();
        url = url.replace("https://", "");
        url = url.replace("http://", "");
        url = url.replace("www.", "");
        console.log("Guardando URL ", url);
        blockedUrl = storage.blocked;
        blockedUrl.push(url);
        chrome.storage.local.set({ blocked: blockedUrl });
        location.reload();
        
    }; */

    var saveUrl = async function () {
        var urlToSave = $urlInput.val();
        urlToSave = urlToSave.replace("https://", "");
        urlToSave = urlToSave.replace("http://", "");
        urlToSave = urlToSave.replace("www.", "");
        console.log("Guardando URL ", urlToSave);
    
        const userId = storage.user.id;

        // Crear un objeto de solicitud
        const request = {
            query: `
                mutation SaveNewUrl($input: SaveUrl) {
                    SaveNewUrl(input: $input) {
                        url_name,
                        user
                    }
                }
            `,
            variables: {
                input: {
                    url_name: urlToSave,
                    user: userId, // Reemplaza con el ID del usuario apropiado
                    date_creation: new Date().toISOString() // Puedes ajustar la fecha de creación
                }
            }
        };
    
        options.body = JSON.stringify(request);
    
        // Realizar la solicitud al servidor
        await fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log("URL guardada:", data);
        })
        .catch(error => {
            console.error("Error al guardar la URL:", error);
        });
        blockedUrl = storage.blocked;
        blockedUrl.push(urlToSave);
        chrome.storage.local.set({ blocked: blockedUrl });
        console.log("urlToSave", urlToSave);
        location.reload();
    };
    
    var removeUrl = async function (urlDelete){
        try {
           // Supongamos que tienes una URL que deseas eliminar, almacenada en la variable urlToDelete.
    
           // Utiliza el método filter para crear un nuevo array que excluya la URL que deseas eliminar.
           storage.blocked = storage.blocked.filter(url => url !== urlDelete);
    
           // Actualiza el almacenamiento local con el nuevo array.
           chrome.storage.local.set({ blocked: storage.blocked },function() {
               console.log(`URL ${urlDelete} eliminada de storage.blocked`);
    
               // Emite un evento personalizado para notificar al código 2 que storage.blocked se ha actualizado
               const updateBlockedEvent = new CustomEvent('updateBlocked', {
                   detail: {
                       updatedBlocked: storage.blocked
                   }
               });
               window.dispatchEvent(updateBlockedEvent);
           });
    
           console.log(urlDelete);
           userId = storage.user.id;
           console.log(userId);
           options['body'] = `{
               "query":"mutation deleteUrl($input: DeleteUrlInput){deleteUrl(input:$input)}",
               "variables":{"input":{"urlName":"${urlDelete}","userId":"${userId}"}}
           }`;
           const response = await fetch(url, options);
           const deleting = await response.json();
           await chrome.storage.local.set({ temporarilyEnabled: [] }, function() {
            console.log('temporarilyEnabled ha sido creada con un nuevo valor');
            });
           //storage.temporarilyEnabled = [];
           console.log(deleting);

            /**
             *en la siguiente linea se elimina la url que se encuentra de manera local
             */
             storage.blocked = storage.blocked.filter(url => url !== urlDelete);

           location.reload();
       } catch (error) {
           console.error(error);
       } 
    };

    var initializeFreeTimeModal = function () {
        $freeTimeInput.val(storage.freeTime)
    };

    var updateFreeTime = function () {
        const freeTime = $freeTimeInput.val();
        chrome.storage.local.set({ freeTime: freeTime });
        location.reload();
    };

    var tripettoForm = function () {
        var tripetto = TripettoServices.init({
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiS0IrZnJXNENlRDZwYVFQdXZZb1lmcDZDdVRtUnNDVy9QWFI5c2RYR1lGMD0iLCJkZWZpbml0aW9uIjoiY0VpTmtSUU5WcUovdThtMHAwY2U3b3BwNnFyZUdPWVo3MlZiTmRVdytUND0iLCJ0eXBlIjoiY29sbGVjdCJ9.GH822_qVmo2etby6lxYPJoyjn-2kT0Fy4RuVor69spU"
        });

        TripettoChat.run({
        element: document.getElementById("tripetto"),
        definition: tripetto.definition,
        styles: tripetto.styles,
        l10n: tripetto.l10n,
        locale: tripetto.locale,
        translations: tripetto.translations,
        attachments: tripetto.attachments,
        onSubmit: tripetto.onSubmit
        });
    };

    return {
        graphic: graphic,
        tracking: tracking,
        loadInformationBoxes: loadInformationBoxes,
        initializeStorage: initializeStorage,
        showCategories: showCategoriesMenu,
        showLinks: showLinksMenu,
        showProfile: showProfileMenu,
        showStatic: showStaticsMenu,
        showForm: showFormMenu,
        fetchCategories: fetchCategories,
        loadContentByUser: loadContentByUser,
        createUser: createUser,
        ValidateUser:ValidateUser,
        saveCategoryUser: saveCategoryUser,
        initializeUrlDataTable: initializeUrlDataTable,
        saveUrl: saveUrl,
        removeUrl: removeUrl,
        initializeFreeTimeModal: initializeFreeTimeModal,
        updateFreeTime: updateFreeTime,
        tripettoForm: tripettoForm,
    };
})();

$(document).ready(function () {
    chrome.storage.local.get(function (data) {
        storage = data;
        init(storage);
        optionsModule.tripettoForm();
    });
});

function init(storage) {
    optionsModule.initializeStorage(storage);
    $('#show-habits').on("click", function () { optionsModule.showCategories() });
    $('#show-links').on("click", function () { optionsModule.showLinks() });
    $('#show-profile').on("click", function () { optionsModule.showProfile() });
    $('#show-statics').on("click", function () { optionsModule.showStatic() });
    $('#show-form').on("click", function () { optionsModule.showForm() });
    $('#category-save').on("click", function () { optionsModule.saveCategoryUser() });
    $('#add-url').on("click", function () { optionsModule.saveUrl() });
    $('#modal-set-free-time').on('shown.bs.modal', function () { optionsModule.initializeFreeTimeModal() });
    $('#update-free-time').on("click", function () { optionsModule.updateFreeTime() });
    optionsModule.loadContentByUser();
    if (storage.user) optionsModule.fetchCategories();
    if (storage.user) optionsModule.initializeUrlDataTable();
    optionsModule.graphic();
    optionsModule.loadInformationBoxes();
    optionsModule.tracking();
}
