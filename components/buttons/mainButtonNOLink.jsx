import React from "react";
import Link from "next/link";
const MainButtonNOLink = (props) => {
    return (
        <button
            onClick={props.onClick}
            id={props.id}
            className="bg-primaryColor-400 col-span-12 hover-underline-animation z-20 flex items-center justify-center text-primaryColor-50 mt-4 lg:mt-8 py-4 text-lg sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-16"
        >
            <span className=""> {props.children}</span>
        </button>
    );
};
export default MainButtonNOLink;
