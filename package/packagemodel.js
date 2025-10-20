import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
    PackageName : {
        type: String,
        required: true,
        default: "Add name for this package"
    },

    PackageID : {
        type: String,
        required: true,
        unique: true
        
    },

    PackagePic : {
        type: [String],
        required: true
    },

    PackagePrice : {
        type : String,
        required: true,
        default: "Rs.30,000"
    },
    
    PackageDescription : {
        type : String,
        required: true,
        default: "Best Package"
    },

    IsAvailable : {
        type : Boolean,
        default: true
    }
})

const PackageModel = mongoose.model("Packages",PackageSchema)
export default PackageModel;
