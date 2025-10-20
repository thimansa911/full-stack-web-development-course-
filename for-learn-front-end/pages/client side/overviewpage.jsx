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
                    <div className="w-[50%] h-full bg-green-400"></div>
                </div>
            }
            {
                status === "error" && <div>Failed to load package details</div>
            }
        </div>
    )
}