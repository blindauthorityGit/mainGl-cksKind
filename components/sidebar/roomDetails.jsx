import React, { useEffect } from "react";

import { PortableText } from "@portabletext/react";
import { CoverImage } from "../images";
import urlFor from "../../functions/urlFor";

//TYPO
import { H2, H3, H4, H5, P } from "../typography";

//FUNCTION
import formatDateTime from "../../functions/formatDateTime";

const RoomDetails = ({ data, isWorkshop }) => {
    useEffect(() => {}, []);

    return (
        <>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse="!text-primaryColor mb-4">Fläche</H4>
                <P>{data.flaeche}</P>
                {/* <PortableText value={data.flaeche} /> */}
            </div>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse="!text-primaryColor mb-4">Raumaufteilung</H4>
                <P>{data.raumaufteilung}</P>

                {/* <PortableText value={data.raumaufteilung} /> */}
            </div>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse="!text-primaryColor mb-4">Besucherkapazität</H4>
                <P>{data.besucherkapazitaet}</P>

                {/* <PortableText value={data.bescuherkapazitaet} /> */}
            </div>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse="!text-primaryColor mb-4">Ausstattung</H4>
                <P>{data.ausstattung}</P>

                {/* <PortableText value={data.ausstattung} /> */}
            </div>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "!text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse={`mb-4  ${isWorkshop ? "!text-white" : "text-textColor"}`}>Ansprechpartner</H4>
                {data?.ansprechpartner?.map((e, i) => {
                    return (
                        <div className="flex w-full items-center mb-4 ">
                            <div className="image">
                                <CoverImage
                                    src={urlFor(e.image).url()} // Replace with the actual path to your image
                                    mobileSrc={urlFor(e.image).url()} // Replace with the actual path to your image
                                    alt="Cover Background"
                                    style={{ aspectRatio: "1/1" }}
                                    className=" w-12 h-12 z-20 relative rounded-[40px] overflow-hidden  mr-4"
                                />
                            </div>{" "}
                            <P klass="!mt-0" isHtml htmlContent={e.name}></P>
                        </div>
                    );
                })}
            </div>
            {/* <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse={`mb-4  ${isWorkshop ? "!text-white" : "text-textColor"}`}>Termine</H4>
                KALENDER ZEUCH
            </div> */}
        </>
    );
};

export default RoomDetails;
