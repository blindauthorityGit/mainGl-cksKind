import React, { useState, useMemo, useEffect } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    addMonths,
    subMonths,
    getDay,
    isSameDay,
    isToday,
} from "date-fns";
import { de } from "date-fns/locale";

//COMPS
import ToolTip from "./toolTip";
import { H3, P } from "../typography";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

//FUNCTION
import getElementByID from "../../functions/getElementByID";

const WEEKDAYS = ["Son", "Mon", "Die", "Mi", "Do", "Fr", "Sa"];

const Calendar = ({ data }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const startDayOfWeek = getDay(firstDayOfMonth); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    const [flatData, setFlatData] = useState(null);
    const [showTooltip, setShowToolTip] = useState(false);
    const [tooltipData, setToolTipData] = useState(null);

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    });

    const nextMonth = () => {
        setCurrentDate((prevDate) => addMonths(prevDate, 1));
    };

    const prevMonth = () => {
        setCurrentDate((prevDate) => subMonths(prevDate, 1));
    };

    useEffect(() => {
        //CHECK CURRENT DATE
        const currentDate = new Date();
        // FLATTEN ARRAY TO SINGLE DATES AND FILTER OUT OUTDATED EVENTS
        const flattenedEvents = data.flatMap((event) =>
            event.datum
                .map((date) => ({ ...event, date: date.startDateTime }))
                .filter((event) => new Date(event.date) >= currentDate)
        );

        // Sort the flattened events by date
        const sortedEvents = flattenedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        setFlatData(sortedEvents);
        console.log(sortedEvents);
    }, [data]);

    // Preprocess events data to create a map for efficient lookup
    const eventsByDate = useMemo(() => {
        const currentDate = new Date();
        // FLATTEN ARRAY TO SINGLE DATES AND FILTER OUT OUTDATED EVENTS
        const flattenedEvents = data.flatMap((event) =>
            event.datum
                .map((date) => ({ ...event, date: date.startDateTime }))
                .filter((event) => new Date(event.date) >= currentDate)
        );

        // Sort the flattened events by date
        const sortedEvents = flattenedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        return sortedEvents.reduce(function (acc, event) {
            const dateKey = format(event.date, "yyyy-MM-dd");
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(event);
            console.log(acc);
            return acc;
        }, {});
    }, [data]);

    return (
        <div className="calendar col-span-12 mt-24 lg:mt-36 bg-white p-4 lg:p-12 rounded-xl text-textColor font-sans">
            <div className="flex justify-between items-center mb-4">
                <button className="flex items-center text-xs lg:text-base" onClick={prevMonth}>
                    <BsChevronLeft />
                    Vorheriger Monat
                </button>
                <H3 klasse="text-center px-4">{format(currentDate, "MMMM yyyy", { locale: de })}</H3>
                <button className="flex items-center text-xs lg:text-base" onClick={nextMonth}>
                    Nächster Monat
                    <BsChevronRight />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="font-bold p-4">
                        {day}
                    </div>
                ))}
                {Array.from({ length: startDayOfWeek }, (_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {daysInMonth.map((day, i) => {
                    const dateKey = format(day, "yyyy-MM-dd");
                    const todaysEvents = eventsByDate[dateKey] || [];
                    return (
                        <div
                            key={i}
                            className={` p-2 text-center lg:p-4  rounded-xl bg-slate-50 ${
                                isToday(day) ? " font-bold !bg-primaryColor-100" : null
                            }`}
                        >
                            {format(day, "d")}
                            {todaysEvents.map((e, i) => {
                                console.log(e);
                                return (
                                    <div
                                        style={{ background: e.kategorie.farbe.value }}
                                        className={`rounded-lg py-1 px-2 font-semibold text-sm relative ${
                                            todaysEvents.length > 1 ? "mb-1" : null
                                        } ${e.kategorie.name == "Beratung & Workshops" ? "!text-blueColor-100" : null}`}
                                        key={e.headline}
                                        data-index={e._id}
                                        onClick={(e) => {
                                            setShowToolTip(true);
                                            setToolTipData(getElementByID(data, e.currentTarget.dataset.index));
                                            console.log(e.currentTarget);
                                            console.log(getElementByID(data, e.currentTarget.dataset.index));
                                            console.log(data);
                                        }}
                                    >
                                        <div className="hidden lg:block">{e.headline}</div>
                                        {/* {showTooltip ? <ToolTip data={tooltipData}></ToolTip> : null} */}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
                ;
            </div>
        </div>
    );
};

export default Calendar;
