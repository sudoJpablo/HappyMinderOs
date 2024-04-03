import mongoose from "mongoose";

const UrlSchema = mongoose.Schema(
    {
        url_name: {type: String, required:true, trim:true},
        user:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'user'},
        date_creation: {type: Date, default:Date.now()}
        
    }
)

export const Url = mongoose.model("Url", UrlSchema)