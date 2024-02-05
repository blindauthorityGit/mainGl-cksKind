import { useMemo } from "react";
import { format } from "date-fns";

const useEventsByDate = (data) => {
    return useMemo(() => {
        const currentDate = new Date();

        const processedEvents = data.flatMap((event) => {
            if (event.blocks && event.blocks.length > 0) {
                return event.blocks.flatMap((block) => {
                    const isBlockAusgebucht = block.ausgebucht || false;

                    return block.dates
                        .map((date) => ({
                            ...event,
                            date: date.startDateTime,
                            ausgebucht: isBlockAusgebucht,
                        }))
                        .filter((event) => new Date(event.date) >= currentDate);
                });
            } else {
                return event.datum
                    .map((date) => ({ ...event, date: date.startDateTime }))
                    .filter((event) => new Date(event.date) >= currentDate);
            }
        });

        const sortedEvents = processedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        const eventsByDate = sortedEvents.reduce(function (acc, event) {
            const dateKey = format(event.date, "yyyy-MM-dd");
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(event);
            return acc;
        }, {});

        return eventsByDate;
    }, [data]);
};

export default useEventsByDate;
