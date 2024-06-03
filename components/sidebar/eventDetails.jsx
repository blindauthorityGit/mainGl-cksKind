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

//ASSETS
import Calendar from "../../assets/Calendar.svg";

const Details = ({ data, isWorkshop, isMobile }) => {
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
    const renderDates = (isWorkshop) => {
        const dayOfWeekToGerman = (dayNum) => {
            const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
            return days[dayNum];
        };

        const isDateOlder = (date) => {
            const currentDate = new Date();
            return new Date(date) < currentDate;
        };

        if (data.recurringDates && data.recurringDates.length > 0) {
            return data.recurringDates.map((recurringEvent, index) => {
                const dayOfWeek = dayOfWeekToGerman(recurringEvent.dayOfWeek);
                const timeslots = recurringEvent.timeslot
                    ? `${recurringEvent.timeslot.startTime} - ${recurringEvent.timeslot.endTime}`
                    : "";
                return (
                    <P
                        key={index}
                        klasse={`font-bold ${isWorkshop && !isMobile ? "!text-blueColor-100" : "text-textColor"}`}
                    >
                        {"jeden " + dayOfWeek + " um " + timeslots}
                    </P>
                );
            });
        }

        if (data.isBlock && data.blocks && data.blocks.length > 0) {
            return data.blocks.map((block, blockIndex) => {
                const key = block._key || `block-${blockIndex}`;
                const showAll = blockVisibility[key];
                const datesToShow = showAll ? block.dates : block.dates.slice(0, 4);
                const lastDate = block.dates[block.dates.length - 1].endDateTime;

                if (isDateOlder(lastDate)) {
                    return null;
                }

                return (
                    <div key={key} className={`mb-4 ${block.ausgebucht ? "opacity-30" : null}`}>
                        <H4 klasse={`font-bold ${isWorkshop && !isMobile ? "!text-blueColor-100" : "text-textColor"}`}>
                            {block.blockTitle}
                        </H4>
                        {block.blockSubline ? (
                            <div className="mt-0 mb-2 font-semibold text-sm">{block.blockSubline}</div>
                        ) : null}
                        {datesToShow.map((date, dateIndex) => (
                            <div
                                key={dateIndex}
                                className={` flex justify-start text-sm ${
                                    isWorkshop && !isMobile ? "!text-blueColor-100 BUBUBU" : "text-textColor AUTOBUBU"
                                }`}
                            >
                                <div className="inline w-[38%]">
                                    {formatDateTime(date.startDateTime, date.endDateTime).split(" ")[0]}
                                </div>
                                <div className="inline">
                                    {" "}
                                    {formatDateTime(date.startDateTime, date.endDateTime).split(" ")[1]}-
                                    {formatDateTime(date.startDateTime, date.endDateTime).split(" ")[3]}
                                </div>{" "}
                            </div>
                        ))}
                        {block.dates.length > 4 && (
                            <button
                                onClick={() => toggleBlockVisibility(key)}
                                className="text-primaryColor underline font-semibold mt-2 text-xs"
                            >
                                {showAll ? "Weniger anzeigen" : "Alle anzeigen"}
                            </button>
                        )}
                    </div>
                );
            });
        } else {
            return data.datum.slice(0, itemsToShow).map((date, i) => (
                <div
                    key={i}
                    className={` flex justify-start text-sm ${
                        isWorkshop && !isMobile ? "!text-blueColor-100 BUBUBU" : "text-textColor AUTOBUBU"
                    }`}
                >
                    <div className="inline w-[38%]">
                        {formatDateTime(date.startDateTime, date.endDateTime).split(" ")[0]}
                    </div>
                    <div className="inline">
                        {" "}
                        {formatDateTime(date.startDateTime, date.endDateTime).split(" ")[1]}-
                        {formatDateTime(date.startDateTime, date.endDateTime).split(" ")[3]}
                    </div>{" "}
                </div>
            ));
        }
    };

    return (
        <>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse="!text-primaryColor mb-2">Location</H4>
                <BasicPortableText
                    isWorkshop={isWorkshop}
                    isMobile={isMobile}
                    value={data.eventDetails.location.location}
                />
            </div>
            <div className={`wrapper mb-6 font-sans ${isWorkshop ? "!text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse="!text-primaryColor mb-2">Preis</H4>
                <P klasse={isWorkshop && !isMobile ? "!text-blueColor-100" : "text-textColor"}>
                    {data.eventDetails.preis}
                </P>
            </div>
            {data.eventDetails.teilnehmeranzahl && (
                <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                    <H4 klasse="!text-primaryColor mb-2">Teilnehmeranzahl</H4>
                    <BasicPortableText value={data.eventDetails.teilnehmeranzahl} />
                </div>
            )}
            {data.eventDetails.altersgruppe && (
                <div className={`wrapper mb-6 font-sans ${isWorkshop ? "text-blueColor-100" : "text-textColor"}`}>
                    <H4 klasse="!text-primaryColor mb-2">Altersgruppe</H4>
                    <BasicPortableText value={data.eventDetails.altersgruppe} />
                </div>
            )}
            <div className={`wrapper mb-12 font-sans ${isWorkshop ? "!text-blueColor-100" : "text-textColor"}`}>
                <H4 klasse={`mb-4  ${isWorkshop && !isMobile ? "!text-white" : "text-textColor"}`}>Kurs Leitung</H4>
                <div className="flex w-full items-center">
                    <div className="image">
                        {data.eventDetails.partner.isHidden ? (
                            <CoverImage
                                src={urlFor(data.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                mobileSrc={urlFor(data.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                alt="Cover Background"
                                style={{ aspectRatio: "1/1" }}
                                className=" w-10 h-10 z-20 relative rounded-[40px] overflow-hidden  mr-4"
                            />
                        ) : (
                            <Link href={`/partner/${data.eventDetails.partner.slug.current}`}>
                                <CoverImage
                                    src={urlFor(data.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                    mobileSrc={urlFor(data.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                    alt="Cover Background"
                                    style={{ aspectRatio: "1/1" }}
                                    className=" w-10 h-10 z-20 relative rounded-[40px] overflow-hidden  mr-4"
                                />
                            </Link>
                        )}
                    </div>{" "}
                    <P klasse={` ${isWorkshop && !isMobile ? "!text-blueColor-100" : "text-textColor"}`}>
                        {data.eventDetails.partner.name}
                    </P>
                </div>
            </div>
            <div
                className={`wrapper mb-6  font-sans ${
                    isWorkshop && !isMobile ? "!text-blueColor-100" : "text-textColor"
                }`}
            >
                <H4
                    klasse={`mb-4 flex space-x-2 !text-2xl  ${
                        isWorkshop && !isMobile ? "!text-white" : "text-textColor"
                    }`}
                >
                    <img width="24px" src={Calendar.src}></img>
                    <span>Termine</span>
                </H4>
                {renderDates(isWorkshop)}
                {!data.isBlock && data.datum?.length > itemsToShow ? (
                    <button onClick={() => setItemsToShow(itemsToShow + 8)} className="mt-2 text-primaryColor">
                        Mehr...
                    </button>
                ) : null}
            </div>
        </>
    );
};

export default Details;
