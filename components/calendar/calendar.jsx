// import React, { useState, useMemo, useEffect } from "react";
// import {
//     format,
//     startOfMonth,
//     endOfMonth,
//     eachDayOfInterval,
//     addMonths,
//     subMonths,
//     getDay,
//     isSameDay,
//     isToday,
// } from "date-fns";
// import { de } from "date-fns/locale";

// //COMPS
// import ToolTip from "./toolTip";
// import { H3, P } from "../typography";
// import { Events } from "../modalContent";
// import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// //FUNCTION
// import processEvents from "../../functions/processEvents";
// import useEventsByDate from "../../functions/useEventsByDate"; // Adjust the path as needed

// //STORE
// import useStore from "../../store/store"; // Adjust the path to your store file

// const WEEKDAYS = ["So", "Mo", "Die", "Mi", "Do", "Fr", "Sa"];

// const Calendar = ({ data, isSmallCalendar }) => {
//     const [currentDate, setCurrentDate] = useState(new Date());

//     const firstDayOfMonth = startOfMonth(currentDate);
//     const lastDayOfMonth = endOfMonth(currentDate);
//     const startDayOfWeek = getDay(firstDayOfMonth); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

//     const [flatData, setFlatData] = useState(null);
//     const [showTooltip, setShowToolTip] = useState(false);
//     const [tooltipData, setToolTipData] = useState(null);

//     //STORE
//     const setShowOverlay = useStore((state) => state.setShowOverlay);
//     const setShowModal = useStore((state) => state.setShowModal);
//     const setModalContent = useStore((state) => state.setModalContent);
//     const modalColor = useStore((state) => state.showModal);
//     const setModalColor = useStore((state) => state.setModalColor);

//     const daysInMonth = eachDayOfInterval({
//         start: firstDayOfMonth,
//         end: lastDayOfMonth,
//     });
//     const eventsByDate = useEventsByDate(data, currentDate);

//     const nextMonth = () => {
//         setCurrentDate((prevDate) => addMonths(prevDate, 1));
//     };

//     const prevMonth = () => {
//         setCurrentDate((prevDate) => subMonths(prevDate, 1));
//     };

//     useEffect(() => {
//         const sortedEvents = processEvents(data, false);
//         console.log(sortedEvents);
//         setFlatData(sortedEvents);
//     }, [data, currentDate]);

//     // CHECKL IF DAY HAS EVENT
//     const handleDayClick = (date) => {
//         const dateKey = format(date, "yyyy-MM-dd");
//         const events = eventsByDate[dateKey];
//         if (events && events.length > 0) {
//             const index = flatData.findIndex((event) => format(event.date, "yyyy-MM-dd") === dateKey);
//             setModalContent(<Events events={flatData} currentIndex={index} />);
//             setModalColor(events[0].kategorie.farbe.value);
//             setShowOverlay(true);
//             setShowModal(true);
//         } else {
//             // No events on this day
//             console.log("No events on this day");
//         }
//     };

//     return (
//         <div
//             className={`calendar col-span-12 ${
//                 isSmallCalendar ? "lg:px-12 pt-0 pb-12" : "mt-24 lg:mt-36 lg:p-12"
//             } bg-white p-4  rounded-xl text-textColor font-sans`}
//         >
//             <div className="flex justify-between items-center mb-4">
//                 <button className="flex items-center text-xs lg:text-base" onClick={prevMonth}>
//                     <BsChevronLeft />
//                     Vorheriger Monat
//                 </button>
//                 <H3 klasse="text-center px-4">{format(currentDate, "MMMM yyyy", { locale: de })}</H3>
//                 <button className="flex items-center text-xs lg:text-base" onClick={nextMonth}>
//                     Nächster Monat
//                     <BsChevronRight />
//                 </button>
//             </div>
//             <div className="grid grid-cols-7 gap-2">
//                 {WEEKDAYS.map((day) => (
//                     <div key={day} className="font-bold p-4">
//                         {day}
//                     </div>
//                 ))}
//                 {Array.from({ length: startDayOfWeek }, (_, i) => (
//                     <div key={`empty-${i}`} />
//                 ))}
//                 {daysInMonth.map((day, i) => {
//                     const dateKey = format(day, "yyyy-MM-dd");
//                     const todaysEvents = eventsByDate[dateKey] || [];
//                     const hasEvents = todaysEvents.length > 0;

//                     return (
//                         <div
//                             key={i}
//                             className={`p-2 text-center 2xl:p-4 rounded-xl bg-slate-50 ${
//                                 isToday(day) ? " font-bold !bg-primaryColor-100" : ""
//                             } ${hasEvents ? "cursor-pointer hover:bg-slate-100" : ""}`}
//                             onClick={() => hasEvents && !isSmallCalendar && handleDayClick(day)}
//                         >
//                             {format(day, "d")}
//                             {todaysEvents.map((e, i) => {
//                                 return (
//                                     <div
//                                         style={{
//                                             background: e.kategorie.farbe.value,
//                                             opacity: e.ausgebucht ? "0.3" : "1",
//                                         }}
//                                         className={`rounded-lg py-1 px-2 2xl:font-semibold text-sm relative ${
//                                             todaysEvents.length > 1 ? "mb-1" : null
//                                         } ${e.kategorie.name == "Beratung & Workshops" ? "!text-blueColor-100" : null}`}
//                                         key={e.headline + i}
//                                         data-index={e._id}
//                                         onClick={(e) => {
//                                             // setShowToolTip(true);
//                                             // setToolTipData(getElementByID(data, e.currentTarget.dataset.index));
//                                             // console.log(e.currentTarget);
//                                             // console.log(getElementByID(data, e.currentTarget.dataset.index));
//                                             // console.log(data);
//                                         }}
//                                     >
//                                         <div
//                                             className={`${
//                                                 isSmallCalendar ? "lg:hidden" : null
//                                             } hidden lg:block xl:text-xs`}
//                                         >
//                                             {e.headline}
//                                         </div>
//                                         {/* {showTooltip ? <ToolTip data={tooltipData}></ToolTip> : null} */}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     );
//                 })}
//                 ;
//             </div>
//         </div>
//     );
// };

