import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

//COMPONENTS
import { CoverImage } from "../images";
import { MainButton, MainButtonNOLink } from "../buttons";

//TYPO
import { H1, P } from "../typography";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

//FRAMER
import { motion } from "framer-motion";

//HOOKS
import { useWindowDimensions } from "../../hooks/useWindowDimension";

import PekipHeroImage from "../../assets/pekipHero.png";
import { BasicPortableText } from "../content";
//STORE
import useStore from "../../store/store"; // Adjust the path to your store file

const PekipHero = ({ data }) => {
    const { width, height } = useWindowDimensions();

    useEffect(() => {}, []);

    return (
        <section className={`col-span-12 xl:min-h-0   md:px-4 pb-8 lg:pb-0 lg:mt-24`}>
            <div className="grid grid-cols-12 z-10 h-full xl:gap-24 relative">
                <div className="col-span-12 lg:col-span-6 xl:col-span-5  lg:text-left -mt-12 px-4 lg:px-0  md:pt-40 lg:pt-0 order-last lg:order-first md:flex flex-col justify-center z-20">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4, duration: 0.85 }}
                    >
                        <H1 klasse="!mb-2 lg:mb-0 xl:!mb-2  2xl:!mb-6 !text-7xl lg:!text-8xl 2xl:!text-9xl">
                            {data.heroSettings.headline}
                        </H1>
                        <P klasse="block font-bold mb-6 md:mb-10 lg:mb-8 !text-xl lg:!text-2xl 2xl:!text-3xl !text-semibold ">
                            {data.heroSettings.subline}
                        </P>
                        <BasicPortableText value={data.heroSettings.intro}></BasicPortableText>

                        {/* Unsere Kurse finden regelmäßig statt, aber die Nachfrage ist groß – daher ist eine Vormerkung notwendig. Hier  erfährst du alles Wichtige! */}
                    </motion.div>

                    <div className="wrapper  space-x-6  lg:flex mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full"
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.9 * 0.2 }}
                        >
                            <MainButton klasse={`${"bg-primaryColor border-2 border-primaryColor"}`} link="#anmelden">
                                Jetzt vormerken
                            </MainButton>
                        </motion.div>
                    </div>

                    <div className="wrapper  space-x-6   lg:hidden mt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full"
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.9 * 0.2 }}
                        >
                            <MainButton klasse={`${"bg-none border-2 border-textColor text-textColor"}`} link="#kurszeiten">
                                Kurszeiten
                            </MainButton>
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6, duration: 0.8 }}
                    className="col-span-12 lg:col-span-6 xl:col-span-7 relative p-4 lg:p-0  z-10 mt-6 md:mt-0 "
                >
                    <CoverImage
                        src={PekipHeroImage.src} // Replace with the actual path to your image
                        mobileSrc={PekipHeroImage.src} // Replace with the actual path to your image
                        alt="Cover Background"
                        className={`w-full z-20   lg:block relative rounded-[10px] overflow-hidden  aspect-[957/926] `}
                        priority={true}
                    />
                </motion.div>

                {/* <div className="col-span-12 wrapper flex space-x-2 mt-6 lg:mt-8 justify-center lg:hidden px-4">
                    <MainButton klasse={`NOINONONO ${"bg-primaryColor border-2 border-primaryColor"}`} link={"e.link"}>
                        {"e.label"}
                    </MainButton>
                    );
                </div> */}
                {/* <div
                    style={{ height: bgHeight * 0.89 + "px" }}
                    className="absolute bg-themeGreen-50 w-[97%] lg:hidden rounded-[40px] h-full top-[0] lg:top-32 lg:w-2/4 lg:right-32 lg:left-auto left-1/2 transform translate-x-[-50%] lg:translate-x-0 z-[0]"
                ></div> */}
            </div>
            <motion.div
                translateY={["-90vh", "90vh"]}
                initial={{ x: "-100%", opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 95, damping: 15 }}
                className="absolute bg-[#AFD3A2]  w-2/4 left-0 top-0 z-[-10] hidden md:block"
            ></motion.div>
        </section>
    );
};

export default PekipHero;
