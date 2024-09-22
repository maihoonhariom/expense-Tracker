const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true, "Username is required"],
        unique:true,
        minLength: [3, "Username is must be 3 Character"],
        maxLength:[25, "Username is Maximum 25 Character"],
    },
    password:{
        type: String,
        required:[true, "Password is required"],
    },
    email:{
        type: String,
        required: [true,"Email is Required"],
        match:[/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid Email Format"],
        trim: true,
        lowercase: true,

    },
    profile:{
        type:String,
        default: "https://media.istockphoto.com/id/2149054573/photo/glowing-neon-person-sign-outline-round-avatar-pictogram-in-vivid-color-neon-icon-of-user-in.jpg?s=2048x2048&w=is&k=20&c=itA4MN39L_oBgzVZ7PBWIsE25XNPXzgRgSC2BAgy9n4="
    }

});

userSchema.plugin(plm);
const UserSchema = mongoose.model("User",userSchema);
module.exports = UserSchema;