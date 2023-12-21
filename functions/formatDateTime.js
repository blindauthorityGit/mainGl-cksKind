export default function formatDateTime(startDateTime, endDateTime) {
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };
    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${hours}:${minutes}`;
    };

    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);
    const formattedEndTime = formatTime(endDate);

    // Check if the start and end dates have the same day
    const isSameDay = startDate.toDateString() === endDate.toDateString();

    // If the start and end dates are the same day, display only the start day
    if (isSameDay) {
        return `${formattedStart} - ${formattedEndTime}`;
    } else {
        // If different days, display both start and end days
        return `${formattedStart} - ${formattedEnd}`;
    }
}
