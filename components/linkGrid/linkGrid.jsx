import React, { useEffect, useState } from "react";

// COMPS
import Element from "./element";
import ElementEvent from "./elementEvent"; // Assuming this component exists

// TYPO
import { H2, H4, P } from "../typography";
import { MainButtonNOLink } from "../buttons";

const ITEMS_PER_PAGE = 12; // Define how many items you want per page

const LinkGrid = ({ data, headline, isWorkshop, isDetail, isEvent }) => {
    const [flatData, setFlatData] = useState(null);

    const [displayedItems, setDisplayedItems] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (isEvent) {
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
            setAllItems(sortedEvents); // Set all items
            setDisplayedItems(sortedEvents.slice(0, ITEMS_PER_PAGE)); // Set initial displayed items

            // setDataLen(sortedEvents.length);
        }
    }, [data, isEvent]);

    const loadMoreItems = () => {
        const newPage = currentPage + 1;
        const newItems = allItems.slice(0, newPage * ITEMS_PER_PAGE);
        setDisplayedItems(newItems);
        setCurrentPage(newPage);
    };

    return (
        <>
            <H2 klasse={`col-span-12 pl-6 text-center xl:!mb-4 2xl:!mb-4  ${isWorkshop ? "!text-white" : null}`}>
                {headline}
            </H2>

            <div className="col-span-12 grid grid-cols-12 gap-4 lg:gap-8 px-6 lg:px-24">
                {isEvent
                    ? displayedItems?.map((e, i) => {
                          return <ElementEvent key={i} isDetail={isDetail} isWorkshop={isWorkshop} data={e} />;
                      })
                    : data.map((e, i) => {
                          return (
                              <Element
                                  link={
                                      e._type == "kategorie" ? "/kurse/" + e.button.link : "/partner/" + e.slug?.current
                                  }
                                  partner={e._type == "partner"}
                                  key={i}
                                  isDetail={isDetail}
                                  isWorkshop={isWorkshop}
                                  data={e}
                              />
                          );
                      })}
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
