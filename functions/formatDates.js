export default function formatDates(dates) {
    const formattedDates = dates.map((date) => {
        const startDateTime = new Date(date.startDateTime);
        const endDateTime = new Date(date.endDateTime);

        const startDate = startDateTime.toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        const startTime = startDateTime.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
        });

        const endTime = endDateTime.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return `${startDate} ${startTime}`;
    });

    return formattedDates;
}
