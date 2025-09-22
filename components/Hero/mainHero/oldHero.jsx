import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

//COMPONENTS
import { CoverImage } from "../../images";
import { MainButton, MainButtonNOLink } from "../../buttons";
import { Raumvermietung, Anfrage } from "../../modalContent";
import MultiStepReservation from "../../modalContent/stepsBirthday/multiStepReservation";

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

const OldHero = ({ data, bgColor, modal, onClick, noCards, klasse, additionalLink }) => {
    const { width, height } = useWindowDimensions();
    const router = useRouter();

    const [aspectRatio, setAspectRatio] = useState("1/0.75");

    // GLOBAL STATES
    const setShowOverlay = useStore((state) => state.setShowOverlay);
    const setShowModal = useStore((state) => state.setShowModal);
    const setModalContent = useStore((state) => state.setModalContent);

    useEffect(() => {}, []);

    const imgRef = useRef();
    const heightRef = useRef();
    const [bgHeight, setBGHeight] = useState(null);
    const [bgHeightAbsolute, setBGHeightAbsolute] = useState(0);

    const handleResize = () => {
        if (heightRef.current) {
            setBGHeightAbsolute(heightRef.current.clientHeight + 140 + "px");
        }
    };
    useEffect(() => {
        if (heightRef.current) {
            setBGHeightAbsolute(heightRef.current.clientHeight + 140 + "px");
        }
    }, [heightRef.current, width, aspectRatio]);

    useEffect(() => {
        setBGHeightAbsolute(heightRef.current.clientHeight + 140 + "px");
    }, [heightRef.current]);

    // Entscheidet, ob ein Button ein Modal öffnet (statt Link)
    const isButtonModal = (btn) =>
        modal && (btn?.HauptButton === true || !btn?.link || btn?.link === "#" || btn?.link?.startsWith("modal"));

    // Öffnet das passende Modal je nach Route
    const openModalForRoute = () => {
        setShowOverlay(true);
        setShowModal(true);
        if (router.pathname === "/raumvermietung") {
            setModalContent(<Anfrage image={data.image} raum />);
        } else if (router.pathname === "/kindergeburtstag") {
            setModalContent(<MultiStepReservation image={data.image} kindergeburtstag />);
        } else {
            setModalContent(<Anfrage image={data.image} />);
        }
    };

    // Hilfsfunktion für Links (führt fehlenden Slash voran)
    const normLink = (link) => {
        if (!link) return "#";
        return link.startsWith("/") ? link : `/${link}`;
    };

    // additionalLink normalisieren: String -> {label, link}
    const additional =
        additionalLink &&
        (typeof additionalLink === "string" ? { label: "Mehr Infos", link: additionalLink } : additionalLink);

    return (
        <section
            style={{ background: bgColor }}
            className={`${klasse} col-span-12 min-h-[70vh] xl:min-h-0  bg-[#AFD3A2] md:bg-transparent md:px-4 pb-8 lg:pb-0 lg:mt-24`}
        >
            <div ref={heightRef} className="grid grid-cols-12 z-10 h-full xl:gap-24 relative">
                <div className="col-span-12 lg:col-span-6 xl:col-span-5 text-center lg:text-left pt-28 md:pt-40 lg:pt-0 hidden md:flex flex-col justify-center z-20">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4, duration: 0.85 }}
                    >
                        <H1 klasse="!mb-10 lg:mb-0 xl:!mb-6">{data.headline}</H1>
                        <P klasse="hidden md:block md:mb-10 lg:mb-0">{data.text}</P>
                    </motion.div>

                    {/* Desktop: zwei Buttons in einer Zeile */}
                    <div className="wrapper  space-x-6 hidden lg:flex mt-12">
                        {data?.buttons?.map((e, i) => (
                            <motion.div
                                key={e._key || i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full"
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.9 + i * 0.2 }}
                            >
                                {isButtonModal(e) ? (
                                    <MainButtonNOLink
                                        klasse={`${
                                            e.HauptButton
                                                ? "bg-primaryColor border-2 border-primaryColor"
                                                : "border-2 border-primaryColor-50"
                                        }`}
                                        onClick={openModalForRoute}
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
                                        link={normLink(e.link)}
                                    >
                                        {e.label}
                                    </MainButton>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop: zusätzlicher Button darunter (optional) */}
                    {additional?.link && (
                        <div className="hidden lg:block mt-4">
                            <a
                                className=" underline w-full justify-center font-sans font-semibold text-textColor p-4 items-center text-center flex"
                                href={additional.link}
                            >
                                {additional.label || "Mehr Infos"}
                            </a>
                        </div>
                    )}
                </div>

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6, duration: 0.8 }}
                    className="col-span-12 lg:col-span-6 xl:col-span-7 relative z-10 mt-10 md:mt-0 lg:mt-12"
                >
                    <CoverImage
                        src={urlFor(data.image).url()}
                        mobileSrc={urlFor(data.image).url()}
                        alt="Cover Background"
                        className={`w-full z-20 ${
                            !noCards ? "hidden" : null
                        }  lg:block lg:h-[53svh] lg:ml-12 relative rounded-[10px] overflow-hidden aspect-[1/0.73] md:aspect-[1/0.7] 2xl:aspect-[1/0.77]`}
                        ref={imgRef}
                        priority={true}
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

                {/* Mobile: zwei Buttons in einer Zeile */}
                <div className="col-span-12 wrapper flex space-x-2 mt-6 lg:mt-8 justify-center lg:hidden px-4">
                    {data?.buttons?.map((e, i) =>
                        isButtonModal(e) ? (
                            <MainButtonNOLink
                                key={e._key || i}
                                klasse={`${
                                    e.HauptButton
                                        ? "bg-primaryColor border-2 border-primaryColor"
                                        : "border-2 border-primaryColor-50"
                                }`}
                                onClick={openModalForRoute}
                            >
                                {e.label}
                            </MainButtonNOLink>
                        ) : (
                            <MainButton
                                key={e._key || i}
                                klasse={`${
                                    e.HauptButton
                                        ? "bg-primaryColor border-2 border-primaryColor"
                                        : "border-2 border-primaryColor-50"
                                }`}
                                link={normLink(e.link)}
                            >
                                {e.label}
                            </MainButton>
                        )
                    )}
                </div>

                {/* Mobile: zusätzlicher Button darunter (optional) */}
                {additional?.link && (
                    <div className="col-span-12 flex justify-center lg:hidden mt-3 px-4">
                        <a
                            className=" underline w-full justify-center font-sans font-semibold text-textColor p-4 items-center text-center flex"
                            href={normLink(additional.link)}
                        >
                            {additional.label || "Mehr Infos"}
                        </a>
                    </div>
                )}
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

export default OldHero;
