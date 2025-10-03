import express from "express"
import  { Admincreate, UserFind, Userlogin, UserSave } from "./usercontroller.js";

const UserRouter = express.Router();

UserRouter.get("/find", UserFind)
UserRouter.post("/register", UserSave)
UserRouter.post("/login",Userlogin)
UserRouter.post("/createadmin", Admincreate)

export default UserRouter;