import React from "react";

//COMPONENTS
import { CoverImage } from "../images";

//TYPO
import { H4, P } from "../typography";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

import formatDates from "../../functions/formatDates";

const SlideElement = ({ data }) => {
    console.log(data.kategorie.farbe.value);
    return (
        <div className="wrapper">
            <CoverImage
                src={urlFor(data.mainImage).url()} // Replace with the actual path to your image
                mobileSrc={urlFor(data.mainImage).url()} // Replace with the actual path to your image
                alt="Cover Background"
                style={{ aspectRatio: "1/1", borderColor: data.kategorie.farbe.value }}
                className="w-full z-20 relative rounded-[40px] overflow-hidden border-[10px] lg:border-[18px] mb-3"
            />
            <div className="pl-2">
                <H4>{data.headline}</H4>
                <P>{formatDates(data.datum)}</P>
            </div>
        </div>
    );
};

export default SlideElement;
