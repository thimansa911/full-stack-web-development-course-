import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type : String,
        requireed : true
    },
    phonenumber: {
        type: String,
        required: true,
    },
    address : {
        type : String,
        required : true
    },
    userId: {
        type: String,
        required: true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isUserBlocked: {
        type: Boolean,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false, // set default instead of required false
    },
    profilePic: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        required: true,
    }
});

const Usermodel = mongoose.model("Useres", UserSchema);

export default Usermodel;
