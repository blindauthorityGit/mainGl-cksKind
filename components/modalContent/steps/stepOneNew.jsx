import React, { useEffect, useState } from "react";

import { H2, H3, H4, P } from "../../typography";
import { CoverImage } from "../../images";
import urlFor from "../../../functions/urlFor";

import DateSelection from "../../contactForm/anmeldung/dateSelection";

import { AnmeldeForm } from "../../contactForm";

//ASSETS
import Block from "../../../assets/block.svg";
import Calendar from "../../../assets/calendar.svg";
import Price from "../../../assets/price.svg";

// STORE
import useStore from "../../../store/store"; // Adjust the path to your store file

const StepOneNew = ({ handleNextStep, data, events, isPekip, recurring }) => {
    const [infoText, setInfoText] = useState("");
    let isWorkshop = false;
    const { dates } = useStore();

    const intro = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ut perferendis ratione.";

    useEffect(() => {
        console.log(events, isPekip);
        console.log(events.kategorie?.name);

        if (events.isBlock) {
            setInfoText("Block Kurs");
        }
        if (events.reccuringDates) {
            setInfoText("Regelmäßiger Kurs");
        }
        if (!events.isBlock && !events.reccuringDates) {
            setInfoText("Einzel Termine");
        }
    }, [events]);

    useEffect(() => {
        console.log(dates);
        console.log(dates.length);
    }, [dates]);

    const handleDateSelect = (date) => {
        // Handle date selection
        // handleNextStep();
    };

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <div className="col-span-12 h-full relative">
                <H3 klasse={`my-4 !font-sans !font-semibold`}>
                    {" "}
                    {events.anfrage ? "Anfrage" : null} {events.headline}
                </H3>
                <div className="flex w-full items-center">
                    <div className="image">
                        {events.eventDetails.partner.isHidden ? (
                            <CoverImage
                                src={urlFor(events.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                mobileSrc={urlFor(events.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                alt="Cover Background"
                                style={{ aspectRatio: "1/1" }}
                                className=" w-10 h-10 z-20 relative rounded-[40px] overflow-hidden  mr-4"
                            />
                        ) : (
                            <CoverImage
                                src={urlFor(events.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                mobileSrc={urlFor(events.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                alt="Cover Background"
                                style={{ aspectRatio: "1/1" }}
                                className=" w-10 h-10 z-20 relative rounded-[40px] overflow-hidden  mr-4"
                            />
                        )}
                    </div>{" "}
                    <P klasse={` ${isWorkshop && !isMobile ? "!text-blueColor-100" : "text-textColor"}`}>
                        {events.eventDetails.partner.name}
                    </P>
                </div>
                <div className="flex items-center space-x-4 mt-6">
                    <img src={Block.src}></img>
                    <P klasse="text-xs">{infoText}</P>
                </div>
                <div
                    className={`flex ${
                        dates.length || events.isBlock > 2 ? "items-start" : "items-center"
                    }  space-x-4 mt-3 mb-4`}
                >
                    <img className="w-6" src={Calendar.src}></img>
                    <div className="datum">
                        {dates.map((e, i) => {
                            if (events.recurringDates && events.recurringDates.length > 0) {
                                return (
                                    <div key={i} className="flex space-x-2">
                                        <P klasse="text-xs font-semibold">jeden {e.dayOfWeek}</P>
                                        <P klasse="text-xs">{e.timeslots}</P>
                                    </div>
                                );
                            } else if (events.isBlock && e.blockTitle) {
                                return (
                                    <div key={i} className="mb-4">
                                        <P klasse="text-xs font-bold">{e.blockTitle}</P>
                                        <P klasse="text-xs italic mb-2">{e.blockSubline}</P>
                                        {e.dates.map((date, j) => (
                                            <div key={j} className="flex space-x-2">
                                                <P klasse="text-xs font-semibold">{date.dateStart}</P>
                                                <P klasse="text-xs">{date.dateTimeRange}</P>
                                            </div>
                                        ))}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={i} className="flex space-x-2">
                                        <P klasse="text-xs font-semibold">{e.dateStart}</P>
                                        <P klasse="text-xs">{e.dateTimeRange}</P>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className="flex items-start space-x-4 mt-3 mb-6">
                    <img className="w-6" src={Price.src}></img>
                    <P klasse="text-xs">{events.eventDetails.preis}</P>
                </div>
                {isPekip || events.recurringDates ? null : (
                    <DateSelection events={events} onDateSelect={handleDateSelect} />
                )}
            </div>
        </div>
    );
};

export default StepOneNew;
