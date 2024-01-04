import React from "react";
import Link from "next/link";

//COMPONENTS
import { CoverImage } from "../images";

//TYPO
import { H4, P } from "../typography";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

import formatStringToDate from "../../functions/formatStringToDate";

const SlideElement = ({ data, isWorkshop, aspectRatio }) => {
    return (
        <div className="wrapper">
            <Link href={`/event/${data.slug.current}`}>
                <CoverImage
                    src={urlFor(data.image).url()} // Replace with the actual path to your image
                    mobileSrc={urlFor(data.image).url()} // Replace with the actual path to your image
                    alt="Cover Background"
                    style={{ aspectRatio: aspectRatio, borderColor: data.kategorie.farbe.value }}
                    className="w-full z-20 relative rounded-[40px] overflow-hidden border-[6px] lg:border-[12px] mb-3"
                />
            </Link>
            <div className="pl-2">
                <H4 klasse={isWorkshop ? "!text-blueColor-100" : null}>{data.headline}</H4>
                <P klasse={isWorkshop ? "!text-blueColor-100" : null}>{formatStringToDate(data.date)}</P>
            </div>
        </div>
    );
};

export default SlideElement;
