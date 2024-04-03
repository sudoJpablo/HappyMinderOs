import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const UserSchema= mongoose.Schema(
    {
    user_name: { type: String, required:true, trim:true},
    password: { type: String, required: false},
    origin: { type: String, required:false, trim:true},
    state: { type: String, default:"ACTIVE"},
    last_login: {type: Date, default:Date.now()}
    }
);

UserSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPaswword) => {
            if (err){
                next(err);
            }
            else{
                document.password = hashedPaswword;
                next();
            }
        });

    }
    else{
        nexy();
    }
});

UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if(err){
            callback(err);
        }
        else{
            callback(err, same);
        }
    });
}

export const User = mongoose.model("User", UserSchema);
