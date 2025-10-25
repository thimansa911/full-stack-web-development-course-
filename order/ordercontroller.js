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

export async function AdminUpdateOrderStatus(req, res) {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    if (!req.user) return res.status(401).json({ message: "Please login" });
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const order = await Order.findOne({ OrderID: orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Status updated", order });
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
