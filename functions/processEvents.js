export default function processEvents(data) {
    const currentDate = new Date();

    const processedEvents = data.flatMap((event) => {
        if (event.blocks && event.blocks.length > 0) {
            return event.blocks.flatMap((block) => {
                // Check if the block has the 'ausgebucht' flag
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

    // Sort the processed events by date and take the first 15
    const sortedEvents = processedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    return sortedEvents;
}
