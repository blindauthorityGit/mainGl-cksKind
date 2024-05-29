import React from "react";
import { P } from "../typography";

const CatCard = ({ bgColor, icon, text, link, isWhite }) => {
    console.log(icon);
    return (
        <div
            className={`bg-[${bgColor}] h-[17vh] rounded-[10px] flex flex-col justify-center items-center font-sans font-semibold text-text`}
            style={{ backgroundColor: bgColor }}
        >
            {icon && <img src={icon} alt="icon" />}
            <P
                klasse={`font-semibold text-[clamp(12px,calc(12px+0.00893*(100vw-320px)),16px)] ${
                    isWhite ? "!text-white" : null
                }`}
            >
                {text}
            </P>
        </div>
    );
};

export default CatCard;
