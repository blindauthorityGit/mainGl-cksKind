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

//HOOKS
import { useWindowDimensions } from "../../hooks/useWindowDimension";

const Card = ({ data, i }) => {
    const { width, height } = useWindowDimensions();
    const isMobile = width < 480; // You can adjust this threshold

    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-150px 0px", // Adjust the rootMargin to add a threshold
    });

    const variants = {
        visible: isMobile
            ? {
                  opacity: 1,
                  x: 0, // Slide in from the side on mobile
                  transition: {
                      duration: 0.75,
                      bounce: 0.5,
                      delay: i * 0.1,
                  },
              }
            : {
                  opacity: 1,
                  y: 0, // Slide in from the bottom on desktop
                  transition: {
                      duration: 0.75,
                      bounce: 0.5,
                      delay: i * 0.1,
                  },
              },
        hidden: isMobile ? { opacity: 0, x: -100 } : { opacity: 0, y: 150 },
    };

    useEffect(() => {
        console.log(data.button.link);
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView, isMobile]);
    return (
        <motion.div
            ref={ref}
            className={`col-span-12 lg:col-span-4 ${i === 1 ? "xl:mt-[-2rem] 2xl:mt-[-6rem]" : ""} ${
                i === 2 ? "xl:mt-[1rem] 2xl:mt-[4rem]" : ""
            }`}
            initial="hidden"
            animate={controls}
            variants={variants}
        >
            <Link href={`${data.button.link}`}>
                <CoverImage
                    src={urlFor(data.image).url()} // Replace with the actual path to your image
                    mobileSrc={urlFor(data.image).url()} // Replace with the actual path to your image
                    alt="Cover Background"
                    // style={{ aspectRatio: width < 480 ? "1/0.5" : "1/0.8" }}
                    className="w-full z-20 relative rounded-t-[40px] overflow-hidden aspect-[1/0.5]  2xl:aspect-[1/0.8]"
                />
            </Link>
            <div className="px-6 2xl:px-12 rounded-b-[40px] py-8 mb-4 lg:mb-4" style={{ background: data.farbe.value }}>
                <H3 klasse="mb-4 " style={{ color: data.farbe.value == "#3E55AB" ? "#ffffff" : null }}>
                    {data.name}
                </H3>
                <P klasse="2xl:!text-base !text-xs" style={{ color: data.farbe.value == "#3E55AB" ? "#E2EAF7" : null }}>
                    {data.description}
                </P>
                <TextButton link={data.button.link}>
                    <span style={{ color: data.farbe.value == "#3E55AB" ? "#E2EAF7" : null }}>{data.button.label}</span>
                </TextButton>
            </div>
        </motion.div>
    );
};

export default Card;
