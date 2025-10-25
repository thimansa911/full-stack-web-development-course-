import { Route, Routes } from "react-router-dom";
import Header from "../../components/header.jsx";
import PackagesPage from "./packages.jsx";
import OverviewPage from "./overviewpage.jsx";
import CartPage from "../../cart/cartpage.jsx";
import CheckoutPage from "../../cart/checkoutpage.jsx";

export default function ClientPage() {
    return (
        <div className="h-full w-full max-h-screen">
        <Header />
        <div className="h-[calc(100%-100px)] max-h-screen overflow-y-auto">
            <Routes path="/">
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="/packages" element={<PackagesPage/>}/>
                <Route path="/contact" element={<h1>Contact us</h1>} />
                <Route path="/overview/:PackageID" element={<OverviewPage />} />
                <Route path="/*" element={<h1>404 - Not Found</h1>} />
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="checkout" element={<CheckoutPage/>}/>
            </Routes>
        </div>
        </div>
    )
}