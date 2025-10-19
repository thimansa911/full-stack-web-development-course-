import { Route, Routes } from "react-router-dom";
import Header from "../../components/header.jsx";

export default function ClientPage() {
    return (
        <div className="h-full w-full max-h-screen">
        <Header />
        <div className="h-[calc(100%-100px)] w-screen bg-blue-400">
            <Routes path="/">
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="/packages" element={<h1>Packages</h1>} />
                <Route path="/*" element={<h1>404 - Not Found</h1>} />
            </Routes>
        </div>
        </div>
    )
}