import React from "react";
import Link from "next/link";
const GhostButton = (props) => {
    return (
        <Link href={props.link} className={props.centered ? "mx-auto left-0 right-0 relative" : null}>
            <button
                className={`max-w-[24rem] border border-primaryColor-100 hover:border-primaryColor-200 hover:bg-primaryColor-200 hover:text-blackText-950 transition-all duration-200 col-span-12  hover-underline-animation z-20 flex items-center justify-center text-primaryColor-100 font-sans tracking-wider py-3 text-base sm:text-base sm:py-3 px-6 min-w-[18rem] w-full uppercase rounded-md ${
                    props.noMargin ? null : "mt-4 lg:mt-8 md:mt-16"
                }`}
            >
                <span className=""> {props.children}</span>
            </button>
        </Link>
    );
};
export default GhostButton;
