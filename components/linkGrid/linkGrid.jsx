import React, { useEffect, useState } from "react";
import { parseISO, addDays, endOfYear, format, isAfter } from "date-fns";

// COMPS
import Element from "./element";
import ElementEvent from "./elementEvent"; // Assuming this component exists

// TYPO
import { H2 } from "../typography";
import { MainButtonNOLink } from "../buttons";

// FUNCTIONS
const ITEMS_PER_PAGE = 12; // Define how many items you want per page

const LinkGrid = ({ data, headline, isWorkshop, isDetail, isEvent }) => {
    const [displayedItems, setDisplayedItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const computeWeeklyOccurrences = (startDate, endDate, dayOfWeek, timeslot) => {
            let occurrences = [];
            const start = parseISO(startDate);
            const end = endDate ? parseISO(endDate) : endOfYear(new Date());
            let current = start;

            while (current.getDay() !== dayOfWeek) {
                current = addDays(current, 1);
            }

            while (current <= end) {
                occurrences.push({
                    ...timeslot, // Assuming timeslot contains relevant event info
                    date: format(current, "yyyy-MM-dd") + "T" + timeslot.startTime,
                });
                current = addDays(current, 7);
            }

            return occurrences;
        };

        if (isEvent) {
            const currentDate = new Date();

            const processedEvents = data
                .flatMap((event) => {
                    if (event.recurringDates && event.recurringDates.length > 0) {
                        return event.recurringDates.flatMap((recurringEvent) => {
                            return computeWeeklyOccurrences(
                                recurringEvent.startDate,
                                recurringEvent.endDate,
                                recurringEvent.dayOfWeek,
                                recurringEvent.timeslot
                            ).map((occurrence) => ({ ...event, ...occurrence, date: occurrence.date }));
                        });
                    } else if (event.blocks && event.blocks.length > 0) {
                        return event.blocks.flatMap((block) =>
                            block.dates.map((date) => ({
                                ...event,
                                date: date.startDateTime,
                                ausgebucht: block.ausgebucht || false,
                            }))
                        );
                    } else if (event.datum && event.datum.length > 0) {
                        return event.datum.map((date) => ({
                            ...event,
                            date: date.startDateTime,
                        }));
                    }
                    return []; // For events that don't fit any category
                })
                .filter((event) => new Date(event.date) >= currentDate);

            // Group events by base event and get the closest upcoming date for each
            const eventMap = new Map();

            processedEvents.forEach((event) => {
                if (!eventMap.has(event._id) || isAfter(eventMap.get(event._id).nextDate, new Date(event.date))) {
                    eventMap.set(event._id, { ...event, nextDate: new Date(event.date) });
                }
            });

            const filteredEvents = Array.from(eventMap.values());

            // Sort and paginate the events
            const sortedEvents = filteredEvents.sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate));
            setAllItems(sortedEvents);
            setDisplayedItems(sortedEvents.slice(0, ITEMS_PER_PAGE * currentPage));
        }
    }, [data, isEvent, currentPage]);

    const loadMoreItems = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setDisplayedItems((prevItems) => [
            ...prevItems,
            ...allItems.slice(prevItems.length, ITEMS_PER_PAGE * (currentPage + 1)),
        ]);
    };

    return (
        <>
            <H2 klasse={`col-span-12 pl-6 text-center xl:!mb-4 2xl:!mb-4  ${isWorkshop ? "!text-white" : null}`}>
                {headline}
            </H2>

            <div className="col-span-12 grid grid-cols-12 gap-y-4 gap-x-2 lg:gap-8 lg:px-24">
                {isEvent
                    ? displayedItems.map((e, i) => (
                          <ElementEvent key={i} isDetail={isDetail} isWorkshop={isWorkshop} data={e} />
                      ))
                    : data.map((e, i) => (
                          <Element
                              link={
                                  !e.isHidden
                                      ? e._type === "kategorie"
                                          ? e.button.link
                                          : "/partner/" + e.slug?.current
                                      : "#"
                              }
                              partner={e._type === "partner"}
                              key={i}
                              isDetail={isDetail}
                              isWorkshop={isWorkshop}
                              data={e}
                          />
                      ))}
            </div>

            {allItems.length > displayedItems.length && (
                <div className="col-span-12 flex justify-center mt-4">
                    <MainButtonNOLink
                        onClick={loadMoreItems}
                        klasse="mt-4 px-4 py-2 text-white bg-textColor max-w-[12rem] hover:bg-primaryColor"
                    >
                        Mehr laden
                    </MainButtonNOLink>
                </div>
            )}
        </>
    );
};

export default LinkGrid;