// export default Calendar;

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
import { Events } from "../modalContent";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

//FUNCTION
import processEvents from "../../functions/processEvents";
import useEventsByDate from "../../functions/useEventsByDate"; // Adjust the path as needed

//STORE
import useStore from "../../store/store"; // Adjust the path to your store file

const WEEKDAYS = ["So", "Mo", "Die", "Mi", "Do", "Fr", "Sa"];

const Calendar = ({ data, isSmallCalendar }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const startDayOfWeek = getDay(firstDayOfMonth); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    const [flatData, setFlatData] = useState(null);
    const [showTooltip, setShowToolTip] = useState(false);
    const [tooltipData, setToolTipData] = useState(null);

    //STORE
    const setShowOverlay = useStore((state) => state.setShowOverlay);
    const setShowModal = useStore((state) => state.setShowModal);
    const setModalContent = useStore((state) => state.setModalContent);
    const modalColor = useStore((state) => state.showModal);
    const setModalColor = useStore((state) => state.setModalColor);

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    });
    const eventsByDate = useEventsByDate(data, currentDate);

    const nextMonth = () => {
        setCurrentDate((prevDate) => addMonths(prevDate, 1));
    };

    const prevMonth = () => {
        setCurrentDate((prevDate) => subMonths(prevDate, 1));
    };

    useEffect(() => {
        const sortedEvents = processEvents(data);
        // console.log(data.filter((e) => e.headline == "Känguru Salsa & Känguru Belly"));
        // console.log(sortedEvents.filter((e) => e.headline == "Känguru Salsa & Känguru Belly"));
        setFlatData(sortedEvents);
    }, [data]);

    // // Preprocess events data to create a map for efficient lookup
    // const eventsByDate = useMemo(() => {
    //     const currentDate = new Date();
    //     // FLATTEN ARRAY TO SINGLE DATES AND FILTER OUT OUTDATED EVENTS
    //     const flattenedEvents = data.flatMap((event) =>
    //         event.datum
    //             .map((date) => ({ ...event, date: date.startDateTime }))
    //             .filter((event) => new Date(event.date) >= currentDate)
    //     );

    //     // Sort the flattened events by date
    //     const sortedEvents = flattenedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    //     return sortedEvents.reduce(function (acc, event) {
    //         const dateKey = format(event.date, "yyyy-MM-dd");
    //         if (!acc[dateKey]) {
    //             acc[dateKey] = [];
    //         }
    //         acc[dateKey].push(event);
    //         return acc;
    //     }, {});
    // }, [data]);

    // CHECKL IF DAY HAS EVENT
    const handleDayClick = (date) => {
        const dateKey = format(date, "yyyy-MM-dd");
        const events = eventsByDate[dateKey];
        if (events && events.length > 0) {
            const index = flatData.findIndex((event) => format(event.date, "yyyy-MM-dd") === dateKey);
            setModalContent(<Events events={flatData} currentIndex={index} />);
            setModalColor(events[0].kategorie.farbe.value);
            setShowOverlay(true);
            setShowModal(true);
        } else {
            // No events on this day
            // console.log("No events on this day");
        }
    };

    return (
        <div
            className={`calendar col-span-12 ${
                isSmallCalendar ? "lg:px-12 pt-0 pb-12" : "mt-24 lg:mt-36 lg:p-12"
            } bg-white p-4  rounded-xl text-textColor font-sans`}
        >
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
                    const hasEvents = todaysEvents.length > 0;
                    return (
                        <div
                            key={i}
                            className={`p-2 text-center 2xl:p-4 rounded-xl bg-slate-50 ${
                                isToday(day) ? " font-bold !bg-primaryColor-100" : ""
                            } ${hasEvents ? "cursor-pointer hover:bg-slate-100" : ""}`}
                            onClick={() => hasEvents && !isSmallCalendar && handleDayClick(day)}
                        >
                            {format(day, "d")}
                            {todaysEvents.map((e, i) => {
                                // console.log(e.kategorie.name);
                                return (
                                    <div
                                        style={{
                                            background: e.kategorie.farbe.value,
                                            opacity: e.ausgebucht ? "0.3" : "1",
                                        }}
                                        className={`rounded-lg py-1 px-2 2xl:font-semibold text-sm relative ${
                                            todaysEvents.length > 1 ? "mb-1" : null
                                        } ${e.kategorie.name == "Beratung & Coachings" ? "!text-blueColor-100" : null}`}
                                        key={e.headline + i}
                                        data-index={e._id}
                                        onClick={(e) => {
                                            // setShowToolTip(true);
                                            // setToolTipData(getElementByID(data, e.currentTarget.dataset.index));
                                            // console.log(e.currentTarget);
                                            // console.log(getElementByID(data, e.currentTarget.dataset.index));
                                            // console.log(data);
                                        }}
                                    >
                                        <div
                                            className={`${
                                                isSmallCalendar ? "lg:hidden" : null
                                            } hidden lg:block xl:text-xs`}
                                        >
                                            {e.headline}
                                        </div>
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
