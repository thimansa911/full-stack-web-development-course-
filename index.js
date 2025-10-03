import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import UserRouter from "./User/userrouter.js"
import jwt from "jsonwebtoken"
import PackageRouter from "./package/packagerouter.js"

const app = express()

app.use(bodyParser.json())
app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value != null){
            const Usertoken  = value.replace("Bearer ","")
            jwt.verify(
                Usertoken,
                "cabat-2131v",
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

const connectString = "mongodb+srv://dinthi150_db_user:vNMpM9nkUPrUQbhE@cluster0.ksa8tyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connectString).then(
    console.log("mongodb data base connected")
).catch(
    ()=>{
        console.log("failed to connect to the data base")
    }
)

app.use("/users", UserRouter)
app.use("/package", PackageRouter)

app.listen(5000, ()=>{
    console.log("server started")
})