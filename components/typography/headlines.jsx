// components/Typography.js
import React from "react";

const H1 = ({ children, klasse }) => {
    return (
        <h1 className={`text-4xl lg:text-4xl xl:text-5xl mb-4 lg:mb-6 font-ueber text-textColor ${klasse}`}>
            {children}
        </h1>
    );
};

const H2 = ({ children, klasse }) => {
    return <h2 className={`text-xl font-headline  lg:text-2xl xl:text-6xl mb-10 font-thin  ${klasse}`}>{children}</h2>;
};

const H3 = ({ children, klasse }) => {
    return <h2 className={`text-lg lg:text-4xl font-thin font-headline ${klasse}`}>{children}</h2>;
};
const H4 = ({ children, klasse }) => {
    return <h4 className={`text-lg lg:text-lg font-regular font-sans ${klasse}`}>{children}</h4>;
};

// Add more headline components for H3, H4, etc.

export { H1, H2, H3, H4 };
