import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full h-full bg-white flex">
            <div className="w-[300px] h-full bg-gray-300">
            </div>
            <div className="w-[calc(100%-300px)] bg-blue-400 h-full">
                <Routes path="/">
                    <Route path="/dashboard" element={<span>Dashboard</span>}/>
                    <Route path="/packages" element={<h1>Packages</h1>}/>
                    <Route path="/orders" element={<h1>Orders</h1>}/>
                </Routes>
            </div>
        </div>
    )
}