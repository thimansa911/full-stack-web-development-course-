import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ClearCart } from "./cart"; // Adjust path if needed

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, total } = location.state || { cart: [], total: 0 };

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        notes: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // ✅ Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("⚠️ You must log in to place an order!");
            navigate("/login");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.address || !form.phone) {
            toast.error("⚠️ Please fill all required fields!");
            return;
        }

        // Map cart items to backend schema
        const orderItems = cart.map((item) => ({
            packageID: item.PackageID,  // match backend
            PackageName: item.PackageName,
            PackageImage: item.PackageImage || "default-image.png",
            PackagePrice: item.PackagePrice,
            quantity: item.quantity,
        }));

        const orderData = {
            email: form.email,
            name: form.name,
            address: form.address,
            phone: form.phone,
            notes: form.notes || "Write something about this",
            status: "pending",
            items: orderItems,
        };

        try {
            setLoading(true);
            const token = localStorage.getItem("token"); // get token
            const res = await axios.post(`${import.meta.env.VITE_DB_URL}/api/orders`, orderData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` // send token to backend
                },
            });

            if (res.status === 201 || res.status === 200) {
                toast.success("✅ Order placed successfully!");
                ClearCart();
                setMessage("✅ Order placed successfully!");
                setTimeout(() => navigate("/"), 2000); // Redirect after 2s
            }
        } catch (err) {
            console.error("Error placing order:", err.response?.data || err.message);
            const errorMsg = err.response?.data?.message || "Network error. Please try again later.";
            toast.error(`❌ Failed to place order: ${errorMsg}`);
            setMessage(`❌ Failed to place order: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center py-20">
                <p className="text-gray-500">Your cart is empty 🛒</p>
                <a
                    href="/"
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Back to Home
                </a>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Checkout Page 🧾</h1>

            <div className="w-full max-w-2xl bg-white border rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                {cart.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center mb-2 border-b pb-2"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={item.PackageImage || "default-image.png"}
                                alt={item.PackageName}
                                className="w-12 h-12 object-cover rounded"
                            />
                            <span>
                                {item.PackageName} × {item.quantity}
                            </span>
                        </div>
                        <span>
                            LKR.{(item.PackagePrice * item.quantity).toFixed(2)}
                        </span>
                    </div>
                ))}

                <hr className="my-4" />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">
                        LKR.{total.toFixed(2)}
                    </span>
                </div>

                {/* Customer Info Form */}
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter your address"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Any notes about your order"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded transition text-white ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Placing Order..." : "Place Order"}
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-center text-sm text-gray-700">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
