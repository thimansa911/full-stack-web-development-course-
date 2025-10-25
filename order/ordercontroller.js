import Order from "../order/ordermodel.js";

// Create order
export const createOrder = async (req, res) => {
    try {
        const { email, name, address, phone, items, notes } = req.body;
        const totalPrice = items.reduce(
            (sum, item) => sum + item.PackagePrice * item.quantity,
            0
        );

        const order = new Order({
            OrderID: new Date().getTime().toString(),
            email,
            name,
            address,
            phone,
            items,
            notes,
            totalPrice,
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
