import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { H4, P } from "../../typography";

import useStore from "../../../store/store"; // Adjust the path as necessary
import { useForm } from "react-hook-form";
import MessageSelection from "../../contactForm/anmeldung/messageSelection";
import Calendar from "../../../assets/calendar.svg";

const StepFourNew = forwardRef(({ data, events, updateFormData, isPekip }, ref) => {
    const { dates } = useStore();

    useEffect(() => {
        console.log(events);
    }, []);

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <div className="col-span-12 ">
                <H4 klasse={`my-4 leading-snug`}>
                    {" "}
                    {isPekip || events.recurringDates
                        ? "Teile uns bitte mit, wann du den Kurs besuchen möchtest. Falls du noch weitere Infos benötigst frag uns doch einfach!"
                        : "Willst du uns noch etwas mitteilen oder hast Fragen? (optional)"}{" "}
                </H4>
                {isPekip || events.recurringDates ? (
                    <div className={`flex ${dates.length > 2 ? "items-start" : "items-center"}  space-x-4 mt-3 mb-4`}>
                        <img className="w-6" src={Calendar.src}></img>
                        <div className="datum">
                            {dates.map((e, i) => {
                                return events.recurringDates ? (
                                    <div className="flex space-x-2">
                                        <P klasse="text-xs font-semibold">jeden {e.dayOfWeek}</P>
                                        <P klasse="text-xs">{e.timeslots}</P>
                                    </div>
                                ) : (
                                    <div className="flex space-x-2">
                                        <P klasse="text-xs font-semibold"> {e.dateStart}</P>
                                        <P klasse="text-xs">{e.dateTimeRange}</P>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
            <MessageSelection events={events} />
        </div>
    );
});

export default StepFourNew;
