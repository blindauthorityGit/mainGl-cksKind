import React, { useEffect, useState } from "react";

import { H2, H3, H4, P } from "../../typography";
import { CoverImage } from "../../images";
import urlFor from "../../../functions/urlFor";

import { AnmeldeForm } from "../../contactForm";

//ASSETS
import Block from "../../../assets/block.svg";
import Calendar from "../../../assets/calendar.svg";

// STORE
import useStore from "../../../store/store"; // Adjust the path to your store file

const Anmeldung = ({ data, events, isPekip, recurring, kat }) => {
    const [infoText, setInfoText] = useState("");
    let isWorkshop = false;
    const { dates } = useStore();

    const intro = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ut perferendis ratione.";

    useEffect(() => {
        console.log(events, data, events.blocks, kat);
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
    }, [dates]);

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <div className="col-span-12 h-full relative">
                <div
                    className="top h-[16svh]"
                    style={{
                        background: events.kategorie.farbe.value,
                    }}
                >
                    {" "}
                </div>
                <H4 klasse={`my-4`}>
                    {" "}
                    {events.anfrage ? "Anfrage" : null} {events.headline}
                </H4>
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
                <div className="flex items-start space-x-4 mt-3">
                    <img className="w-6" src={Calendar.src}></img>
                    <div className="datum">
                        {dates.map((e, i) => {
                            return (
                                <div className="flex space-x-2">
                                    <P klasse="text-xs">{e.dateStart}</P>
                                    <P klasse="text-xs">{e.dateTimeRange}</P>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex items-center space-x-4 mt-6">
                    <img className="w-6" src={Calendar.src}></img>
                    <P>{infoText}</P>
                </div>
                <AnmeldeForm
                    recurring={recurring}
                    isPekip={isPekip}
                    intro={intro}
                    events={events}
                    data={events.datum}
                ></AnmeldeForm>
            </div>
        </div>
    );
};

export default Anmeldung;
