import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddNewPackage() {
    // 📦 State for each form input
    const [packageId, setPackageId] = useState('');
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [available, setAvailable] = useState('true');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            PackageName: name,
            PackageID: packageId,
            PackagePic: [imageUrl], // send as array
            PackagePrice: price,
            PackageDescription: info,
            IsAvailable: available === "true",
        };

        try {
            const response = await axios.post(
                import.meta.env.VITE_DB_URL + "/api/package/createpackage",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log(response.data);
            toast.success("Package added successfully!");
            navigate("/admin/package");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add package.");
        }
    };

    return (
        <div className="w-full h-screen bg-gray-300 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Add New Package
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField
                        label="Package ID"
                        value={packageId}
                        onChange={(e) => setPackageId(e.target.value)}
                    />
                    <FormField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FormField
                        label="Info"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    />
                    <FormField
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <FormField
                        label="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />

                    {/* Dropdown for availability */}
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-1">Availability</label>
                        <select
                            value={available}
                            onChange={(e) => setAvailable(e.target.value)}
                            className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                        <Link
                            to="/admin/package"
                            className="w-[48%] h-10 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="w-[48%] h-10 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ✅ Reusable Input Field Component
function FormField({ label, value, onChange }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">{label}</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );
}
