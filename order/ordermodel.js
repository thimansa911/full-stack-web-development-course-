import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    OrderID: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
    date: { // 🛠 renamed from "data" → correct field name
        type: Date,
        default: Date.now,
    },
    items: [
        {
            packageID: {
                type: String,
                required: true,
            },
            PackageName: {
                type: String,
                required: true,
            },
            PackageImage: {
                type: String,
                required: true,
            },
            PackagePrice: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    notes: {
        type: String,
        default: "Write something about this",
    },
    totalPrice: { // 🧾 optional but useful for quick access
        type: Number,
        default: 0,
    },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
