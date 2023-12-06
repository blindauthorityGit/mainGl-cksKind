import React from "react";

//COMPONENTS
import { CoverImage } from "../images";
import { TextButton } from "../buttons";

//TYPO
import { H3, H4, P } from "../typography";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

const Card = ({ data, i }) => {
    console.log(data.farbe.value, i);
    return (
        <div
            className={`col-span-12 lg:col-span-4 ${i == 1 ? "lg:mt-[-6rem]" : null} ${i == 2 ? "lg:mt-[4rem]" : null}`}
        >
            <CoverImage
                src={urlFor(data.image).url()} // Replace with the actual path to your image
                mobileSrc={urlFor(data.image).url()} // Replace with the actual path to your image
                alt="Cover Background"
                style={{ aspectRatio: "1/0.8" }}
                className="w-full z-20 relative rounded-t-[40px] overflow-hidden "
            />
            <div className="px-6 lg:px-12 rounded-b-[40px] py-8 mb-4 lg:mb-4" style={{ background: data.farbe.value }}>
                <H3 klasse="mb-4 " style={{ color: data.farbe.value == "#3E55AB" ? "#ffffff" : null }}>
                    {data.name}
                </H3>
                <P klasse="lg:!text-base !text-xs" style={{ color: data.farbe.value == "#3E55AB" ? "#E2EAF7" : null }}>
                    {data.description}
                </P>
                <TextButton link={data.button.link}>
                    <span style={{ color: data.farbe.value == "#3E55AB" ? "#E2EAF7" : null }}>{data.button.label}</span>
                </TextButton>
            </div>
        </div>
    );
};

export default Card;
