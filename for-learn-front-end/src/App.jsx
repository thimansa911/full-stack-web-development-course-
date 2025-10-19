import "./App.css";
import LoginPage from '../pages/login.jsx'
import RegisterPage from "../pages/register.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin.jsx";
import { Toaster } from "react-hot-toast";
import ClientPage from "../pages/client side/clientpage.jsx";

function App() {

  return (
    <BrowserRouter>
      <div className="w-full h-screen">
        <Toaster position="top-right" />
        <Routes path="/">
           <Route path="/login" element={<LoginPage/>}/>
           <Route path="register" element={<RegisterPage/>}/>
           <Route path="/admin/*" element={<AdminPage/>}/>
           <Route path="/*" element={<ClientPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
      
  )
}

export default App;
