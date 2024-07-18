import React from "react";
import { motion } from "framer-motion";

// ASSETS
import Graphic from "../../assets/smallerDecal.svg";

// COMPS
import { CoverImage } from "../images";

const SmallerDecal = ({ klasse, motionProps }) => {
    return (
        <motion.div className={`${klasse}`} {...motionProps}>
            <CoverImage
                src={Graphic.src} // Replace with the actual path to your image
                mobileSrc={Graphic.src} // Replace with the actual path to your image
                alt="Cover Background"
                style={{ aspectRatio: "142/190" }}
                className="w-full  relative rounded-t-[40px] overflow-hidden  z-[-2]"
            />
        </motion.div>
    );
};

export default SmallerDecal;
