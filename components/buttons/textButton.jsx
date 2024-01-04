import React from "react";
import Link from "next/link";
const TextButton = (props) => {
    return (
        <Link href={props.link} className={props.centered ? "mx-auto left-0 right-0 relative" : null}>
            <button
                className={`max-w-[24rem] font-bold underline text-textColor ${
                    props.noMargin ? null : "mt-4 lg:mt-8 md:mt-8"
                }`}
            >
                <span className=""> {props.children}</span>
            </button>
        </Link>
    );
};
export default TextButton;
