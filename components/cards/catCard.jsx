import React from "react";
import { P } from "../typography";
import { motion } from "framer-motion";
import Link from "next/link";

const CatCard = ({ bgColor, icon, text, link, onClick, isWhite, order, isWorkshop }) => {
    const handleOnClick = (e) => {
        if (onClick) {
            onClick(e);
        }
    };

    const cardVariants = {
        initial: { scale: 1 },
        whileTap: {
            scale: 0.9,
            transition: { type: "spring", stiffness: 800, damping: 15 },
        },
    };

    const CardContent = (
        <motion.div
            className={`bg-[${bgColor}] ${order} h-[17svh] text-center px-2 rounded-[10px] space-y-2 xl:space-y-4 flex flex-col justify-center items-center font-sans font-semibold text-text`}
            style={{ backgroundColor: bgColor }}
            initial="initial"
            whileTap="whileTap"
            variants={cardVariants}
        >
            {icon && <img className="xl:w-16" src={icon} alt="icon" />}
            <P
                klasse={`font-semibold !text-[clamp(12px,calc(12px+0.00893*(100svw-320px)),24px)] ${
                    isWhite ? "!text-white" : null
                } ${isWorkshop ? "!text-blueColor-100" : null}`}
            >
                {text}
            </P>
        </motion.div>
    );

    if (link) {
        return (
            <Link href={link}>
                <div onClick={handleOnClick}>{CardContent}</div>
            </Link>
        );
    }

    return <div onClick={handleOnClick}>{CardContent}</div>;
};

export default CatCard;
