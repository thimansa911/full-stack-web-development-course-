import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="h-[100px] bg-amber-200 w-screen items-center flex justify-center gap-5">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/contact">Contact us</Link>
        </header>
    )
}