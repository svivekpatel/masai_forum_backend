const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
var cors = require('cors')
require("dotenv").config()

const app = express()

app.use(express.json())

app.use(cors())

app.use("/users",userRouter)

app.listen(process.env.port,async(req,res)=>{
    try {
        await connection;
        console.log("connected to db")
    } catch (error) {
        console.log("cannot connect to db")
        console.log(error.message)
    }
    console.log(`server is running in port ${process.env.port}`)
})