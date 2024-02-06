import { eachWeekOfInterval, add, parseISO, isAfter, formatISO, startOfDay } from "date-fns";

function computeWeeklyOccurrences(startDate, endDate, dayOfWeek) {
    const occurrences = eachWeekOfInterval({
        start: parseISO(startDate),
        end: endDate ? parseISO(endDate) : add(parseISO(startDate), { years: 1 }),
    })
        .map((date) => startOfDay(date))
        .filter((date) => date.getDay() === dayOfWeek)
        .map((date) => formatISO(date, { representation: "date" }));

    return occurrences;
}

export default function processEvents(data, forSlider = false) {
    const currentDate = new Date();

    return data
        .flatMap((event) => {
            // Handle recurring events
            if (event.recurringDate && event.recurringDate.startDate) {
                const { startDate, endDate, dayOfWeek } = event.recurringDate;
                const occurrences = computeWeeklyOccurrences(startDate, endDate, dayOfWeek);
                return occurrences
                    .map((date) => ({
                        ...event,
                        date: `${date}T${event.recurringDate.timeslot.startTime}`,
                        ausgebucht: event.ausgebucht || false,
                    }))
                    .filter((event) => isAfter(new Date(event.date), currentDate));
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
