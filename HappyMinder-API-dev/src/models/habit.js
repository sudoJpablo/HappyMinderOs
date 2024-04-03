import mongoose from "mongoose";
const HabitSchema= mongoose.Schema(
    {
    url_image: { type: String, required:false, trim:true},
    url_video: { type: String, required:false, trim:true},
    message: { type: String, required:true, trim:true},
    frequency: { type: String, required:false, trim:true},
    input_type: { type: String, required:false, trim:true},
    desired_impact: { type: String, required:false, trim:true},
    complementary_information: { type: String, required:false, trim:true},
    timer_long: { type: Number , required:false, trim:true},
    times: { type: Number, required:false, trim:true},
    next_habit: { type: String, required:false, trim:true},
    output: { type: String, required:false, trim:true},
    post_action: { type: String, required:false, trim:true},
    }
);
export const Habit = mongoose.model("Habit", HabitSchema);
