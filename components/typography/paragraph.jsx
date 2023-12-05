// components/Typography.js
import React from "react";

const P = ({ children, klasse }) => {
    return (
        <p
            className={`text-sm text-textColor sm:text-base font-sans font-[500]  xl:leading-relaxed lg:text-base xl:text-lg ${klasse}   `}
        >
            {children}
        </p>
    );
};

// Add more headline components for H3, H4, etc.

export { P };
