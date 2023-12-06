// components/Typography.js
import React from "react";

const H1 = ({ children, klasse }) => {
    return (
        <h1 className={`text-4xl lg:text-5xl xl:text-7xl mb-4 lg:mb-6 font-ueber text-textColor ${klasse}`}>
            {children}
        </h1>
    );
};

const H2 = ({ children, klasse }) => {
    return (
        <h2 className={`text-xl font-ueber text-textColor  lg:text-2xl xl:text-4xl mb-4 lg:mb-10 font-thin  ${klasse}`}>
            {children}
        </h2>
    );
};

const H3 = ({ children, klasse, style }) => {
    return (
        <h2 className={`text-lg lg:text-2xl font-thin font-headline font-ueber text-textColor ${klasse}`} style={style}>
            {children}
        </h2>
    );
};
const H4 = ({ children, klasse }) => {
    return <h4 className={`text-xs lg:text-lg font-regular font-ueber text-textColor ${klasse}`}>{children}</h4>;
};

// Add more headline components for H3, H4, etc.

export { H1, H2, H3, H4 };
