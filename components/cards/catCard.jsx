import React from "react";
import { P } from "../typography";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

const CatCard = ({ bgColor, icon, text, link, onClick, isWhite, order, isWorkshop, isBig, pekip }) => {
    const handleOnClick = (e) => {
        if (onClick) {
            onClick(e);
        }
    };

    const cardVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
                staggerChildren: 0.1,
            },
        },
        whileTap: {
            scale: 0.9,
            transition: { type: "spring", stiffness: 800, damping: 15 },
        },
    };

    const contentVariants = {
        initial: { y: 0, opacity: 1, scale: 1 },
        hover: { y: -10, opacity: 1, scale: 1.4 },
    };

    const otherCardsVariants = {
        initial: { scale: 1 },
        hover: { scale: 0.9 },
    };

    const CardContent = (
        <motion.div
            className={`bg-[${bgColor}] ${order} cursor-pointer ${
                isBig ? "h-[17svh] lg:h-[36svh] xl:h-[36svh]" : "h-[17svh]  xl:h-[20svh] 2xl:h-[17svh]"
            }  text-center px-2 rounded-[10px] space-y-2 xl:space-y-4 flex flex-col justify-center items-center font-sans font-semibold text-text`}
            style={{ backgroundColor: bgColor }}
            initial="initial"
            whileTap="whileTap"
            whileHover="hover"
            variants={cardVariants}
        >
            <motion.img
                className={`
    w-12 h-12 md:w-14 md:h-14 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16
    object-contain
    ${pekip ? "2xl:w-30 2xl:h-30" : ""}
  `}
                src={icon}
                alt=""
                aria-hidden="true"
                variants={contentVariants}
            />

            <P
                klasse={`font-semibold !text-[clamp(12px,calc(12px+0.00893*(100svw-320px)),24px)] lg:!text-base 2xl:!text-xl ${
                    isWhite ? "!text-white" : null
                } ${isWorkshop ? "!text-blueColor-100" : null}`}
            >
                {text}
            </P>
        </motion.div>
    );

    if (link) {
        return (
            <Link href={link} className={`flex flex-col ${order}`}>
                <div onClick={handleOnClick}>{CardContent}</div>
            </Link>
        );
    }

    return <div onClick={handleOnClick}>{CardContent}</div>;
};

export default CatCard;
