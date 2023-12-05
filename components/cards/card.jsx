import React from "react";

//COMPONENTS
import { CoverImage } from "../images";

//TYPO
import { H4, P } from "../typography";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

import formatDates from "../../functions/formatDates";

const Card = ({ data }) => {
    return (
        <div className="col-span-4">
            <CoverImage
                src={urlFor(data.image).url()} // Replace with the actual path to your image
                mobileSrc={urlFor(data.image).url()} // Replace with the actual path to your image
                alt="Cover Background"
                style={{ aspectRatio: "1/1" }}
                className="w-full z-20 relative rounded-[40px] overflow-hidden "
            />
            <div className="pl-2" style={{ background: data.farbe.value }}>
                <H4>{data.name}</H4>
                <P>{data.text}</P>
            </div>
        </div>
    );
};

export default Card;
