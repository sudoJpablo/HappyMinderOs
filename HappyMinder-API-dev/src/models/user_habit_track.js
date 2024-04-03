import mongoose from "mongoose";
const UserHabitTrackSchema= mongoose.Schema(
    {
    date: {type: String, required:true, trim:true},
    habitSelected: {type: mongoose.Schema.Types.ObjectId, required:true, ref:'HabitsSelected'},
    user: {type: mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
    action:{type: String, required:true, trim:true}    
    }
);
export const HabitTrack = mongoose.model("HabitTrack", UserHabitTrackSchema);