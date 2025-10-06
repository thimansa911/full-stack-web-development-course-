import { Route, Routes , Link } from "react-router-dom";
import { FaBox } from "react-icons/fa";
import { LuClipboardPenLine } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

export default function AdminPage(){
    return(
        <div className="w-full h-full bg-white flex">
            <div className="w-[300px] h-full bg-blue-400 flex flex-col items-center ">
                <span className="text-2xl font-bold my-5">Admin Panel</span>
                <Link className="flex flex-row w-full p-[15px] items-center text-[17px] gap-[15px] my-2 hover:bg-blue-500 hover:-translate-y-1 hover:shadow-md transition duration-200" to="/admin/package" ><FaBox className="text-white" />Packages</Link>
                <Link className="flex flex-row w-full p-[15px] items-center text-[17px] gap-[15px] my-2 hover:bg-blue-500 hover:-translate-y-1 hover:shadow-md transition duration-200" to="/admin/order" ><LuClipboardPenLine className="text-white" />Orders</Link>
                <Link className="flex flex-row w-full p-[15px] items-center text-[17px] gap-[15px] my-2 hover:bg-blue-500 hover:-translate-y-1 hover:shadow-md transition duration-200" to="/admin/user" ><FaUser className="text-white" />Users</Link>
                <Link className="flex flex-row w-full p-[15px] items-center text-[17px] gap-[15px] my-2 hover:bg-blue-500 hover:-translate-y-1 hover:shadow-md transition duration-200" to="/admin/settings"><IoSettings className="text-white" />Settings</Link>
            </div>
            <div className="w-[calc(100%-300px)] bg-gray-300 h-full">
                <Routes path="/">
                    <Route path="/dashboard" element={<span>Dashboard</span>}/>
                    <Route path="/package" element={<h1>Packages</h1>}/>
                    <Route path="/order" element={<h1>Orders</h1>}/>
                    <Route path="/user" element={<h1>Users</h1>}/>
                    <Route path="/settings" element={<h1>Settings</h1>}/>
                    
                </Routes>
            </div>
        </div>
    )
}