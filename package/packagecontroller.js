import PackageModel from "./packagemodel.js"


// Here we make package create function and only admins can create package  
export async function CreatPackage(req,res){

    if(req.user == null){
        return res.status(403).json({message : "Login to create package"});
    }

    if(req.user.role != "admin"){
        return res.status(403).json({message : "you are not admin to create package"});
    }

    const packages = new PackageModel(req.body)
    try{
        const response = await packages.save()
        res.json({
            message : "Package create successfully",
            packages : response
        })
        
    }catch(error){
        console.error("Error creating package", error);
        return res.jsonstatus(500).json({ message: "Failed to craete package "})
    }
}


// here we can get packages
export async function getPackage(req, res) {
    try {
        // If user is logged in and is an admin
        if (req.user && req.user.role === "admin") {
            const allPackages = await PackageModel.find();
            return res.json(allPackages);
        }

        // For guests or non-admin users
        const availablePackages = await PackageModel.find({ IsAvailable: true });
        return res.json(availablePackages);

    } catch (error) {
        console.error("Error in getPackage:", error);
        return res.status(500).json({ message: "Failed to get packages" });
    }
}


// Here we delete package use this following function 
export async function deletePackage(req, res) {
    const { packagedeleteId } = req.params;

    // Check if user is authenticated
    if (!req.user) {
        return res.status(403).json({ message: "Please login to delete package" });
    }

    // Check if user is admin
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admins only" });
    }

    try {
        const result = await PackageModel.deleteOne({ PackageID: packagedeleteId });

        return res.status(200).json({ message: "Package deleted successfully" });

    } catch (error) {
        console.error("Error deleting package:", error);
        return res.status(500).json({ message: "Server error while deleting package" });
    }
}


// This function use for update package details 
export async function AdminUpdatePackage(req, res) {

    const { updatePackageId } = req.params;

    try {

        // Check if user is logged in
        if (!req.user) {
            return res.status(401).json({ message: "Please login to update package details" });
        }

        // Check if user is admin
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "You must be an admin to update packages" });
        }

        // Get package ID from params and update data from body
        const updateData = req.body;

        // Find package by PackageID
        const packageToUpdate = await PackageModel.findOne({ PackageID: updatePackageId});

        if (!packageToUpdate) {
        return res.status(404).json({ message: "Package not found" });
        }

        // Update fields from req.body
        Object.assign(packageToUpdate, updateData);

        // Save updated package
        await packageToUpdate.save();

        // Respond with success
        res.status(200).json({
            message: "Package updated successfully",
            updatedPackage: packageToUpdate
        });

    } catch (error) {
        console.error("Error updating package:", error);
        res.status(500).json({
            message: "Internal server error while updating package"
        });
    }
}


export async function getOnePackageInfo(req, res) {
    try {
        // Validate PackageID
        const { PackageID } = req.params;
        if (!PackageID) {
            return res.status(400).json({ message: "PackageID is required" });
        }

        // Query database
        const packageIdFind = await PackageModel.findOne({ PackageID });

        if (!packageIdFind) {
            return res.status(404).json({ message: "Package not found" });
        }

        // Optional: Add more role-based logic if needed
        res.json(packageIdFind);

    } catch (error) {
        console.error("Error getting package Info:", error.message, error.stack);
        res.status(500).json({ message: "Internal server error while getting package Info" });
    }
}

