import mongoose from "mongoose";
const UserHabitSchema= mongoose.Schema(
    {
    state: { type: String, default:"ACTIVE"},
    created: {type: Date, default:Date.now()},
    habit: {type: mongoose.Schema.Types.ObjectId, required:true, ref:'Habit'},
    user:{type: mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
    desired_impact:{type: String, required:true},
    random:{type: Number, required:true},
    }
);
export const HabitsSelected = mongoose.model("HabitsSelected", UserHabitSchema);