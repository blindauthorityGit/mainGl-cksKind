import React, { useEffect } from "react";

//ANIMATION
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

//COMPONENTS
import { CoverImage } from "../images";
import { MainButton } from "../buttons";

//TYPO
import { H2, H4, P } from "../typography";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

const ContentCard = ({ data, i }) => {
    return (
        <div className="lg:col-start-0 lg:col-span-5 col-span-12 bg-white rounded-[40px] px-6 lg:px-24 py-12 lg:py-24 mt-24">
            <H2 klasse="mb-4 ">{data.headline}</H2>
            <P klasse="lg:!text-base !text-xs">{data.text}</P>
            <MainButton
                klasse={`mt-12 ${
                    data.button.HauptButton
                        ? "bg-primaryColor border-2 border-primaryColor"
                        : "border-2 border-primaryColor-50"
                }`}
                link={data.button.link}
            >
                {data.button.label}
            </MainButton>
        </div>
    );
};

export default ContentCard;