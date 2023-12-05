import React from "react";
import Image from "next/image";
//FUNCTIONS
import urlFor from "../../functions/urlFor";
//ICONS
import { FaPhone } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const LightBoxImage = (props) => {
    return (
        <div className="grid grid-cols-12 gap-4 mb-16 sm:mb-0 h-full justify-center relative">
            <div
                className={`left w-full  sm:flex justify-center col-span-12 lg:col-span-12 relative lg:h-full ${props.order}`}
            >
                <Image
                    // {...ImagePropsGallery(i)}
                    src={urlFor(props.image).url()}
                    layout="fill"
                    loading="lazy"
                    objectFit="contain"
                    alt="hero"
                    className="z-10"
                />
            </div>
        </div>
    );
};

export default LightBoxImage;
