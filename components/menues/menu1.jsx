import React, { useState, useEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/router";

//BUTTON
import { MainButton } from "../buttons";

// Overlay
import Overlay from "../overlay";
// Modal
import Modal from "../modal/modal1";

import { Newsletter } from "../menues";

//Mobile Nav
import Mobile1 from "./mobile1";
//Framer Motion
import { motion, useScroll, useAnimation } from "framer-motion";

const Menu1 = (props) => {
    const router = useRouter();

    const [showOverlay, setShowOverlay] = useState(false);

    const navRef = useRef(null);
    const animate = useAnimation();

    const ref = useRef(null);

    // const { scrollYProgress } = useScroll();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > navRef.current.offsetTop) {
                navRef.current.classList.add("fixed", "top-0");
                ref.current.classList.remove("hidden");
                ref.current.classList.add("scale-up-hor-left", "block");
            } else {
                // navRef.current.classList.remove("fixed");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        // Listen for changes in the route
        const handleRouteChange = () => {
            setShowOverlay(false);
        };
        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    const onEnter = (e) => {
        console.log(e.target);
    };

    const textMotion = {
        rest: {
            x: -50,
            opacity: 0,

            transition: {
                duration: 0.85,
                type: "tween",
                ease: "easeIn",
            },
        },
        hover: {
            // color: "blue",
            x: 0,
            opacity: 1,

            transition: {
                duration: 0.5,
                type: "tween",
                ease: "easeOut",
            },
        },
    };

    const boxMotion = {
        rest: {
            opacity: 0,
            display: "none",
            ease: "easeOut",
            duration: 0.2,
            type: "spring",
            transition: {
                duration: 0.5,
                type: "tween",
                ease: "easeIn",
            },
        },
        hover: {
            opacity: 1,
            display: "block",
            transition: {
                duration: 0.4,
                type: "spring",
                ease: "easeIn",
            },
        },
        end: {
            opacity: 0,
            display: "block",
            transition: {
                duration: 0.4,
                type: "spring",
                ease: "easeIn",
            },
        },
    };

    const pfeilMotion = {
        rest: {
            y: -5,
            ease: "easeOut",
            duration: 0.5,
            type: "spring",
            transition: {
                duration: 0.5,
                type: "tween",
                ease: "easeIn",
            },
        },
        hover: {
            y: 0,
            transition: {
                duration: 0.5,
                type: "spring",
                ease: "easeIn",
            },
        },
    };

    return (
        <>
            {showOverlay ? <Overlay onClick={(e) => setShowOverlay(false)}></Overlay> : null}
            {showOverlay ? (
                <Mobile1 socialMedia={props.socialMedia} onClick={(e) => setShowOverlay(false)}></Mobile1>
            ) : null}
            {/* <motion.div
                className="h-16 fixed top-0 left-0 right-0 origin-[0%] bg-white z-40"
                style={{ scaleX: scrollYProgress }}
            /> */}
            <nav ref={navRef} className={`w-full fixed z-30 px-4 sm:px-12 lg:py-2 top-0   ${props.colspan}`}>
                {/* BG */}
                <div className=" z-40 grid relative 2xl:container mx-auto grid-cols-12 m-auto items-center  py-2 sm:py-4  lg:px-0 lg:py-0">
                    {/* Background Image */}
                    <div className="logo col-span-4 md:col-span-2 ">
                        <Link className="flex" href="/">
                            <img
                                src={props.logo}
                                className="max-h-[5.75rem] sm:max-h-[8.75rem] fill-current-[#fff] absolute top-0"
                                alt="Logo"
                            />
                        </Link>
                    </div>
                    <div className="col-span-6 md:col-span-8 ">
                        <ul className="hidden lg:flex items-center list-style-none justify-end pr-8">
                            {props.menuItems.map((e, i) => {
                                return (
                                    <motion.li
                                        initial="rest"
                                        whileHover="hover"
                                        animate="rest"
                                        key={`menuKey${i}`}
                                        className="relative mx-8 py-4 font-headline tracking-wider  text-blackText-300 hover:text-primaryColor-500"
                                        onMouseEnter={(e) => {
                                            onEnter(e);
                                        }}
                                    >
                                        <Link
                                            href={`/${e.slug}`}
                                            className="flex items-end font-sans font-semibold text-textColor uppercase text-sm "
                                        >
                                            {e.title}{" "}
                                            {e.subMenu ? (
                                                <motion.span variants={pfeilMotion}>
                                                    <BiChevronDown></BiChevronDown>
                                                </motion.span>
                                            ) : null}
                                        </Link>
                                        {e.subMenu ? (
                                            <motion.ul
                                                variants={boxMotion}
                                                className={`absolute z-50 mt-4 bg-[#000] text-white pl-16 pr-24 py-4 left-[-4rem] rounded-br-lg rounded-bl-lg ${props.subMenuKlasse}`}
                                            >
                                                {e.subMenuItems.map((e, i) => {
                                                    return (
                                                        <motion.li
                                                            variants={textMotion}
                                                            key={`submenuKey${i}`}
                                                            className="min-w-max mb-3"
                                                        >
                                                            <Link
                                                                href={`${e.external ? "" : "/"}${e.slug}`}
                                                                className="hover:text-primaryColor-400 font-semibold"
                                                            >
                                                                {e.title}
                                                            </Link>
                                                            <hr className="mt-1" />
                                                        </motion.li>
                                                    );
                                                })}
                                            </motion.ul>
                                        ) : null}
                                    </motion.li>
                                );
                            })}
                        </ul>
                        {/* 
                        <ul className="block md:flex lg:hidden lg:flex items-center list-style-none justify-end pr-12">
                            <Newsletter onClick={props.onClick}></Newsletter>
                        </ul> */}
                    </div>
                    <div className=" flex justify-end text-xl md:text-xl col-span-2">
                        <div
                            className="block lg:hidden cursor-pointer"
                            onClick={(e) => {
                                setShowOverlay(true);
                            }}
                        >
                            <img src={props.burgerIcon} alt="" />
                        </div>
                        <div className="hidden lg:flex mt-0 pt-0 items-center col-span-2">
                            <MainButton klasse="bg-primaryColor !py-3" link="/programm">
                                Jetzt buchen
                            </MainButton>
                        </div>
                        <div className="hidden lg:hidden ">
                            {props.socialMedia.map((e, i) => {
                                return (
                                    <a className="mr-4" key={`smKey${i}`} href={e.link} alt={e.title}>
                                        {e.icon}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    {/* <div className="relative top-[1000%] w-full h-24 bg-red-500" ref={ref}></div> */}
                </div>
                <style jsx>{`
                    .hover-underline-animation {
                        display: inline-block;
                        position: relative;
                        color: #000;
                    }

                    .hover-underline-animation::after {
                        content: "";
                        position: absolute;
                        width: 100%;
                        transform: scaleX(0);
                        height: 1px;
                        bottom: 0;
                        left: 0;
                        background-color: #000;
                        transform-origin: bottom right;
                        transition: transform 0.25s ease-out;
                    }

                    .hover-underline-animation:hover::after {
                        transform: scaleX(1);
                        transform-origin: bottom left;
                    }
                `}</style>
                <motion.div
                    ref={ref}
                    className="absolute hidden w-full h-full top-0 left-0 bg-themeGreen-50"
                ></motion.div>
            </nav>
        </>
    );
};

export default Menu1;
