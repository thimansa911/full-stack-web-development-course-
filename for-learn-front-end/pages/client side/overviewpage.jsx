import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/loding.jsx";
import ImageSlider from "../../components/imageslider.jsx";
import toast from "react-hot-toast";
import { GetCart, AddToCart } from "../../cart/cart.jsx";

export default function OverviewPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [pkdId, setPackageId] = useState(null);
    const [status, setStatus] = useState("Loading");

    // Fetch package data
    useEffect(() => {
        if (status === "Loading") {
            axios
                .get(import.meta.env.VITE_DB_URL + "/api/package/" + params.PackageID)
                .then((res) => {
                    setPackageId(res.data);
                    setStatus("success");
                })
                .catch((err) => {
                    setStatus("error");
                });
        }
    }, [status, params.PackageID]);

    // Handle Add to Cart
    const handleAddToCart = () => {
        AddToCart(pkdId, 1);
        toast.success("Package added to cart");
        console.log(GetCart());
    };

    // Handle Buy Now (navigate to checkout page with this item)
    const handleBuyNow = () => {
        if (!pkdId) return;

        const singleItemCart = [
            {
                PackageID: pkdId.PackageID,
                PackageName: pkdId.PackageName,
                PackageImage: pkdId.PackagePic[0], // first image
                PackagePrice: pkdId.PackagePrice,
                quantity: 1,
            },
        ];

        const total = singleItemCart.reduce(
            (sum, i) => sum + i.PackagePrice * i.quantity,
            0
        );

        navigate("/checkout", { state: { cart: singleItemCart, total } });
    };

    return (
        <div className="w-full h-full">
            {status === "Loading" && <LoadingSpinner />}
            {status === "success" && pkdId && (
                <div className="w-full h-full flex flex-col md:flex-row">
                    {/* Left: Images */}
                    <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-5">
                        <ImageSlider images={pkdId.PackagePic} />
                    </div>

                    {/* Right: Package Details */}
                    <div className="w-full md:w-1/2 h-full flex flex-col justify-start items-start p-5">
                        <h1 className="text-2xl font-bold p-2">{pkdId.PackageName}</h1>
                        <p className="text-lg p-2">{pkdId.PackageDescription}</p>
                        <h2 className="text-xl font-semibold p-2">
                            Price: LKR.{pkdId.PackagePrice}
                        </h2>

                        <div className="w-full my-2 flex flex-wrap gap-3">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer active:translate-y-1 shadow-2xl"
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer active:translate-y-1 shadow-2xl"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {status === "error" && <div>Failed to load package details</div>}
        </div>
    );
}
