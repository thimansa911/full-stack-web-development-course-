import { FaPlus, FaTrash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPen } from "react-icons/fa";
import LoadingSpinner from "../../components/loding.jsx";




export default function AdminPackagePage() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios.get(import.meta.env.VITE_DB_URL + "/api/package/getpackage").then(
      (res) => {
        setPackages(res.data);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

return (
  <div className=" h-full bg-white ">
    {
      (isLoading ? <LoadingSpinner /> : <table className=" ">
        <thead>
          <tr className="">
            <th className="p-3">Picture</th>
            <th className="p-3">Package ID</th>
            <th className="p-3">Package Name</th>
            <th className="p-3">Price</th>
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
                <td className="p-3 ">{pkg.PackageID}</td>
                <td className="p-3 ">{pkg.PackageName}</td>
                <td className="p-3">{pkg.PackagePrice}</td>
                <td className="p-3 justify-center flex items-center gap-4">
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
                          setIsLoading(!isLoading);
                        })
                        .catch((error) => {
                          console.error("Error deleting package:", error);
                          toast.error("Failed to delete package");
                        });
                    }}
                  />
                   <FaPen className="cursor-pointer active:translate-y-1 text-blue-500" onClick={() => {
                     navigate("/admin/updatepackage", { state: pkg });
                   }} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>)
    }
    <Link
      to="/admin/package/addpackage"
      className="flex items-center bg-blue-500 text-white fixed right-[20px] bottom-[20px] p-3 rounded-full hover:bg-blue-600 cursor-pointer active:translate-y-1 hover:shadow-md transition duration-200">
      <FaPlus className="text-[20px]" />
    </Link>
  </div>
);
}

