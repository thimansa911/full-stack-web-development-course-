import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdatePackagePage() {
  const location = useLocation();
  const pkg = location.state;

  // Form state variables
  const [packageName, setPackageName] = useState(pkg.PackageName || "");
  const [packageDescription, setPackageDescription] = useState(pkg.PackageDescription || "");
  const [packagePrice, setPackagePrice] = useState(pkg.PackagePrice || 0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to update package");
        navigate("/login");
        return;
      }

      const payload = {
        PackageID: pkg.PackageID,  // ID is fixed
        PackageName: packageName,
        PackageDescription: packageDescription,
        PackagePrice: Number(packagePrice),
        PackagePic: pkg.PackagePic // keep old pictures as is
      };

      await axios.put(
        import.meta.env.VITE_DB_URL + "/api/package/" + pkg.PackageID,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Package updated successfully!");
      navigate("/admin/package", { state: { updated: true } });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update package.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Update Package</h2>

        {/* Package ID (readonly) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Package ID</label>
          <input
            type="text"
            value={pkg.PackageID}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Package Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Package Name</label>
          <input
            type="text"
            value={packageName}
            onChange={e => setPackageName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Package Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={packageDescription}
            onChange={e => setPackageDescription(e.target.value)}
            rows={4}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Package Price */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={packagePrice}
            onChange={e => setPackagePrice(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Buttons: Update and Cancel */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Update Package
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/package")}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
