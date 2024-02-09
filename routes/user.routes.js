const express = require("express")
const { UserModel } = require("../model/user.model")
const userRouter = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

userRouter.post("/register",async(req,res)=>{
    const {username,email,password,avatar,created_at,updated_at} = req.body 
    try {
        bcrypt.hash(password, 4, async(err, hash) => {
            const user = new UserModel({username,email,password:hash,avatar,created_at,updated_at})
            await user.save()
            res.status(201).send({"msg":"registration successful!"})
       }); 
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    res.status(201).send({"msg":"login successful!","token":jwt.sign({ foo: 'bar' }, 'shhhhh')})
                }else{
                    res.status(400).send({"msg":"login failed!"})
                }
            });
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = {
    userRouter
}