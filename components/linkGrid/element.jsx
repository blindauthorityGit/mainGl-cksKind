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

const Element = ({ data, i, isWorkshop }) => {
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
            className={`col-span-12 lg:col-span-4`}
            initial="hidden"
            animate={controls}
            variants={variants}
        >
            <CoverImage
                src={urlFor(data.logo).url()} // Replace with the actual path to your image
                mobileSrc={urlFor(data.logo).url()} // Replace with the actual path to your image
                alt="Cover Background"
                style={{ aspectRatio: "1/0.8" }}
                className="w-full z-20 relative rounded-[40px] overflow-hidden "
            />
            <div className="px-6 lg:px-8 rounded-[40px] py-8 lg:py-6 mb-4 lg:mb-2">
                <H3 klasse={`mb-4 lg:mb-2 ${isWorkshop ? "!text-blueColor-100" : null}`}>{data.name}</H3>
                {/* <P klasse="lg:!text-base !text-xs" style={{ color: data.farbe.value == "#3E55AB" ? "#E2EAF7" : null }}>
                    {data.description}
                </P>
                <TextButton link={data.button.link}>
                    <span style={{ color: data.farbe.value == "#3E55AB" ? "#E2EAF7" : null }}>{data.button.label}</span>
                </TextButton> */}
            </div>
        </motion.div>
    );
};

export default Element;
