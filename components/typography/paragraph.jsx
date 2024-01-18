// components/Typography.js
import React from "react";

const P = ({ children, klasse, style, htmlContent, isHtml = false }) => {
    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    return (
        <p
            style={style}
            className={`text-sm text-textColor sm:text-base font-sans font-[500]  xl:leading-relaxed lg:text-base xl:text-sm 2xl:text-base ${klasse}`}
        >
            {isHtml ? <span dangerouslySetInnerHTML={createMarkup(htmlContent)} /> : htmlContent}
            {children}
        </p>
    );
};

// Add more headline components for H3, H4, etc.

export { P };
