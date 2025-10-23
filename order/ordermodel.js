import mongoose  from "mongoose";

const OrderSchema = new mongoose.Schema({
    OrderID : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : "pending"
    },
    data : {
        type : Date,
        default : Date.now
    },
    items : [
        {
            packageID : {
                type : String,
                required : true
            },
            PackageName : {
                type : String,
                required : true
            },
            PackageImage : {
                type : String,
                required : true
            },
            PackagePrice : {
                type : Number,
                required : true
            },
            qty : {
                type : Number,
                required : true
            }
        }
    ],
    notes : {
        type : String, 
        default : "Write some thing about this"
    }
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
