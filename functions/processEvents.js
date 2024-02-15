import { eachWeekOfInterval, add, parseISO, isAfter, formatISO, startOfDay } from "date-fns";

function computeWeeklyOccurrences(startDate, endDate, dayOfWeek) {
    const start = parseISO(startDate);
    const end = endDate ? parseISO(endDate) : add(start, { years: 1 });
    const occurrences = [];

    // Adjust the start date to the first occurrence of the specified dayOfWeek
    let current = start;
    while (current.getDay() !== dayOfWeek) {
        current = add(current, { days: 1 });
    }

    // Now that we have the first correct day, iterate weekly until the end date
    while (current <= end) {
        occurrences.push(formatISO(current, { representation: "date" }));
        current = add(current, { weeks: 1 });
    }

    return occurrences;
}

export default function processEvents(data, forSlider = false) {
    const currentDate = new Date();

    return data
        .flatMap((event) => {
            // Handle recurring events
            if (event.recurringDates && event.recurringDates.length > 0) {
                // Use a Map to track the first occurrence of each date
                const firstOccurrences = new Map();

                event.recurringDates.flatMap((recurringEvent) => {
                    const { startDate, endDate, dayOfWeek, timeslot } = recurringEvent;
                    const occurrences = computeWeeklyOccurrences(startDate, endDate, dayOfWeek);

                    occurrences.forEach((date) => {
                        // If the date isn't already in the map, add it
                        if (!firstOccurrences.has(date)) {
                            firstOccurrences.set(date, {
                                ...event,
                                date: `${date}T${timeslot.startTime}`,
                                ausgebucht: event.ausgebucht || false,
                            });
                        }
                    });
                });

                // Convert the Map values to an array and filter out past events
                return Array.from(firstOccurrences.values()).filter((recEvent) =>
                    isAfter(new Date(recEvent.date), currentDate)
                );
            }
            // Adjusted logic for block events with dynamic date selection
            else if (event.isBlock && event.blocks && event.blocks.length > 0) {
                if (forSlider) {
                    // For each block, find the next upcoming date relative to the current date
                    return event.blocks.flatMap((block) => {
                        const upcomingDate = block.dates.find((date) =>
                            isAfter(new Date(date.startDateTime), currentDate)
                        );
                        // If there's an upcoming date, return it; otherwise, return nothing
                        return upcomingDate
                            ? [
                                  {
                                      ...event,
                                      date: upcomingDate.startDateTime,
                                      ausgebucht: block.ausgebucht,
                                  },
                              ]
                            : [];
                    });
                } else {
                    // For other uses, include all dates in all blocks
                    return event.blocks.flatMap((block) =>
                        block.dates
                            .map((date) => ({
                                ...event,
                                date: date.startDateTime,
                                ausgebucht: block.ausgebucht,
                            }))
                            .filter((blockEvent) => isAfter(new Date(blockEvent.date), currentDate))
                    );
                }
            }
            // Handle single events
            else if (Array.isArray(event.datum)) {
                return event.datum
                    .map((date) => ({
                        ...event,
                        date: date.startDateTime,
                        ausgebucht: event.ausgebucht,
                    }))
                    .filter((datumEvent) => isAfter(new Date(datumEvent.date), currentDate));
            } else {
                return [];
            }
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
}
