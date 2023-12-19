import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const MainButton = (props) => {
    const buttonAnimation = {
        rest: { scale: 1 },
        hover: { scale: 1.05 },
    };

    const textAnimation = {
        rest: { scale: 1 },
        hover: { scale: 1.05 },
    };

    const transition = { duration: 0.1, ease: "easeInOut" };

    return (
        <Link href={props.link} passHref>
            <motion.button
                whileHover="hover"
                animate="rest"
                variants={buttonAnimation}
                transition={transition}
                disabled={props.disabled}
                className={`${props.klasse} ${
                    props.disabled ? "opacity-30" : null
                } font-sans font-semibold hover-underline-animation z-20 flex items-center justify-center text-primaryColor-50 py-4 text-xs sm:text-base sm:py-6 px-6 min-w-[10rem] w-full uppercase rounded-md`}
            >
                <motion.span variants={textAnimation} transition={{ duration: 0.3, ease: "easeInOut", delay: 0.15 }}>
                    {props.children}
                </motion.span>
            </motion.button>
        </Link>
    );
};

export default MainButton;
