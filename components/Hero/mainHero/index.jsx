import React, { useEffect, useState, useRef } from "react";

//COMPONENTS
import { CoverImage } from "../../images";
import { MainButton } from "../../buttons";

//TYPO
import { H1, P } from "../../typography";

//FUNCTIONS
import urlFor from "../../../functions/urlFor";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

//FRAMER
import { motion } from "framer-motion";

//PARALLAX
import { Parallax } from "react-scroll-parallax";

const MainHero = ({ data }) => {
    useEffect(() => {
        console.log(urlFor(data.image).url(), imgRef.current.clientHeight);
        setBGHeight(imgRef.current.clientHeight);
    }, []);

    const imgRef = useRef();

    const [bgHeight, setBGHeight] = useState(null);

    return (
        <section className="col-span-12 min-h-screen bg-[#AFD3A2] lg:bg-transparent px-4 pb-8 lg:pb-0">
            <div className="grid grid-cols-12 z-10 h-full lg:gap-24">
                <div className="col-span-12 lg:col-span-5 text-center lg:text-left pt-24 lg:pt-0  flex flex-col justify-center z-20">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4, duration: 0.85 }}
                    >
                        <H1>{data.headline}</H1>
                        <P>{data.text}</P>
                    </motion.div>

                    <div className="wrapper  space-x-6 hidden lg:flex mt-12">
                        {data.buttons.map((e, i) => {
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full"
                                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.9 + i * 0.2 }}
                                >
                                    <MainButton
                                        klasse={`${
                                            e.HauptButton
                                                ? "bg-primaryColor border-2 border-primaryColor"
                                                : "border-2 border-primaryColor-50"
                                        }`}
                                        link={e.link}
                                    >
                                        {e.label}
                                    </MainButton>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6, duration: 0.8 }}
                    className="col-span-12 lg:col-span-7 relative z-10 mt-6 lg:mt-48"
                >
                    <CoverImage
                        src={urlFor(data.image).url()} // Replace with the actual path to your image
                        mobileSrc={urlFor(data.image).url()} // Replace with the actual path to your image
                        alt="Cover Background"
                        style={{ aspectRatio: "1/1.05" }}
                        className="w-full z-20 relative rounded-[40px] overflow-hidden"
                        data-aos={"fade-left"}
                        ref={imgRef}
                    />
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8, duration: 0.8 }}
                        style={{ height: `${bgHeight * 0.89}px` }}
                        className="absolute hidden lg:block bg-themeGreen-50 w-[97%] rounded-[40px] h-full top-[25.5rem] lg:top-[-2rem] lg:w-full lg:right-[-2rem] lg:left-auto lg:translate-x-0 z-[0]"
                    ></motion.div>
                </motion.div>

                <div className="col-span-12 wrapper flex space-x-2 mt-8 lg:hidden">
                    {data.buttons.map((e, i) => {
                        return (
                            <MainButton
                                klasse={`${
                                    e.HauptButton
                                        ? "bg-primaryColor border-2 border-primaryColor"
                                        : "border-2 border-primaryColor-50"
                                }`}
                                link={e.link}
                            >
                                {e.label}
                            </MainButton>
                        );
                    })}
                </div>
                <div
                    style={{ height: bgHeight * 0.89 + "px" }}
                    className="absolute bg-themeGreen-50 w-[97%] lg:hidden rounded-[40px] h-full top-[25.5rem] lg:top-32 lg:w-2/4 lg:right-32 lg:left-auto left-1/2 transform translate-x-[-50%] lg:translate-x-0 z-[0]"
                ></div>
            </div>
            <motion.div
                initial={{ x: "-100%", opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 95, damping: 15 }}
                className="absolute bg-[#AFD3A2] h-full w-2/4 left-0 top-0 z-[-10] hidden lg:block"
            ></motion.div>
        </section>
    );
};

export default MainHero;
