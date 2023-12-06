export default function formatDates(dates) {
    const now = new Date();

    // Calculate the differences in milliseconds between now and each startDateTime
    const timeDifferences = (date) => {
        const startDateTime = new Date(date.startDateTime);
        return Math.abs(startDateTime - now);
    };

    // Find the index of the date with the smallest time difference
    const closestDateIndex = timeDifferences.indexOf(Math.min(...timeDifferences));

    // Get the closest date
    const closestDate = dates[closestDateIndex];

    // Format the closest date
    const formattedClosestDate = `${new Date(closestDate.startDateTime).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })} ${new Date(closestDate.startDateTime).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
    })}`;

    return [formattedClosestDate];
}
