import { FaPlus, FaTrash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const samplePackages = [
  {
    PackageName: "Starter Web Development Package",
    PackageID: "PKG001",
    PackagePic: [
      "https://example.com/images/web-dev-basic.png"
    ],
    PackagePrice: "Rs.15,000",
    PackageDescription: "A basic web development package for small businesses.",
    IsAvailable: true
  },
  {
    PackageName: "E-Commerce Pro Package",
    PackageID: "PKG002",
    PackagePic: [
      "https://example.com/images/ecommerce-pro.png"
    ],
    PackagePrice: "Rs.50,000",
    PackageDescription: "Full-stack e-commerce website with admin panel.",
    IsAvailable: true
  },
  {
    PackageName: "Mobile App Starter",
    PackageID: "PKG003",
    PackagePic: [
      "https://example.com/images/mobile-app-starter.png"
    ],
    PackagePrice: "Rs.40,000",
    PackageDescription: "Cross-platform mobile app development package.",
    IsAvailable: true
  },
  {
    PackageName: "Custom Branding Package",
    PackageID: "PKG004",
    PackagePic: [
      "https://example.com/images/branding-package.png"
    ],
    PackagePrice: "Rs.20,000",
    PackageDescription: "Includes logo design, brand guidelines, and social media kit.",
    IsAvailable: false
  },
  {
    PackageName: "Advanced SEO Package",
    PackageID: "PKG005",
    PackagePic: [
      "https://example.com/images/seo-package.png"
    ],
    PackagePrice: "Rs.25,000",
    PackageDescription: "Improve website visibility with advanced SEO techniques.",
    IsAvailable: true
  }
];

export default function AdminPackagePage() {
  const [packages, setPackages] = useState(samplePackages);
  const navigate = useNavigate();
  const [a,setA] = useState(0);

  useEffect(() => {
    axios.get(import.meta.env.VITE_DB_URL + "/api/package/getpackage").then(
      (res) => {
        setPackages(res.data);
      }
    );
  }, [a]);

return (
  <div className="w-full h-full bg-white ">
    {
      <table className="">
        <thead>
          <tr className="">
            <th className="p-3">Picture</th>
            <th className="p-3">Package ID</th>
            <th className="p-3">Package Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Available or Not</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => {
            return (
              <tr className="" key={index}>
                <td className="p-3">
                  <img src={pkg.PackagePic[0]} alt={pkg.PackageName} className="w-16 h-16 object-cover" />
                </td>
                <td className="p-3">{pkg.PackageID}</td>
                <td className="p-3">{pkg.PackageName}</td>
                <td className="p-3">{pkg.PackagePrice}</td>
                <td className="p-3">{pkg.IsAvailable ? "Available" : "Not Available"}</td>
                <td className="p-3">
                  <FaTrash
                    className="cursor-pointer active:translate-y-1 text-red-500"
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (token == null) {
                        navigate("/login");
                        return;
                      }
                      axios
                        .delete(import.meta.env.VITE_DB_URL + "/api/package/" + pkg.PackageID, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        })
                        .then((res) => {
                          console.log("Product deleted succeessfully");
                          console.log(res.data);
                          toast.success("Package deleted successfully");
                          setA(a+1);
                        })
                        .catch((error) => {
                          console.error("Error deleting package:", error);
                          toast.error("Failed to delete package");
                        });
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    }
    <Link
      to="/admin/package/addpackage"
      className="flex items-center bg-blue-500 text-white fixed right-[20px] bottom-[20px] p-3 rounded-full hover:bg-blue-600 cursor-pointer active:translate-y-1 hover:shadow-md transition duration-200"
    >
      <FaPlus className="text-[20px]" />
    </Link>
  </div>
);
}