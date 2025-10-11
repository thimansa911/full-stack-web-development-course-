import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { createClient } from "@supabase/supabase-js";

// 🔐 Use environment variables for safety
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function AddNewPackage() {
  const [packageId, setPackageId] = useState('');
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState('true');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  // 📸 Handle file selection
  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  // ☁️ Upload all selected images to Supabase
  const uploadImagesToSupabase = async () => {
    setUploading(true);
    const uploadedUrls = [];

    for (const file of images) {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("Images") // ✅ bucket name you created
        .upload(fileName, file);

      if (error) {
        console.error(error);
        toast.error(`❌ Failed to upload ${file.name}`);
      } else {
        const { publicUrl } = supabase.storage
          .from("Images") // ✅ use same bucket name here too
          .getPublicUrl(data.path).data;

        uploadedUrls.push(publicUrl);
        console.log(`✅ Uploaded ${file.name}:`, publicUrl); // 🖥️ show URL in console
      }
    }

    setUploading(false);
    return uploadedUrls;
  };

  // 📤 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = await uploadImagesToSupabase();

      const payload = {
        PackageName: name,
        PackageID: packageId,
        PackagePic: imageUrls, // ✅ array of Supabase URLs
        PackagePrice: Number(price), // ensure number
        PackageDescription: info,
        IsAvailable: available === "true",
      };

      console.log("📦 Final Payload Sent to Server:", payload);

      const response = await axios.post(
        import.meta.env.VITE_DB_URL + "/api/package/createpackage",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("✅ Server Response:", response.data);
      toast.success("Package added successfully!");
      navigate("/admin/package");
    } catch (error) {
      console.error("❌ Error:", error);
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
          <FormField label="Package ID" value={packageId} onChange={(e) => setPackageId(e.target.value)} />
          <FormField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <FormField label="Info" value={info} onChange={(e) => setInfo(e.target.value)} />

          {/* 💰 Price - only numbers allowed */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              placeholder="Enter price"
              className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* 🖼️ Image Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Availability */}
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
              disabled={uploading}
              className={`w-[48%] h-10 ${
                uploading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              } text-white font-bold rounded-xl`}
            >
              {uploading ? "Uploading..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
