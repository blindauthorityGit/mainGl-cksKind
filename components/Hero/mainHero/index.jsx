import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

//COMPONENTS
import { CoverImage } from "../../images";
import { MainButton, MainButtonNOLink } from "../../buttons";
import { Raumvermietung, Anfrage } from "../../modalContent";

//TYPO
import { H1, P } from "../../typography";

//FUNCTIONS
import urlFor from "../../../functions/urlFor";

//FRAMER
import { motion } from "framer-motion";

//HOOKS
import { useWindowDimensions } from "../../../hooks/useWindowDimension";

//STORE
import useStore from "../../../store/store"; // Adjust the path to your store file

const MainHero = ({ data, bgColor, modal, onClick }) => {
    const { width, height } = useWindowDimensions();
    const router = useRouter();

    const [aspectRatio, setAspectRatio] = useState("1/0.75");

    // GLOBAL STATES
    const setShowOverlay = useStore((state) => state.setShowOverlay);
    const setShowModal = useStore((state) => state.setShowModal);
    const setModalContent = useStore((state) => state.setModalContent);

    // const [topDistance, setTopDistance]
    useEffect(() => {}, []);

    const imgRef = useRef();
    const heightRef = useRef();
    const [bgHeight, setBGHeight] = useState(null);
    const [bgHeightAbsolute, setBGHeightAbsolute] = useState(0);
    // Resize handler
    const handleResize = () => {
        if (heightRef.current) {
            setBGHeightAbsolute(heightRef.current.clientHeight + 140 + "px");
        }
    };
    useEffect(() => {
        // Set initial value
        if (heightRef.current) {
            setBGHeightAbsolute(heightRef.current.clientHeight + 140 + "px");
        }
    }, [heightRef.current, width, aspectRatio]);

    useEffect(() => {
        setBGHeightAbsolute(heightRef.current.clientHeight + 140 + "px");
    }, [heightRef.current]);

    return (
        <section
            style={{ background: bgColor }}
            className="col-span-12 min-h-[70vh] xl:min-h-0  bg-[#AFD3A2] md:bg-transparent md:px-4 pb-8 lg:pb-0 lg:mt-24"
        >
            <div ref={heightRef} className="grid grid-cols-12 z-10 h-full lg:gap-24 relative">
                <div className="col-span-12  lg:col-span-5 text-center lg:text-left pt-28 md:pt-40 lg:pt-0 hidden md:flex flex-col justify-center z-20">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4, duration: 0.85 }}
                    >
                        <H1 klasse="!mb-10 lg:mb-0 xl:!mb-6">{data.headline}</H1>
                        <P klasse="hidden md:block md:mb-10 lg:mb-0">{data.text}</P>
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
                                    {modal ? (
                                        <MainButtonNOLink
                                            klasse={`${
                                                e.HauptButton
                                                    ? "bg-primaryColor border-2 border-primaryColor"
                                                    : "border-2 border-primaryColor-50"
                                            }`}
                                            onClick={() => {
                                                e.HauptButton ? (setShowOverlay(true), setShowModal(true)) : null;
                                                if (router.pathname === "/raumvermietung") {
                                                    setModalContent(<Anfrage image={data.image} raum={true}></Anfrage>);
                                                }
                                                if (router.pathname === "/kindergeburtstag") {
                                                    setModalContent(
                                                        <Anfrage image={data.image} kindergeburtstag={true}></Anfrage>
                                                    );
                                                }
                                            }}
                                        >
                                            {e.label}
                                        </MainButtonNOLink>
                                    ) : (
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
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6, duration: 0.8 }}
                    className="col-span-12 lg:col-span-7 relative z-10 mt-10 md:mt-0 lg:mt-12"
                >
                    <CoverImage
                        src={urlFor(data.image).url()} // Replace with the actual path to your image
                        mobileSrc={urlFor(data.image).url()} // Replace with the actual path to your image
                        alt="Cover Background"
                        // style={{ aspectRatio: aspectRatio }}
                        className="w-full z-20 relative rounded-[40px] overflow-hidden aspect-[1/0.5] md:aspect-[1/0.7] xl:aspect-[1/0.85]"
                        data-aos={"fade-left"}
                        ref={imgRef}
                    />
                    <motion.div
                        className="flex-col justify-center flex text-center md:hidden mt-6 px-4"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4, duration: 0.85 }}
                    >
                        <H1 klasse="!mb-4 lg:mb-0 xl:!mb-6">{data.headline}</H1>
                        <P klasse="text-xs px-4 md:px-0 md:block md:mb-10 lg:mb-0">{data.text}</P>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8, duration: 0.8 }}
                        style={{ height: `${bgHeight * 0.89}px` }}
                        className="absolute  lg:block bg-themeGreen-50 w-[104%] md:w-[106%] left-[-0.5rem] md:left-[-1rem] rounded-[40px] h-full top-[-4rem] md:top-[-1rem] lg:top-[-2rem] lg:w-full lg:right-[-2rem] lg:left-auto lg:translate-x-0 z-[0]"
                    ></motion.div>
                </motion.div>

                <div className="col-span-12 wrapper flex space-x-2 mt-6 lg:mt-8 justify-center lg:hidden">
                    {data.buttons.map((e, i) => {
                        console.log(modal);
                        return modal ? (
                            <MainButtonNOLink
                                klasse={`NOINONONO ${
                                    e.HauptButton
                                        ? "bg-primaryColor border-2 border-primaryColor"
                                        : "border-2 border-primaryColor-50"
                                }`}
                                onClick={() => {
                                    e.HauptButton ? (setShowOverlay(true), setShowModal(true)) : null;
                                    if (router.pathname === "/raumvermietung") {
                                        setModalContent(<Anfrage image={data.image} raum={true}></Anfrage>);
                                    }
                                    if (router.pathname === "/kindergeburtstag") {
                                        setModalContent(<Anfrage image={data.image} kindergeburtstag={true}></Anfrage>);
                                    }
                                }}
                            >
                                {e.label}
                            </MainButtonNOLink>
                        ) : (
                            <MainButton
                                klasse={`NOINONONO ${
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
                style={{ height: bgHeightAbsolute, background: bgColor }}
                className="absolute bg-[#AFD3A2]  w-2/4 left-0 top-0 z-[-10] hidden md:block"
            ></motion.div>
        </section>
    );
};

export default MainHero;
