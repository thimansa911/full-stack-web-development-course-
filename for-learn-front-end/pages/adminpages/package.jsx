import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminPackagePage() {
    return ( 
    <div className="w-full h-full bg-white ">Package page
    <Link to="/admin/package/addpackage" className="flex items-center bg-blue-500 text-white fixed right-[20px] bottom-[20px] p-3 rounded-full hover:bg-blue-600 cursor-pointer active:translate-y-1 hover:shadow-md transition duration-200">
        <FaPlus className="text-[20px]" />
    </Link>
    </div>
)
} 