import { GetCart, RemoveFromCart, ClearCart, AddToCart } from "./cart";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- import navigation hook

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate(); // <-- for redirecting

    // Calculate total
    const calculateTotal = (cartItems) => {
        const totalAmount = cartItems.reduce(
            (sum, item) => sum + item.PackagePrice * item.quantity,
            0
        );
        setTotal(totalAmount);
    };

    // Load cart when page loads
    useEffect(() => {
        const cartData = GetCart();
        setCart(cartData);
        calculateTotal(cartData);
    }, []);

    const refreshCart = () => {
        const updatedCart = GetCart();
        setCart(updatedCart);
        calculateTotal(updatedCart);
    };

    const handleDelete = (id) => {
        RemoveFromCart(id);
        refreshCart();
    };

    const handleClear = () => {
        ClearCart();
        setCart([]);
        setTotal(0);
    };

    const handleIncrease = (item) => {
        AddToCart(item, 1);
        refreshCart();
    };

    const handleDecrease = (item) => {
        AddToCart(item, -1);
        refreshCart();
    };

    // ✅ Function to go to Checkout
    const handleCheckout = () => {
        navigate("/checkout", { state: { cart, total } }); // passing cart data
    };

    return (
        <div className="flex flex-col items-center py-5">
            {cart.length === 0 ? (
                <p className="text-gray-500 mt-10">Your cart is empty 🛒</p>
            ) : (
                <>
                    {cart.map((item, index) => (
                        <div
                            key={item.PackageID ?? index}
                            className="w-[400px] min-h-[100px] hover:shadow-2xl border rounded-lg flex items-center justify-between px-4 my-2"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={item.PackageImage}
                                    alt={item.PackageName}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <h2 className="font-semibold">{item.PackageName}</h2>

                                    <div className="flex items-center gap-2 mt-1">
                                        <button
                                            onClick={() => handleDecrease(item)}
                                            className="bg-gray-200 text-gray-700 px-2 rounded hover:bg-gray-300 transition cursor-pointer"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm font-medium">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleIncrease(item)}
                                            className="bg-gray-200 text-gray-700 px-2 rounded hover:bg-gray-300 transition cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <p className="font-semibold mb-2">
                                    LKR.{item.PackagePrice * item.quantity}
                                </p>
                                <button
                                    onClick={() => handleDelete(item.PackageID)}
                                    className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Total Price Section */}
                    <div className="w-[400px] flex justify-between items-center mt-5 border-t pt-4">
                        <h3 className="text-lg font-semibold">Total:</h3>
                        <p className="text-lg font-bold text-green-600">
                            LKR.{total.toFixed(2)}
                        </p>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={handleClear}
                            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                        >
                            Clear Cart
                        </button>

                        {/* ✅ Go to Checkout Button */}
                        <button
                            onClick={handleCheckout}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Go to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
