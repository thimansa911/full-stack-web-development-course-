import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

export default function Header() {
    return (
        <header className="h-[100px] bg-amber-200 w-screen items-center flex justify-center gap-5 relative">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/contact">Contact us</Link>
            <Link to="/cart">{<FiShoppingCart className="text-2xl absolute right-8 top-8"/>}</Link>
        </header>
    )
}