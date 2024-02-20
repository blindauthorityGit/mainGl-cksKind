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
        <div className="wrapper ">
            <Link href={`/event/${data.slug.current}`} className="relative ">
                <CoverImage
                    src={urlFor(data.image).url()} // Replace with the actual path to your image
                    mobileSrc={urlFor(data.image).url()} // Replace with the actual path to your image
                    alt="Cover Background"
                    style={{
                        aspectRatio: aspectRatio,
                        borderColor: data.kategorie.farbe.value,
                        opacity: data.ausgebucht ? "0.3" : "1",
                    }}
                    className="w-full z-20 relative rounded-[40px] overflow-hidden border-[6px] xl:border-[8px] 2xl:border-[12px] mb-3"
                />
                {data.ausgebucht ? (
                    <div
                        className="ausgebucht absolute z-30 font-sans font-bold top-1/2 left-1/2 xl:text-xl text-primaryColor-700"
                        style={{
                            transform: "translate(-50%, -50%)", // Center the div
                            width: "100%", // Optional: Ensure it spans the full width of the parent
                            textAlign: "center", // Ensure text is centered within the div
                        }}
                    >
                        Ausgebucht
                    </div>
                ) : null}
            </Link>
            <div className="pl-2 hyphens-auto text-balance">
                <H4 klasse={isWorkshop ? "!text-blueColor-100 hyphens-auto text-balance" : null}>{data.headline}</H4>
                <P klasse={isWorkshop ? "!text-blueColor-100" : null}>{formatStringToDate(data.date)}</P>
            </div>
        </div>
    );
};

export default SlideElement;
