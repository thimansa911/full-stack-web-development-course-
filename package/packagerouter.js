import express from "express";
import { AdminUpdatePackage, CreatPackage, deletePackage, getOnePackageInfo, getPackage,} from "./packagecontroller.js";

const PackageRouter = express.Router();

PackageRouter.post("/createpackage",CreatPackage)
PackageRouter.get("/getpackage",getPackage)
PackageRouter.get("/:PackageID", getOnePackageInfo)
PackageRouter.delete("/:packagedeleteId", deletePackage)
PackageRouter.put("/:updatePackageId", AdminUpdatePackage)

export default PackageRouter;