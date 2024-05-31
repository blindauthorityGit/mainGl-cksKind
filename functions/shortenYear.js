// functions/shortenYear.js
const shortenYear = (dateString) => {
    const [day, month, year] = dateString.split(".");
    const shortenedYear = year.slice(-2);
    return `${day}.${month}.${shortenedYear}`;
};

export default shortenYear;
