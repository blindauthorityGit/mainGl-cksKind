// components/Typography.js
import React from "react";

const P = ({ children, klasse }) => {
    return (
        <p
            className={`text-sm text-textColor sm:text-base font-sans tracking-wider leading-relaxed xl:leading-loose lg:text-sm xl:text-base ${klasse}   `}
        >
            {children}
        </p>
    );
};

// Add more headline components for H3, H4, etc.

export { P };
