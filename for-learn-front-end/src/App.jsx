import "./App.css";
import HomePage from '../pages/home.jsx'
import LoginPage from '../pages/login.jsx'
import RegisterPage from "../pages/register.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "../pages/admin.jsx";

function App() {

  return (
    <BrowserRouter>
      <div className="w-full h-screen">
        <Routes path="/">
           <Route path="/" element={<HomePage/>}/>
           <Route path="/login" element={<LoginPage/>}/>
           <Route path="register" element={<RegisterPage/>}/>
           <Route path="/admin" element={<AdminPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
      
  )
}

export default App;
