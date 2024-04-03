import mongoose from "mongoose";
const PagetimeSchema= mongoose.Schema(
    {
    date: {type: String, required:true, trim:true},
    time: {type: String, required:true, trim:true},
    url: {type: String, required:true},
    user: {type: mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
    }
);
export const Pagetime = mongoose.model("Pagetime",PagetimeSchema);