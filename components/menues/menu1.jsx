import React, { useState, useEffect, useRef, forwardRef } from "react";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/router";

//BUTTON
import { MainButton } from "../buttons";

// ASSETS
import LogoSimple from "../../assets/logoSimple.svg";
// Modal
import Modal from "../modal/modal1";

import { Newsletter } from "../menues";

//Mobile Nav
import Mobile1 from "./mobile1";
//Framer Motion
import { motion, useScroll, useAnimation } from "framer-motion";

//STORE
import useStore from "../../store/store"; // Adjust the path to your store file

const Menu1 = (props) => {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);

    //STORE
    const setShowOverlay = useStore((state) => state.setShowOverlay);

    const showMobileMenu = useStore((state) => state.showMobileMenu);
    const setShowMobileMenu = useStore((state) => state.setShowMobileMenu);

    const navRef = useRef(null);

    const ref = useRef(null);

    // const { scrollYProgress } = useScroll();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > navRef.current.offsetTop) {
                setScrolled(true);
                navRef.current.classList.add("fixed", "top-0");
                ref.current.classList.remove("hidden");
                ref.current.classList.add("scale-up-hor-left", "block");
            } else {
                setScrolled(false);
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

    const onEnter = (e) => {};

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
            {showMobileMenu ? (
                <Mobile1
                    socialMedia={props.socialMedia}
                    showMenu={showMobileMenu}
                    onClick={(e) => {
                        setTimeout(() => {
                            setShowOverlay(false);
                            setShowMobileMenu(false);
                        }, 100);
                    }}
                ></Mobile1>
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
                            <motion.img
                                // src={scrolled ? LogoSimple.src : props.logo}
                                src={props.logo}
                                className="w-[26vw] lg:w-[10svw] 2xl:w-[8svw] fill-current-[#fff] absolute top-0"
                                alt="Logo"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </Link>
                    </div>
                    <div className="col-span-6 lg:col-span-10 xl:col-span-8 ">
                        <ul className="hidden lg:flex items-center list-style-none justify-end pr-8">
                            {props.menuItems.map((e, i) => {
                                return (
                                    <motion.li
                                        initial="rest"
                                        whileHover="hover"
                                        animate="rest"
                                        key={`menuKey${i}`}
                                        className="relative  mx-4 xl:mx-4 2xl:mx-6 py-4 font-headline xl:tracking-wider  text-blackText-300 hover:text-primaryColor-500"
                                        onMouseEnter={(e) => {
                                            onEnter(e);
                                        }}
                                    >
                                        <Link
                                            href={`/${e.slug}`}
                                            className="flex items-end font-sans font-semibold text-textColor uppercase text-xs xl:text-xs 2xl:text-xs"
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
                                                className={`absolute z-50 mt-4 bg-textColor text-white pl-16 pr-24 py-4 left-[-4rem] rounded-br-lg rounded-bl-lg ${props.subMenuKlasse}`}
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
                    <div className=" flex justify-end text-xl md:text-xl col-span-2 md:col-span-4 lg:col-span-0 xl:col-span-2">
                        <div
                            className="block lg:hidden cursor-pointer"
                            onClick={(e) => {
                                setShowMobileMenu(true);
                                setShowOverlay(true);
                            }}
                        >
                            <img className="h-[1.7rem]" src={props.burgerIcon} alt="" />
                        </div>
                        <div className="hidden xl:flex mt-0 pt-0 items-center col-span-2">
                            <MainButton klasse="bg-primaryColor !py-3" link="/programm">
                                Unsere Kurse
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
                <motion.div ref={ref} className="absolute hidden w-full h-full top-0 left-0 bg-white"></motion.div>
            </nav>
        </>
    );
};

export default Menu1;
