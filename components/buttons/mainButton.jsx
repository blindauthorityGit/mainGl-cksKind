import React from "react";
import Link from "next/link";
const MainButton = (props) => {
    return (
        <Link href={props.link} className="w-full">
            <button
                disabled={props.disabled}
                className={`${props.klasse} ${
                    props.disabled ? "opacity-30" : null
                }  font-sans font-semibold hover-underline-animation z-20 flex items-center justify-center text-primaryColor-50 py-4 text-xs sm:text-base sm:py-6 px-6 min-w-[10rem] w-full uppercase rounded-md`}
            >
                <span className=""> {props.children}</span>
            </button>
        </Link>
    );
};
export default MainButton;
