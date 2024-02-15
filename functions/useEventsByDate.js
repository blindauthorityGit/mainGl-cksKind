import { useMemo } from "react";
import { format, startOfMonth, endOfMonth, parseISO, addDays, endOfYear } from "date-fns";

const useEventsByDate = (data, currentDate) => {
    return useMemo(() => {
        const currentDate = new Date();

        const computeWeeklyOccurrences = (startDate, endDate, dayOfWeek) => {
            let occurrences = [];
            const start = parseISO(startDate);
            // Dynamically calculate the end of the current year if no endDate is provided
            const end = endDate ? parseISO(endDate) : endOfYear(new Date());
            let current = start;

            // Adjust to the first occurrence of the specified dayOfWeek
            while (current.getDay() !== dayOfWeek) {
                current = addDays(current, 1);
            }

            // Generate all occurrences from start to end
            while (current <= end) {
                occurrences.push(format(current, "yyyy-MM-dd"));
                current = addDays(current, 7); // Move to the next week
            }

            return occurrences;
        };

        const processedEvents = data.flatMap((event) => {
            // Handle block events
            if (event.recurringDates && event.recurringDates.length > 0) {
                return event.recurringDates.flatMap((recurringEvent) => {
                    const occurrences = computeWeeklyOccurrences(
                        recurringEvent.startDate,
                        recurringEvent.endDate,
                        recurringEvent.dayOfWeek
                    )
                        .map((date) => ({
                            ...event,
                            date: `${date}T${recurringEvent.timeslot.startTime}`,
                        }))
                        .filter((event) => new Date(event.date) >= currentDate);
                    return occurrences;
                });
            }
            // Handle recurring events
            else if (event.blocks && event.blocks.length > 0) {
                return event.blocks.flatMap((block) =>
                    block.dates
                        .map((date) => ({
                            ...event,
                            date: date.startDateTime,
                            ausgebucht: block.ausgebucht || false,
                        }))
                        .filter((event) => new Date(event.date) >= currentDate)
                );
            }
            // Handle single events
            else if (event.datum && event.datum.length > 0) {
                return event.datum
                    .map((date) => ({
                        ...event,
                        date: date.startDateTime,
                        ausgebucht: event.ausgebucht || false,
                    }))
                    .filter((event) => new Date(event.date) >= currentDate);
            }
            return [];
        });

        const eventsByDate = processedEvents.reduce((acc, event) => {
            const dateKey = format(parseISO(event.date), "yyyy-MM-dd");
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(event);
            return acc;
        }, {});

        return eventsByDate;
    }, [data, currentDate]);
};

export default useEventsByDate;
