import React from "react";
import Link from "next/link";
const MainButtonNOLink = (props) => {
    return (
        <button
            onClick={props.onClick}
            id={props.id}
            className={`${props.klasse} ${
                props.disabled ? "opacity-30" : null
            } font-sans font-semibold hover-underline-animation z-20 flex items-center justify-center text-primaryColor-50 py-4 text-xs sm:text-base xl:text-sm sm:py-6 xl:py-4 2xl:py-6 px-6 min-w-[10rem] w-full uppercase rounded-md`}
        >
            <span className=""> {props.children}</span>
        </button>
    );
};
export default MainButtonNOLink;
