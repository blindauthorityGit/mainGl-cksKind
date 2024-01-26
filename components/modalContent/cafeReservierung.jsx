import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { H4, P } from "../typography";
import { MainButtonNOLink } from "../buttons";

// FIREBASE
import { fetchFirestoreData } from "../../config/firebase";
const TIME_SLOTS = ["09:30 - 11:30", "11:30 - 13:30"];

const CafeReservierung = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(1);

    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [isFullyBooked, setIsFullyBooked] = useState(false);

    const MAX_CAPACITY = 32;

    const checkAvailability = async (selectedDate, numberOfGuests) => {
        setIsFullyBooked(false);
        const formattedDate = selectedDate.toISOString().split("T")[0];

        try {
            const reservations = await fetchFirestoreData("reservierung_cafe");
            const reservationsOnDate = reservations.filter((reservation) => {
                const reservationDate = new Date(reservation.datum.seconds * 1000).toISOString().split("T")[0];
                return reservationDate === formattedDate;
            });

            const availableSlotsWithSpaces = TIME_SLOTS.map((slot) => {
                const totalGuestsInSlot = reservationsOnDate
                    .filter((reservation) => reservation.zeit === slot)
                    .reduce((total, current) => total + current.anzahl, 0);

                return {
                    slot: slot,
                    availableSpaces: MAX_CAPACITY - totalGuestsInSlot,
                };
            }).filter((slot) => slot.availableSpaces >= numberOfGuests);

            setAvailableTimeSlots(availableSlotsWithSpaces);
            setIsFullyBooked(availableSlotsWithSpaces.length === 0);
        } catch (error) {
            console.error("Error checking availability:", error);
            // Handle error
        }
    };

    useEffect(() => {
        fetchFirestoreData("reservierung_cafe")
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reservationData = { date: startDate, time, guests };

        // Send this data to the backend and handle the response
    };

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6; // 0 is Sunday and 6 is Saturday
    };

    return (
        <div className="container mx-auto grid grid-cols-12">
            <div className="col-span-12 xl:col-span-6">
                <H4 klasse="mt-4 mb-6 !text-xl">Reservierung!</H4>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700 mb-1">
                        Datum auswählen:
                    </label>
                    <DatePicker
                        id="date-picker"
                        className="col-span-12 text-xs  border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4 mb-4"
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            setAvailableTimeSlots([]);
                            setIsFullyBooked(false);
                        }}
                        dateFormat="dd/MM/yyyy"
                        dayClassName={(date) => (isWeekday(date) ? "weekday bg-primaryColor-200" : "")}
                    />
                    {startDate && (
                        <>
                            <label htmlFor="guest-number" className="block text-sm font-medium text-gray-700 mb-1">
                                Anzahl der Gäste:
                            </label>
                            <input
                                id="guest-number"
                                className="col-span-12 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                                type="number"
                                value={guests}
                                onChange={(e) => {
                                    setGuests(e.target.value);
                                    if (e.target.value && startDate) {
                                        checkAvailability(startDate, e.target.value);
                                    }
                                }}
                                min="1"
                                max="32"
                            />
                        </>
                    )}
                    {guests && availableTimeSlots.length > 0 && (
                        <>
                            <label htmlFor="time-select" className="block text-sm font-medium text-gray-700 mb-1">
                                Zeitfenster wählen:
                            </label>
                            <select
                                id="time-select"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="mb-4"
                            >
                                {availableTimeSlots.map(({ slot, availableSpaces }, index) => (
                                    <option key={index} value={slot}>
                                        {slot} (Verfügbare Plätze: {availableSpaces})
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                    <div className="w-full col-span-12 sm:mb-8">
                        <MainButtonNOLink type="submit" klasse="bg-primaryColor border-2 border-primaryColor mt-4">
                            Absenden
                        </MainButtonNOLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CafeReservierung;
