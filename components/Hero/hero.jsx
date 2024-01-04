import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { CoverImage } from "../images";
import urlFor from "../../functions/urlFor";

const Hero = ({ data, isEvent }) => {
    const controls = useAnimation();

    return (
        <motion.div
            className={`hero-container w-full col-span-12 mt-16 lg:mt-28`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1, duration: 0.8 }}
        >
            {/* Background Image */}
            <CoverImage
                src={urlFor(data.image).url()}
                mobileSrc={urlFor(data.image).url()}
                alt="Cover Background"
                style={{ aspectRatio: isEvent ? "3/2" : "1642/650" }}
                className="w-full z-20 relative rounded-[40px] overflow-hidden"
            />
        </motion.div>
    );
};

export default Hero;
