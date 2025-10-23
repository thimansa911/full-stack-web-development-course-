import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import UserRouter from "./User/userrouter.js"
import jwt from "jsonwebtoken"
import PackageRouter from "./package/packagerouter.js"
import dotenv, { config } from "dotenv"
import orderRouter from "./order/orderouter.js"
import cors from "cors"
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value != null){
            const Usertoken  = value.replace("Bearer ","")
            jwt.verify(
                Usertoken,
                process.env.JWT_CODE,
                (err,decoded)=>{
                    if(decoded == null){
                        res.status(403).json({
                            message : "Unauthorized"
                        })
                    }else{
                        req.user = decoded
                        next()
                    }
                }
            )
        }else{
            next()
        }
    }
)

const connectString = process.env.DATA_BASE_CONNECT_CODE 

mongoose.connect(connectString).then(
    console.log("mongodb data base connected")
).catch(
    ()=>{
        console.log("failed to connect to the data base")
    }
)

app.use("/api/users", UserRouter)
app.use("/api/package", PackageRouter)
app.use("/api/orders", orderRouter)

app.listen(5000, ()=>{
    console.log("server started")
})