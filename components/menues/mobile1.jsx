import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { motion, useAnimation } from "framer-motion";
import Logo from "../../assets/logo.svg";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/router";

//ASSETS
import LogoSimple from "../../assets/logoSimple.svg";

const Mobile1 = (props) => {
    const [showMenu, setShowMenu] = useState(props.showMenu);
    const { asPath } = useRouter();

    const burgerRef = useRef();

    function clicker(e) {
        console.log("Clicked");
    }

    function handleClose() {
        setShowMenu(false);
        if (props.onClick) {
            props.onClick();
        }
    }

    // Slide-in animation variants
    const slideInVariants = {
        hidden: {
            x: "100%", // Start off-screen to the right
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 600,
                damping: 30,
            },
        },
        visible: {
            x: "0%", // Slide to original position
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 800,
                damping: 40,
                delay: 0.2,
            },
        },
    };

    return (
        <>
            <motion.nav
                initial="hidden"
                animate={showMenu ? "visible" : "hidden"}
                variants={slideInVariants}
                className={`navbar ${props.klasse} 
                w-[90%] right-0 h-[100svh] bg-white fixed z-50 top-0 `}
            >
                <div onClick={handleClose} className="closer absolute text-xl rounded-full p-1 right-4 top-3">
                    <GrClose className=""></GrClose>
                </div>
                <div className="container h-screen py-3 px-8 font-europa tracking-snug">
                    <div className="logo col-span-4 md:col-span-2 ">
                        <Link className="flex" href="/">
                            <img
                                src={LogoSimple.src}
                                className="w-[20vw] fill-current-[#fff] absolute top-4"
                                // className="max-h-[5.75rem] sm:max-h-[8.75rem] fill-current-[#fff] absolute top-0"
                                alt="Logo"
                            />
                        </Link>
                    </div>
                    <div className="MenuItems text-xl sm:text-4xl pt-4 font-ueber text-textColor mt-16 ">
                        <Link
                            className="text-text block my-4 subNav relative mt-4 hover:text-primaryColor cursor-pointer"
                            href="/programm"
                        >
                            Kursprogramm
                        </Link>
                        <motion.ul className="">
                            <motion.li className="mb-4">
                                <div className="wrap dropdown   ">
                                    <Link
                                        className="text-text block my-4 subNav relative hover:text-primaryColor cursor-pointer"
                                        href="/cafe"
                                    >
                                        Cafe
                                    </Link>
                                </div>
                            </motion.li>
                            <Link
                                className="text-text block my-4 subNav relative mt-4 hover:text-primaryColor cursor-pointer"
                                href="/raumvermietung"
                            >
                                Raumvermietung
                            </Link>
                            <li className="mr-8 hover:text-primaryColor hover:underline mb-4 ">
                                <Link href="/kindergeburtstag">Kindergeburtstag</Link>
                            </li>
                            <li className="">
                                <Link href="/ueber-uns ">Über uns</Link>
                            </li>
                        </motion.ul>
                        <hr className="mt-4" />
                        <ul className="tracking-widest font-sans">
                            <li className="mb-3 mt-8 text-xs">
                                <div className="wrap dropdown   ">
                                    <Link
                                        className="text-text block my-4 subNav relative hover:text-primaryColor cursor-pointer"
                                        href="/impressum"
                                    >
                                        Impressum
                                    </Link>

                                    <Link
                                        className="text-text block my-4 subNav relative mt-4 hover:text-primaryColor cursor-pointer"
                                        href="/datenschutz"
                                    >
                                        Datenschutzerklärung
                                    </Link>
                                </div>
                            </li>
                            <li className="">
                                <div className="sm:hidden flex ">
                                    {props.socialMedia.map((e, i) => {
                                        return (
                                            <a className="mr-4 pt-2" key={`smKey${i}`} href={e.link} alt={e.title}>
                                                {e.icon}
                                            </a>
                                        );
                                    })}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.nav>
        </>
    );
};

export default Mobile1;
