// components/PortableText.js

import React, { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import { CoverImage } from "../images";
import urlFor from "../../functions/urlFor";

//TYPO
import { H2, P, H4, H3 } from "../typography";

const myPortableTextComponents = (isWorkshop) => ({
    types: {
        imageGallery: ({ value }) => {
            return (
                <div className="grid col-span-12 grid-cols-12 gap-2 xl:gap-4 my-8 2xl:my-24">
                    {value.images.map((e, i) => (
                        <CoverImage
                            key={i}
                            src={urlFor(e).url()}
                            mobileSrc={urlFor(e).url()}
                            alt="Cover Background"
                            style={{ aspectRatio: "1/1" }}
                            // onClick={(e) => {
                            //
                            //     setImageSrc(urlFor(e).url());
                            // }}
                            className={`w-full z-20 relative rounded-[40px] overflow-hidden col-span-6  `}
                        />
                    ))}
                </div>
            );
        },
    },
    marks: {
        // Add styling for the "strong" mark (you can customize this)
        strong: ({ children, isWorkshop }) => (
            <strong className={`font-black ${isWorkshop ? "!text-white" : "text-primaryColor-900"}}  font-sans`}>
                {children}
            </strong>
        ),
    },
    block: {
        // Styling for the "normal" paragraphs
        normal: ({ children }) => (
            <P klasse={`text-base  font-sans ${isWorkshop ? "!text-white" : "text-primaryColor-900"}`}>{children}</P>
        ), // Styling for the "h1" headings
        h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
        h2: ({ children, isWorkshop }) => <H2 klasse={`${isWorkshop ? "text-white" : "null"}`}>{children}</H2>,
        h3: ({ children, isWorkshop }) => <H3 klasse="!mb-4 !mt-10">{children}</H3>,
        p: ({ children }) => <p className="font-sans">{children}</p>,

        // Add more styles as needed
    },
    blockStyles: {
        // Styling for the "normal" paragraphs
        normal: ({ children }) => (
            <P klasse={`text-base  font-sans ${isWorkshop ? "!text-white" : "text-primaryColor-900"}}`}>{children}</P>
        ),
        // Styling for the "h1" headings
        h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
        p: ({ children }) => <p className="font-sans">{children}</p>,
        // Add more styles as needed
    },
});

const PortableTextView = ({ blocks, data, isWorkshop }) => {
    const [imageSrc, setImageSrc] = useState("");

    return (
        <div
            className={`col-span-12 xl:col-span-10 2xl:col-span-8 richText xl:ml-64 font-sans text-xl font-medium leading-relaxed ${
                isWorkshop ? "text-blueColor-100" : "text-textColor"
            }`}
        >
            {/* <H2 klasse={isWorkshop ? "!text-blueColor-100" : null}>{data.components[0].headline}</H2>
            <H4 klasse={isWorkshop ? "!text-blueColor-100" : null}>{data.components[0].text}</H4>
            <br /> */}

            <PortableText value={blocks} components={myPortableTextComponents(isWorkshop)} />
        </div>
    );
};

export default PortableTextView;
