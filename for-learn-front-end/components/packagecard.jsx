import { Link } from "react-router-dom";

export default function PackageCard(props){
    const pkg = props.pkg;
    return (
        <Link to={"/overview/" + pkg.PackageID} className="w-[280px] h-[350px] shadow-2xl rounded-2xl flex flex-col p-4">
            <img src={pkg.PackagePic[0]} className="w-full h-[240px] object-cover rounded-xl"/>
            <div className="w-full h-[110px]">
                <span className="text-2xl font-bold">{pkg.PackageName}</span>
                <span className="text-[15px] font-semibold mt-4 block">Price: LKR.{pkg.PackagePrice}</span>
            </div>

        </Link>
    )
}