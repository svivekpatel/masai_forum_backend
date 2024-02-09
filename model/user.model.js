const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    avatar:String,
    created_at:Date,
    updated_at:Date
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}