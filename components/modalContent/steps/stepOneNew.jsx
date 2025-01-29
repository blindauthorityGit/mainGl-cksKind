import React, { useEffect, useState } from "react";

import { H2, H3, H4, P } from "../../typography";
import { CoverImage } from "../../images";
import urlFor from "../../../functions/urlFor";

import DateSelection from "../../contactForm/anmeldung/dateSelection";
import ProductSelection from "../../contactForm/anmeldung/productSelection";

import { AnmeldeForm } from "../../contactForm";

// ASSETS
import Block from "../../../assets/block.svg";
import Calendar from "../../../assets/calendar.svg";
import Price from "../../../assets/price.svg";

// STORE
import useStore from "../../../store/store"; // Adjust the path to your store file

const StepOneNew = ({ handleNextStep, data, events, isPekip, recurring, anfrage }) => {
    const [infoText, setInfoText] = useState("");
    const [openBlockIndex, setOpenBlockIndex] = useState(null);
    let isWorkshop = false;
    const { dates } = useStore();

    const intro = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ut perferendis ratione.";

    useEffect(() => {
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
        console.log(anfrage);
    }, [anfrage]);

    const handleDateSelect = (date) => {
        // Handle date selection
        // handleNextStep();
    };

    const toggleBlock = (index) => {
        setOpenBlockIndex(openBlockIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <div className="col-span-12 h-full relative">
                <H3 klasse={`my-4 !font-sans !font-semibold`}>
                    {events.anfrage ? "Anfrage" : null} {events.headline}{" "}
                    {events.isFullyBooked && <span className="font-bold text-red-500">AUSGEBUCHT</span>}
                </H3>
                <div className="flex w-full items-center">
                    <div className="image">
                        <CoverImage
                            src={urlFor(events.eventDetails?.partner?.image).url()}
                            mobileSrc={urlFor(events.eventDetails?.partner?.image).url()}
                            alt="Cover Background"
                            style={{ aspectRatio: "1/1" }}
                            className="w-10 h-10 z-20 relative rounded-[40px] overflow-hidden mr-4"
                        />
                    </div>
                    <P klasse={`${isWorkshop ? "!text-blueColor-100" : "text-textColor"}`}>
                        {events.eventDetails.partner.name}
                    </P>
                </div>
                <div className="flex items-center space-x-4 mt-6">
                    <img src={Block.src} alt="Block Icon"></img>
                    <P klasse="text-xs">{infoText}</P>
                </div>
                <div
                    className={`flex ${
                        dates.length || events.isBlock > 2 ? "items-start" : "items-center"
                    } space-x-4 mt-3 mb-4`}
                >
                    <img className="w-6" src={Calendar.src} alt="Calendar Icon"></img>
                    <div className="datum">
                        {anfrage ? <P klasse="text-xs font-semibold">Termin auf Anfrage</P> : null}
                        {dates.map((e, i) => {
                            if (events.recurringDates && events.recurringDates.length > 0) {
                                return (
                                    <div key={i} className="grid grid-cols-2 gap-x-4 mb-2">
                                        <P klasse="text-xs font-semibold">jeden {e.dayOfWeek}</P>
                                        <P klasse="text-xs text-right">{e.timeslots}</P>
                                    </div>
                                );
                            } else if (events.isBlock && e.blockTitle) {
                                return (
                                    <div key={i} className="mb-4 border border-gray-200 rounded-lg shadow">
                                        <div
                                            className="p-3 bg-gray-100 flex justify-between items-center cursor-pointer rounded-t-lg"
                                            onClick={() => toggleBlock(i)}
                                        >
                                            <P klasse="text-xs font-bold">
                                                {e.blockTitle}{" "}
                                                {events.blocks[i].ausgebucht && (
                                                    <span className="text-primaryColor text-xs !font-normal">
                                                        Ausgebucht
                                                    </span>
                                                )}
                                            </P>
                                            <button className="text-gray-500 transform ml-2 transition-transform">
                                                {openBlockIndex === i ? "▲" : "▼"}
                                            </button>
                                        </div>
                                        {openBlockIndex === i && (
                                            <div className="p-3 bg-white">
                                                <P klasse="text-xs italic mb-2">{e.blockSubline}</P>
                                                <div className="grid grid-cols-3 gap-x-4">
                                                    {e.dates.map((date, j) => (
                                                        <React.Fragment key={j}>
                                                            <P klasse="text-xs font-semibold">{date.dateStart}</P>
                                                            <P klasse="text-xs col-span-2 text-right">
                                                                {date.dateTimeRange}
                                                            </P>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={i} className="grid grid-cols-2 gap-x-4 mb-2">
                                        <P klasse="text-xs font-semibold">{e.dateStart}</P>
                                        <P klasse="text-xs text-right">{e.dateTimeRange}</P>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className="flex items-start space-x-4 mt-3 mb-6">
                    <img className="w-6" src={Price.src} alt="Price Icon"></img>
                    {anfrage ? <P klasse="text-xs font-semibold">Preis siehe Produkt</P> : null}

                    <P klasse="text-xs">{events.eventDetails.preis}</P>
                </div>
                {isPekip || events.recurringDates || anfrage ? null : (
                    <DateSelection events={events} onDateSelect={handleDateSelect} />
                )}
                {events.produkte ? <ProductSelection events={events} onDateSelect={handleDateSelect} /> : null}
            </div>
        </div>
    );
};

export default StepOneNew;
