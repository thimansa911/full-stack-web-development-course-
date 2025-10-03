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
        required: true,
        default: ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rlogical.com%2Fblog%2Ffor-what-reason-is-mern-stack-considered-the-best-for-developing-web-apps%2F&psig=AOvVaw2pkMaxmI--aSgZV4LrLuy7&ust=1758376241714000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIj2go_85I8DFQAAAAAdAAAAABAE"]
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
