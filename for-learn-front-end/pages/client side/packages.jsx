import axios from "axios"
import { useEffect, useState } from "react"
import LoadingSpinner from "../../components/loding.jsx"
import PackageCard from "../../components/packagecard.jsx"

export default function PackagesPage() {

    const [packages, setPackages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(
        ()=>{
            if(loading){
                axios.get(import.meta.env.VITE_DB_URL + "/api/package/getpackage").then(
                    (res)=> {
                        setPackages(res.data)
                        setLoading(false)
                    }
                )
            }
        }, [loading]
    )

    return(
        <div>
            {
                loading ? <LoadingSpinner/> :
                <div className="w-full flex shrink-0 flex-wrap items-center justify-center gap-4 p-4">
                    {
                        packages.map((pkg)=> { 
                            return (
                                <PackageCard key={pkg.PackageID} pkg={pkg}/>
                            )
                        })
                    }
                </div>
           }
        </div>
    )
}