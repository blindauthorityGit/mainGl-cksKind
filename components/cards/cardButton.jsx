import React, { useEffect } from "react";
import Link from "next/link";

//ANIMATION
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

//COMPONENTS
import { CoverImage } from "../images";
import { TextButton } from "../buttons";

//TYPO
import { H3, H4, P } from "../typography";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

const CardButton = ({ data, i }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-150px 0px", // Adjust the rootMargin to add a threshold
    });

    const variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.75,
                bounce: 0.5, // Add a bouncy effect
                delay: i * 0.1, // Delay each card based on index
            },
        },
        hidden: { opacity: 0, y: 150 },
    };

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);
    return (
        <motion.div
            ref={ref}
            className={`col-span-12 lg:col-span-4 p-8 text-center rounded-[40px]  ${
                data.isMain ? "bg-primaryColor-600" : "bg-[#E9B4C7]"
            }`}
            initial="hidden"
            animate={controls}
            variants={variants}
        >
            <Link className="text-center flex justify-center" href={`#`}>
                <CoverImage
                    src={urlFor(data.icon).url()} // Replace with the actual path to your image
                    mobileSrc={urlFor(data.icon).url()} // Replace with the actual path to your image
                    alt="Cover Background"
                    style={{ aspectRatio: data.aspectRatio }}
                    className="w-1/4  z-20 relative "
                />
            </Link>
            <div className="px-6 2xl:px-12 rounded-b-[40px] lg:py-4 2xl:py-8 mb-0 2xl:mb-4">
                <H3 klasse={`${data.isMain ? "!text-white" : null}`}>{data.title}</H3>
            </div>
        </motion.div>
    );
};

export default CardButton;
