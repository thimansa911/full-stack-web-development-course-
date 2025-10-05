import UserModel from "./usermodel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

// This function use (Useres find function)
export function UserFind (req, res){
    UserModel.find().then(
        (userdata)=>{
            res.json(userdata)
        }
    ).catch(
        ()=>{
            res.json({
                message : "failed to fatch students"
            })
        }
    )
}

// This function use for (Create user) register new user 
export async function UserSave(req, res) {

    const passhash = bcrypt.hashSync(req.body.password,10)

    const userdata = {
        name : req.body.name,
        password : passhash,
        phonenumber : req.body.phonenumber,
        userId : req.body.userId,
        email :req.body.email,
        address :req.body.address,
        isUserBlocked : req.body.isUserBlocked,
        isEmailVerified : req.body.isEmailVerified,
        profilePic : req.body.profilePic,
        role : req.body.role
        
    }
    const createuser = UserModel(userdata)

    createuser.save().then(
        ()=>{
            res.json({message : "user create successfully"})
        }
    ).catch(
        (error)=>{
            res.status(404).json({message : "Failed to create user"})
            console.log(error)
        }
    )
}


// user login function here 
export function Userlogin(req,res){
    const email = req.body.email
    const password = req.body.password

    UserModel.findOne({
        email : email
    }).then(
        (user)=>{
            if(user == null){
                res.status(404).json({
                    message : "User not found"
                })
            }else{
                const ispasswordright = bcrypt.compareSync(password,user.password)
                if(ispasswordright){
                    const token = jwt.sign(
                        {
                            email : user.email,
                            name : user.name,
                            phonenumber: user.phonenumber,
                            address: user.address,
                            role : user.role, 
                            isUserBlocked : user.isUserBlocked, 
                            isEmailVerified : user.isEmailVerified, 
                            profilePic : user.profilePic
                        },process.env.JWT_CODE
                    ) 
                    res.json({
                        token : token,
                        message:"user login successful",
                        role :user.role
                    })                  
                }else{
                    res.status(404).json({
                        message : "Incorrect password"
                    })
                }
            }
        }
    )
 }


// This function use for (user apgrade to admin) 
export async function Admincreate(req, res) {
    try {
        if (req.user == null){
            return res.status(404).json({message : "please login to craete admin"})
        }
        if(req.user.role != "admin"){
            return res.status(404).json({message : "You can't upgrade user to admin. plaese login as an admin"})
        }else{
            const aduser = await UserModel.findOne({ 
            email: req.body.email 
            });

            if(aduser.role != "admin"){        
            aduser.role = "admin";
            await aduser.save();

            res.status(200).json({
            message: "User upgraded to admin"
        });

        }else{        
            if (aduser.role === "admin") {
            return res.status(400).json({
                message: "User is already an admin"
            });
        }}
    } 
} catch (error) {
        console.error("Error upgrading user:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}








    

