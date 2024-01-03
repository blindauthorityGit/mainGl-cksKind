import React, { useEffect, useState } from "react";

// COMPS
import Element from "./element";
import ElementEvent from "./elementEvent"; // Assuming this component exists

// TYPO
import { H2, H4, P } from "../typography";

const LinkGrid = ({ data, headline, isWorkshop, isDetail, isEvent }) => {
    const [flatData, setFlatData] = useState(null);

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
            // setDataLen(sortedEvents.length);
        }
    }, [data, isEvent]);

    return (
        <>
            <H2 klasse={`col-span-12 pl-6 text-center ${isWorkshop ? "!text-white" : null}`}>{headline}</H2>

            <div className="col-span-12 grid grid-cols-12 lg:gap-8 px-6 lg:px-24">
                {isEvent
                    ? flatData?.map((e, i) => {
                          return <ElementEvent key={i} isDetail={isDetail} isWorkshop={isWorkshop} data={e} />;
                      })
                    : data.map((e, i) => {
                          return <Element key={i} isDetail={isDetail} isWorkshop={isWorkshop} data={e} />;
                      })}
            </div>
        </>
    );
};

export default LinkGrid;
