import React from "react";
import { Parallax } from "react-scroll-parallax";

// ASSETS
import Divider from "../../assets/divider.svg";

// COMPS
import { CoverImage } from "../images";

const DecorativeDivider = () => {
    return (
        <div className="container mx-auto">
            <CoverImage
                src={Divider.src} // Replace with the actual path to your image
                mobileSrc={Divider.src} // Replace with the actual path to your image
                alt="Cover Background"
                style={{ aspectRatio: "13.2/1" }}
                className="w-full  relative "
            />
        </div>
    );
};

export default DecorativeDivider;
