// components/Typography.js
import React from "react";

const H1 = ({ children, klasse }) => {
    return (
        <h1
            className={`text-[clamp(32px,calc(32px+0.0957*(100vw-320px)),48px)] !leading-[0.95] text-balance md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem] mb-4 lg:mb-6  font-ueber text-textColor ${klasse}`}
        >
            {children}
        </h1>
    );
};

const H2 = ({ children, klasse }) => {
    return (
        <h2
            className={`text-2xl font-ueber text-textColor md:text-3xl  lg:text-2xl xl:text-3xl 2xl:text-5xl mb-4 lg:mb-10 font-thin  ${klasse}`}
        >
            {children}
        </h2>
    );
};

const H3 = ({ children, klasse, style }) => {
    return (
        <h3
            className={`text-lg xl:text-xl 2xl:text-2xl font-thin font-headline font-ueber text-textColor ${klasse}`}
            style={style}
        >
            {children}
        </h3>
    );
};
const H4 = ({ children, klasse }) => {
    return (
        <h4
            className={`text-base md:text-sm lg:text-lg xl:text-sm 2xl:text-base font-black font-sans text-textColor ${klasse}`}
        >
            {children}
        </h4>
    );
};
const H5 = ({ children, klasse }) => {
    return (
        <h5 className={`text-xs lg:text-base xl:text-sm font-regular font-ueber text-textColor ${klasse}`}>
            {children}
        </h5>
    );
};

// Add more headline components for H3, H4, etc.

export { H1, H2, H3, H4, H5 };
