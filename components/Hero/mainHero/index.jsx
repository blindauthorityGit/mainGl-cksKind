import React, { useEffect, useState, useRef } from "react";

//COMPONENTS
import { CoverImage } from "../../images";

//TYPO
import { H1, P } from "../../typography";

//FUNCTIONS
import urlFor from "../../../functions/urlFor";

const MainHero = ({ data }) => {
    useEffect(() => {
        console.log(urlFor(data.image).url(), imgRef.current.clientHeight);
        setBGHeight(imgRef.current.clientHeight);
    }, []);

    const imgRef = useRef();

    const [bgHeight, setBGHeight] = useState(null);

    return (
        <section className="col-span-12 min-h-screen">
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-6 text-center lg:text-left pt-24 lg:pt-0">
                    <H1>{data.headline}</H1>
                    <P>{data.text}</P>
                    <div className="wrapper">
                        <button>button</button>
                        <button>button</button>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-6 relative rounded-[40px] overflow-hidden">
                    <CoverImage
                        src={urlFor(data.image).url()} // Replace with the actual path to your image
                        mobileSrc={urlFor(data.image).url()} // Replace with the actual path to your image
                        alt="Cover Background"
                        style={{ aspectRatio: "1 / 1" }}
                        className="w-full rounded-full z-20"
                        ref={imgRef}
                    />
                </div>
                <div
                    style={{ height: bgHeight * 0.83 + "px" }}
                    className="absolute bg-themeGreen-50 w-[97%] rounded-[40px] h-full top-[28rem] left-1/2 transform translate-x-[-50%] z-[-1]"
                ></div>
            </div>
        </section>
    );
};

export default MainHero;
