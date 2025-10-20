import { useState } from "react";

export default function ImageSlider(props) {
    const images = props.images;
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className={"w-[350px] h-[450px]"}>
            <img src={images[activeIndex]} className="object-cover h-[350px] w-full"/>
            <div className="w-full h-[100px] items-center flex flex-row object-cover justify-center gap-1">
                {
                    images.map((image, index)=>{
                        return (
                            <img src={image} key={index} className={"w-[90px] h-[90px] object-cover cursor-pointer" + (activeIndex === index ? " border-2 border-blue-500" : "")} onClick={()=>{setActiveIndex(index)}}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
