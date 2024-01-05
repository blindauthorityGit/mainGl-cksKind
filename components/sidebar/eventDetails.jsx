import React, { useEffect } from "react";

import { PortableText } from "@portabletext/react";
import { BasicPortableText } from "../content";

import { CoverImage } from "../images";
import urlFor from "../../functions/urlFor";

//TYPO
import { H2, H3, H4, H5, P } from "../typography";

//FUNCTION
import formatDateTime from "../../functions/formatDateTime";

const Details = ({ data, isWorkshop }) => {
    useEffect(() => {
        console.log("FIRED");
    }, []);

    return (
        <>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse="!text-primaryColor mb-4">Location</H4>
                <BasicPortableText value={data.eventDetails.location.location} />
            </div>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse="!text-primaryColor mb-4">Preis</H4>
                <BasicPortableText value={data.eventDetails.preis} />
            </div>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse="!text-primaryColor mb-4">Teilnehmeranzahl</H4>
                <BasicPortableText value={data.eventDetails.teilnehmeranzahl} />
            </div>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse="!text-primaryColor mb-4">Altersgruppe</H4>
                <BasicPortableText value={data.eventDetails.altersgruppe} />
            </div>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "!text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse={`mb-4  ${isWorkshop ? "!text-white" : "text-textColor"}`}>Kurs Leitung</H4>
                <div className="flex w-full items-center">
                    <div className="image">
                        <CoverImage
                            src={urlFor(data.eventDetails.partner.image).url()} // Replace with the actual path to your image
                            mobileSrc={urlFor(data.eventDetails.partner.image).url()} // Replace with the actual path to your image
                            alt="Cover Background"
                            style={{ aspectRatio: "1/1" }}
                            className=" w-20 h-20 z-20 relative rounded-[40px] overflow-hidden  mr-4"
                        />
                    </div>{" "}
                    <P klasse={` ${isWorkshop ? "!text-blueColor-100" : "text-textColor"}`}>
                        {data.eventDetails.partner.name}
                    </P>
                </div>
            </div>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse={`mb-4  ${isWorkshop ? "!text-white" : "text-textColor"}`}>Termine</H4>
                {data.datum.map((e, i) => {
                    return <P klasse="font-bold">{formatDateTime(e.startDateTime, e.endDateTime)}</P>;
                })}
            </div>
        </>
    );
};

export default Details;
