import React from "react";
import { Parallax } from "react-scroll-parallax";

// ASSETS
import Graphic from "../../assets/bigDecal.svg";

// COMPS
import { CoverImage } from "../images";

const BigDecal = () => {
    return (
        <Parallax translateY={["-90vh", "90vh"]} className="w-[100vw] h-screen absolute top-0 z-[-2] overflow-hidden">
            <CoverImage
                src={Graphic.src} // Replace with the actual path to your image
                mobileSrc={Graphic.src} // Replace with the actual path to your image
                alt="Cover Background"
                style={{ aspectRatio: "1/0.6" }}
                className="w-full  relative rounded-t-[40px] overflow-hidden ml-[50%] z-[-2]"
            />
        </Parallax>
    );
};

export default BigDecal;
