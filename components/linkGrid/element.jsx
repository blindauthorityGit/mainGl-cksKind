import React, { useEffect } from "react";
import Link from "next/link";

//ANIMATION
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

//COMPONENTS
import { CoverImage, ContainImage } from "../images";
import { TextButton } from "../buttons";

//TYPO
import { H3, H4, P } from "../typography";

//FUNCTIONS
import urlFor from "../../functions/urlFor";
import { useWindowDimensions } from "../../hooks/useWindowDimension";

const Element = ({ data, i, isWorkshop, isDetail, link, partner }) => {
    const { width } = useWindowDimensions();
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
        console.log(link);
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView, isMobile]); //
    return (
        <motion.div
            ref={ref}
            className={`col-span-12 md:col-span-6 lg:col-span-4 `}
            initial="hidden"
            animate={controls}
            variants={variants}
        >
            <Link href={`${link ? link : "#"}`}>
                {partner ? (
                    <ContainImage
                        src={urlFor(isDetail ? data.image : data.logo).url()} // Replace with the actual path to your image
                        mobileSrc={urlFor(isDetail ? data.image : data.logo).url()} // Replace with the actual path to your image
                        alt="Cover Background"
                        // style={{ aspectRatio: "1/0.8" }}
                        className="w-full z-20 bg-white relative rounded-[40px] overflow-hidden aspect-[1/0.5] xl:aspect-[1/0.8]"
                    />
                ) : (
                    <CoverImage
                        src={urlFor(isDetail ? data.image : data.logo).url()} // Replace with the actual path to your image
                        mobileSrc={urlFor(isDetail ? data.image : data.logo).url()} // Replace with the actual path to your image
                        alt="Cover Background"
                        klasse={data.ausgebucht ? "opacity-30" : "null"}
                        // style={{ aspectRatio: "1/0.8" }}
                        className="w-full z-20 relative rounded-[40px] overflow-hidden aspect-[1/0.5] xl:aspect-[1/0.8]"
                    />
                )}
            </Link>
            <div className="px-6 lg:px-8 rounded-[40px] py-2 lg:py-6 mb-2 lg:mb-2 text-center md:text-left">
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
