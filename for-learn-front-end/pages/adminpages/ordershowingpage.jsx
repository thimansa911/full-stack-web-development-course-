import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/loding.jsx";

export default function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to view orders");
      setIsLoading(false);
      return;
    }

    axios
      .get(import.meta.env.VITE_DB_URL + "/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch orders");
        setIsLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Colombo",
    });
  };

  // Update status function
  const updateOrderStatus = (orderId, newStatus) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    axios.patch(
        import.meta.env.VITE_DB_URL + `/api/orders/${orderId}`,
            { status: newStatus }, // body must match backend
            { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => {
        toast.success("Order status updated!");
        // Update local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.OrderID === orderId ? { ...order, status: newStatus } : order
          )
        );
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update status");
      });
  };

  return (
    <div className="h-full bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Orders 🧾</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Total Price</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="text-center cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedOrder(order)}
              >
                <td className="p-3 border">{order.OrderID}</td>
                <td className="p-3 border">{order.name}</td>
                <td className="p-3 border">{order.email}</td>
                <td className="p-3 border">{order.phone}</td>
                <td className="p-3 border">{order.address}</td>
                <td className="p-3 border">LKR.{order.totalPrice.toFixed(2)}</td>
                <td className="p-3 border">{order.status}</td>
                <td className="p-3 border">{formatDate(order.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Order Summary Panel */}
      {selectedOrder && (
        <div className="fixed right-0 top-0 h-full w-full md:w-1/2 bg-white shadow-lg p-6 overflow-auto z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <button
              className="text-red-500 font-bold text-lg cursor-pointer"
              onClick={() => setSelectedOrder(null)}
            >
              Cancel
            </button>
          </div>

          <p><strong>Order ID:</strong> {selectedOrder.OrderID}</p>
          <p><strong>Name:</strong> {selectedOrder.name}</p>
          <p><strong>Email:</strong> {selectedOrder.email}</p>
          <p><strong>Phone:</strong> {selectedOrder.phone}</p>
          <p><strong>Address:</strong> {selectedOrder.address}</p>

          <div className="mt-2">
            <strong>Status:</strong>{" "}
            <select
              value={selectedOrder.status}
              onChange={(e) =>
                updateOrderStatus(selectedOrder.OrderID, e.target.value)
              }
              className="border rounded p-1"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <p className="mt-2"><strong>Date:</strong> {formatDate(selectedOrder.date)}</p>

          <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
          {selectedOrder.items.map((item, idx) => (
            <div
              key={idx}
              className="border p-2 rounded mb-2 cursor-pointer hover:bg-gray-50"
            >
              <p className="font-semibold">{item.PackageName}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: LKR.{(item.PackagePrice * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <p className="font-bold mt-2">Total Price: LKR.{selectedOrder.totalPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
