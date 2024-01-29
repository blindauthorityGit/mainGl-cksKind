export default function parseDateTime(date, timeSlot) {
    const [startTime] = timeSlot.split(" - "); // Extracts start time (e.g., "09:30")
    const [hours, minutes] = startTime.split(":").map(Number); // Splits "09:30" into [9, 30]

    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0); // Sets hours and minutes to the date

    return dateTime;
}
