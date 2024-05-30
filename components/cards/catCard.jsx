import React from "react";
import { P } from "../typography";
import { motion } from "framer-motion";

const CatCard = ({ bgColor, icon, text, link, isWhite, animationProps }) => {
    console.log(icon);
    return (
        <motion.div
            className={`bg-[${bgColor}] h-[17svh] rounded-[10px] flex flex-col justify-center items-center font-sans font-semibold text-text`}
            style={{ backgroundColor: bgColor }}
            {...animationProps}
        >
            {icon && <img src={icon} alt="icon" />}
            <P
                klasse={`font-semibold text-[clamp(12px,calc(12px+0.00893*(100svw-320px)),16px)] ${
                    isWhite ? "!text-white" : null
                }`}
            >
                {text}
            </P>
        </motion.div>
    );
};

export default CatCard;
