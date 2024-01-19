import React, { useState, useEffect } from "react";
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
import formatStringToDate from "../../functions/formatStringToDate";
import { useWindowDimensions } from "../../hooks/useWindowDimension";

const ElementEvent = ({ data, i, isWorkshop, isDetail }) => {
    const [flatData, setFlatData] = useState(null);

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
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView, isMobile]); //

    return (
        <div className="wrapper col-span-6 md:col-span-4 lg:col-span-3">
            <Link href={`/event/${data.slug.current}`}>
                <CoverImage
                    src={urlFor(data.image).url()} // Replace with the actual path to your image
                    mobileSrc={urlFor(data.image).url()} // Replace with the actual path to your image
                    alt="Cover Background"
                    style={{ aspectRatio: "1/1", borderColor: data.kategorie.farbe.value }}
                    className="w-full z-20 relative rounded-[40px] overflow-hidden border-[10px] lg:border-[12px] mb-3"
                />
            </Link>
            <div className="pl-2 hyphens-auto text-balance">
                <H4 klasse={isWorkshop ? "!text-blueColor-100" : null}>{data.headline}</H4>
                <P klasse={isWorkshop ? "!text-blueColor-100" : null}>{formatStringToDate(data.date)}</P>
            </div>
        </div>
    );
};

export default ElementEvent;
