import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

//COMPONENTS
import { CoverImage } from "../../images";
import { MainButton, MainButtonNOLink } from "../../buttons";
import { Raumvermietung, Anfrage } from "../../modalContent";
import { CatCard } from "../../cards";
import SmallerDecal from "../../decorative/smallerDecal";

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

//ASSETS
import CafeIcon from "../../../assets/cafeIcon.svg";
import ProgrammIcon from "../../../assets/programmIcon.svg";
import PartyIcon from "../../../assets/partyIcon.svg";
import AboutIcon from "../../../assets/aboutIcon.svg";

const MainHero = ({ data, bgColor, modal, onClick }) => {
    const { width, height } = useWindowDimensions();
    const router = useRouter();

    const [aspectRatio, setAspectRatio] = useState("1/0.75");

    const cards = [
        { text: "Unser Café", bgColor: "#EE4799", icon: CafeIcon.src, isWhite: true, order: "xl:order-3" },
        { text: "Kursprogramm", bgColor: "#F3E584", icon: ProgrammIcon.src, order: "xl:order-4" },
        { text: "Geburtstagsfeiern", bgColor: "#CDE4C4", icon: PartyIcon.src, order: "xl:order-2" },
        { text: "Das sind wir", bgColor: "#E2EAF7", icon: AboutIcon.src, order: "xl:order-1" },
    ];

    // GLOBAL STATES
    const setShowOverlay = useStore((state) => state.setShowOverlay);
    const setShowModal = useStore((state) => state.setShowModal);
    const setModalContent = useStore((state) => state.setModalContent);

    //ANIMATIONM PROPS

    const container = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 1,
                duration: 0.6,

                // staggerChildren: 0.6,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 20,
            },
        },
    };

    const animationProps = {
        initial: { opacity: 0, scale: 0, rotate: 0 },
        animate: {
            opacity: 1,
            scale: [0.1, 1.2, 0.8, 1.05, 1],
            rotate: [0, 360],
        },
        transition: {
            delay: 1,
            duration: 2,
            type: "spring",
            stiffness: 600,
            damping: 15,
            mass: 0.8,
            times: [0, 0.3, 0.6, 0.8, 1],
        },
    };

    const animationProps2 = {
        initial: { opacity: 0, scale: 0, rotate: 0 },
        animate: {
            opacity: 1,
            scale: [0.1, 1.2, 0.8, 1.05, 1],
            rotate: [0, 310],
        },
        transition: {
            delay: 1.2,
            duration: 2.4,
            type: "spring",
            stiffness: 900,
            damping: 15,
            mass: 0.8,
            times: [0, 0.3, 0.6, 0.8, 1],
        },
    };

    // const [topDistance, setTopDistance]
    useEffect(() => {}, [console.log(CafeIcon.src)]);

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
            className="col-span-12 h-[100svh] xl:min-h-0  bg-transparent md:px-4 pb-8 lg:pb-0 lg:mt-0"
        >
            {/* TEXT ABSILUTE DESKTOP */}
            <div className="absolute hidden lg:block top-[23svh] z-20 w-[42svw]">
                <H1 klasse="!mb-20 lg:mb-0 xl:!mb-6 ">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.4,
                            duration: 0.85,
                        }}
                    >
                        {data.headline}
                    </motion.div>
                </H1>
            </div>
            <div className="absolute hidden lg:block xl:top-[52svh] 2xl:top-[50svh] z-20 w-[29svw]">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.4,
                        duration: 0.85,
                    }}
                >
                    <P klasse="hidden md:block md:mb-10 lg:mb-0">{data.text}</P>
                </motion.div>
            </div>

            <div ref={heightRef} className="grid grid-cols-12 z-10 h-full lg:gap-24 xl:gap-0 relative">
                <div className="col-span-12  lg:col-span-5 text-center lg:text-left pt-28 md:pt-40 lg:pt-0 hidden md:flex flex-col justify-center z-20">
                    {/* <motion.div className="lg:mt-[25svh]">
                        <div className="relative">
                            <H1 klasse="!mb-20 lg:mb-0 xl:!mb-6 ">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 0.4,
                                        duration: 0.85,
                                    }}
                                >
                                    {data.headline}
                                </motion.div>
                            </H1>
                        </div>
                        <P klasse="hidden md:block md:mb-10 lg:mb-0">{data.text}</P>
                    </motion.div> */}

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
                                            klasse={`hidden ${
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
                <motion.div className="col-span-12 lg:col-span-7 relative z-10  md:mt-0 lg:mt-[8svh]">
                    <CoverImage
                        src={urlFor(data.image).url()} // Replace with the actual path to your image
                        mobileSrc={urlFor(data.image).url()} // Replace with the actual path to your image
                        alt="Cover Background"
                        // style={{ aspectRatio: aspectRatio }}
                        className="w-full z-20 hidden lg:block relative rounded-[40px] overflow-hidden aspect-[1/0.5] md:aspect-[1/0.7] 2xl:aspect-[1/0.77]"
                        // data-aos={"fade-left"}
                        ref={imgRef}
                        priority={true}
                    />

                    <motion.div className="flex-col justify-center flex text-center md:hidden mt-[18svh] px-4">
                        <H1 klasse="!mb-[5svh] lg:mb-0 xl:!mb-6">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2, duration: 0.85 }}
                            >
                                {data.headline}
                            </motion.div>
                        </H1>
                        {/* <P klasse="text-xs px-4 md:px-0 md:block md:mb-10 lg:mb-0">{data.text}</P> */}
                        <P klasse="text-xs  px-0 md:px-0 md:block md:mb-10 lg:mb-0">
                            <motion.span
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4, duration: 0.85 }}
                            >
                                Willkommen bei MainGlückskind, dem Ort, an dem Kinder lernen, sich entfalten und die
                                Welt mit einem Lächeln erkunden.
                            </motion.span>
                        </P>
                    </motion.div>
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8, duration: 0.8 }}
                        style={{ height: `${bgHeight * 0.89}px` }}
                        className="absolute  lg:block bg-themeGreen-50 w-[104%] md:w-[106%] left-[-0.5rem] md:left-[-1rem] rounded-[40px] h-full top-[-4rem] md:top-[-1rem] lg:top-[-2rem] lg:w-full lg:right-[-2rem] lg:left-auto lg:translate-x-0 z-[0]"
                    ></motion.div>
                    <motion.div
                        className="col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-2 px-4 mt-[4svh] lg:hidden"
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                        {cards.map((e, i) => {
                            return (
                                <CatCard
                                    text={e.text}
                                    bgColor={e.bgColor}
                                    icon={e.icon}
                                    isWhite={e.isWhite}
                                    // animationProps={{ variants: cardVariants }}
                                ></CatCard>
                            );
                        })}
                    </motion.div>

                    {/* //CARDS */}
                </motion.div>
                <motion.div
                    className="col-span-12  grid-cols-2 lg:grid-cols-4 gap-2 px-4 hidden lg:grid"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {cards.map((e, i) => {
                        return (
                            <CatCard
                                order={e.order}
                                text={e.text}
                                bgColor={e.bgColor}
                                icon={e.icon}
                                isWhite={e.isWhite}
                                // animationProps={{ variants: cardVariants }}
                            ></CatCard>
                        );
                    })}
                </motion.div>
                {/* <div className="col-span-12 wrapper flex space-x-2 mt-6 lg:mt-8 justify-center lg:hidden">
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
                </div> */}
                {/* <div
                    style={{ height: bgHeight * 0.89 + "px" }}
                    className="absolute bg-themeGreen-50 w-[97%] lg:hidden rounded-[40px] h-full top-[0] lg:top-32 lg:w-2/4 lg:right-32 lg:left-auto left-1/2 transform translate-x-[-50%] lg:translate-x-0 z-[0]"
                ></div> */}
            </div>
            <SmallerDecal
                klasse="absolute top-[8svh] xl:hidden w-[44svw]  left-[29svw] z-0 opacity-20"
                motionProps={animationProps}
            />
            <SmallerDecal
                klasse="absolute top-[8svh] w-[16vw] xl:hidden left-[60svw] z-0 opacity-20"
                motionProps={animationProps2}
            />
            <SmallerDecal
                klasse="absolute top-[5svh] w-[10vw] xl:hidden left-[50svw] z-0 opacity-20 !rotate-6"
                motionProps={animationProps2}
            />

            <motion.div
                translateY={["-90vh", "90vh"]}
                initial={{ x: "-100%", opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 95, damping: 15 }}
                style={{ height: bgHeightAbsolute, background: bgColor }}
                className="absolute bg-[#AFD3A2]  w-2/4 left-0 top-0 z-[-10] hidden md:block"
            ></motion.div>

            <motion.div
                // translateY={["-90vh", "90vh"]}
                initial={{ y: "-100%", opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 95, damping: 15 }}
                style={{ background: bgColor }}
                className="absolute bg-[#AFD3A2] h-[75svh]  w-full left-0 bottom-0 z-[-10]  md:hidden"
            ></motion.div>
        </section>
    );
};

export default MainHero;
