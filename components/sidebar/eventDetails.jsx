import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { BasicPortableText } from "../content";

import { CoverImage } from "../images";
import urlFor from "../../functions/urlFor";

//TYPO
import { H2, H3, H4, H5, P } from "../typography";

//FUNCTION
import formatDateTime from "../../functions/formatDateTime";

const Details = ({ data, isWorkshop }) => {
    const [itemsToShow, setItemsToShow] = useState(8);
    const [blockVisibility, setBlockVisibility] = useState({});

    // useEffect(() => {
    //     setDisplayedItems(data.datum.slice(0, itemsToShow));
    // }, [data.datum, itemsToShow]);

    useEffect(() => {
        // Initialize block visibility state to false for all blocks
        const initialVisibility = {};
        data.blocks?.forEach((block, index) => {
            const key = block._key || `block-${index}`;
            initialVisibility[key] = false; // Initially, only the first date is shown for each block
        });
        setBlockVisibility(initialVisibility);
    }, [data.blocks]);

    const toggleBlockVisibility = (key) => {
        setBlockVisibility((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    // Function to render dates for both block and non-block events
    const renderDates = () => {
        if (data.isBlock && data.blocks && data.blocks.length > 0) {
            return data.blocks.map((block, blockIndex) => {
                const key = block._key || `block-${blockIndex}`;
                const showAll = blockVisibility[key];
                const datesToShow = showAll ? block.dates : block.dates.slice(0, 1);

                return (
                    <div key={key} className={`mb-4 ${block.ausgebucht ? "opacity-30" : null}`}>
                        <H4 klasse="font-bold">{block.blockTitle}</H4>
                        {block.blockSubline ? <div className="mt-1">{block.blockSubline}</div> : null}
                        {datesToShow.map((date, dateIndex) => (
                            <P key={dateIndex} klasse="font-bold">
                                {formatDateTime(date.startDateTime, date.endDateTime)}
                            </P>
                        ))}
                        {block.dates.length > 1 && (
                            <button
                                onClick={() => toggleBlockVisibility(key)}
                                className="text-primaryColor underline font-semibold mt-2"
                            >
                                {showAll ? "Weniger anzeigen" : "Alle anzeigen"}
                            </button>
                        )}
                    </div>
                );
            });
        } else {
            // Rendering non-block events, same as before
            return data.datum.slice(0, itemsToShow).map((e, i) => (
                <P key={i} klasse="font-bold">
                    {formatDateTime(e.startDateTime, e.endDateTime)}
                </P>
            ));
        }
    };

    return (
        <>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse="!text-primaryColor mb-4">Location</H4>
                <BasicPortableText isWorkshop value={data.eventDetails.location.location} />
            </div>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "!text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse="!text-primaryColor mb-4">Preis</H4>
                <P>{data.eventDetails.preis}</P>
            </div>
            {data.eventDetails.teilnehmeranzahl && (
                <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                    <H4 klasse="!text-primaryColor mb-4">Teilnehmeranzahl</H4>
                    <BasicPortableText value={data.eventDetails.teilnehmeranzahl} />
                </div>
            )}
            {data.eventDetails.altersgruppe && (
                <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                    <H4 klasse="!text-primaryColor mb-4">Altersgruppe</H4>
                    <BasicPortableText value={data.eventDetails.altersgruppe} />
                </div>
            )}
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "!text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse={`mb-4  ${isWorkshop ? "!text-white" : "text-textColor"}`}>Kurs Leitung</H4>
                <div className="flex w-full items-center">
                    <div className="image">
                        <Link href={`/partner/${data.eventDetails.partner.slug.current}`}>
                            <CoverImage
                                src={urlFor(data.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                mobileSrc={urlFor(data.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                alt="Cover Background"
                                style={{ aspectRatio: "1/1" }}
                                className=" w-20 h-20 z-20 relative rounded-[40px] overflow-hidden  mr-4"
                            />
                        </Link>
                    </div>{" "}
                    <P klasse={` ${isWorkshop ? "!text-blueColor-100" : "text-textColor"}`}>
                        {data.eventDetails.partner.name}
                    </P>
                </div>
            </div>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse={`mb-4  ${isWorkshop ? "!text-white" : "text-textColor"}`}>Termine</H4>
                {renderDates()}
                {!data.isBlock && data.datum.length > itemsToShow && (
                    <button onClick={() => setItemsToShow(itemsToShow + 8)} className="mt-2 text-primaryColor">
                        Mehr...
                    </button>
                )}
            </div>
        </>
    );
};

export default Details;
