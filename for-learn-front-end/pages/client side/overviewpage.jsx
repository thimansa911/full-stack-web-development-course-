import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/loding.jsx";
import ImageSlider from "../../components/imageslider.jsx";

export default function OverviewPage() {
    const params = useParams();
    const [pkdId, setPackageId] = useState(null);
    const [status, setStatus] = useState("Loading");

    useEffect(
        ()=>{
            if(status === "Loading"){
                axios.get(import.meta.env.VITE_DB_URL + '/api/package/' + params.PackageID).then(
                    (res)=>{
                        setPackageId(res.data);
                        setStatus("success");
                    }
                ).catch((err)=>{
                    setStatus("error");
                })
            }
    }, [status]
)
    return (
        <div className="w-full h-full">
            {
                status === "Loading" && <LoadingSpinner />
            }
            {
                status === "success" && <div className="w-full h-full flex">
                    <div className="w-[50%] h-full flex flex-col justify-center items-center p-5">
                        <ImageSlider images={pkdId.PackagePic} />
                    </div>
                    <div className="w-[50%] h-full flex flex-col justify-start items-start p-5">
                        <h1 className="text-2xl font-bold p-2">{pkdId.PackageName}</h1>
                        <p className="text-lg p-2">{pkdId.PackageDescription}</p>
                        <h2 className="text-xl font-semibold p-2">Price: LKR.{pkdId.PackagePrice}</h2>
                        <div className="w-full my-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer active:translate-y-1 shadow-2xl">Buy Now</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4 cursor-pointer active:translate-y-1 shadow-2xl">Add to Cart</button>
                        </div>
                    </div>
                </div>
            }
            {
                status === "error" && <div>Failed to load package details</div>
            }
        </div>
    )
}