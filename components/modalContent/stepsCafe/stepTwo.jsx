import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { H2, P } from "../../typography";
import { MainButtonNOLink } from "../../buttons";
import { FaChevronDown } from "react-icons/fa";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import de from "date-fns/locale/de";
import { getDay, isToday, isAfter, format } from "date-fns";
import { fetchFirestoreData } from "../../../config/firebase";
import useStore from "../../../store/store";

import client from "../../../client";

registerLocale("de", de);
setDefaultLocale("de");

const StepTwo = ({ handleNextStep, handlePrevStep }) => {
    const [startDate, setStartDate] = useState(null);
    const [timeSlot, setTimeSlot] = useState("");
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [isFullyBooked, setIsFullyBooked] = useState(false);
    const updateFormData = useStore((state) => state.updateFormData);
    const formData = useStore((state) => state.formData);
    const [exceptions, setExceptions] = useState([]);

    //FETCH EXCEPRTIONS

    useEffect(() => {
        const fetchExceptions = async () => {
            try {
                const data = await client.fetch(`*[_type == "cafe"]`);
                console.log(data[0].ausnahmen);
                setExceptions(data[0].ausnahmen);
            } catch (error) {
                console.error("Error fetching exceptions:", error);
            }
        };

        fetchExceptions();
    }, []);

    useEffect(() => {
        if (startDate) {
            updateAvailableTimeSlots(startDate);
        }
    }, [startDate]);

    useEffect(() => {
        if (startDate && formData.guests) {
            checkAvailability(startDate, formData.guests);
        }
    }, [startDate, formData.guests]);

    const updateAvailableTimeSlots = (date) => {
        const dayOfWeek = getDay(date);
        const newTimeSlots = ["09:30", "11:30"];
        if (dayOfWeek === 4) {
            newTimeSlots.push("15:00");
        }
        setAvailableTimeSlots(
            newTimeSlots.map((slot) => ({
                slot: slot,
                capacity: slot === "15:00" ? 25 : 20,
            }))
        );
    };

    const checkAvailability = async (selectedDate, numberOfGuests) => {
        setIsFullyBooked(false);
        const utcSelectedDate = new Date(
            Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
        );
        const formattedDate = utcSelectedDate.toISOString().split("T")[0];

        try {
            const reservations = await fetchFirestoreData(
                process.env.NEXT_DEV === "true" ? "dev_cafe" : "reservierung_cafe"
            );
            const reservationsOnDate = reservations.filter((reservation) => {
                const reservationDate = new Date(reservation.date);
                return reservationDate.toISOString().split("T")[0] === formattedDate;
            });

            const updatedAvailableTimeSlots = availableTimeSlots
                .map(({ slot, capacity }) => {
                    const totalGuestsInSlot = reservationsOnDate
                        .filter((reservation) => reservation.timeSlot === slot)
                        .reduce((total, current) => {
                            const guestsInCurrentReservation = parseInt(current.guests, 10) || 0;
                            return total + guestsInCurrentReservation;
                        }, 0);

                    return {
                        slot: slot,
                        availableSpaces: capacity - totalGuestsInSlot,
                    };
                })
                .filter(({ availableSpaces }) => availableSpaces >= numberOfGuests);

            setAvailableTimeSlots(updatedAvailableTimeSlots);
            setIsFullyBooked(updatedAvailableTimeSlots.length === 0);
        } catch (error) {
            console.error("Error checking availability:", error);
        }
    };

    const handleNext = () => {
        // Normalize the date to local timezone before saving to state
        const localDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000);
        updateFormData({ date: localDate, timeSlot });
        handleNextStep();
    };

    const isStepComplete = startDate && timeSlot && availableTimeSlots.some((slotObj) => slotObj.slot === timeSlot);

    const isWeekdayAndFutureDate = (date) => {
        const day = getDay(date);
        const isWeekday = day !== 0 && day !== 6;
        return isWeekday && (isToday(date) || isAfter(date, new Date()));
    };

    const isExceptionDate = (date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        return exceptions.some((exception) => exception.date === formattedDate);
    };

    const filterDate = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6 && !isExceptionDate(date);
    };

    const getDayClassName = (date) => {
        if (!filterDate(date)) {
            return "";
        }
        return isWeekdayAndFutureDate(date) ? "weekday bg-primaryColor-200" : "";
    };

    return (
        <div>
            <H2 klasse="mt-4 mb-6">Datum und Zeit </H2>
            {/* <label
                htmlFor="date-picker"
                className="block text-sm lg:text-lg font-semibold font-sans text-textColor mb-1"
            >
                Datum auswählen:
            </label> */}
            <div className="relative col-span-12">
                <DatePicker
                    id="date-picker"
                    className="col-span-12  text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4 mb-4 w-full"
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date);
                        setTimeSlot("");
                        setAvailableTimeSlots([]);
                        setIsFullyBooked(false);
                        updateAvailableTimeSlots(date);
                    }}
                    // filterDate={(date) => {
                    //     const day = getDay(date);
                    //     return day !== 0 && day !== 6;
                    // }}
                    filterDate={filterDate}
                    inline
                    minDate={new Date()}
                    locale="de-DE"
                    placeholderText="Datum auswählen"
                    dateFormat="dd/MM/yyyy"
                    calendarContainer={(props) => (
                        <div
                            {...props}
                            style={{
                                width: "100%",
                                color: "#57456a",
                                display: "flex",
                                justifyContent: "center",
                                fontFamily: "Montserrat",
                            }}
                        />
                    )} // Inline style for 100% width
                    dayClassName={getDayClassName}
                />
                {/* <FaChevronDown className="absolute right-4 top-[38%] transform -translate-y-1/2 text-gray-700 pointer-events-none" /> */}
            </div>
            {startDate && (
                <>
                    <label
                        htmlFor="time-select"
                        className="block text-sm lg:text-lg font-semibold font-sans text-textColor mb-1 mt-3"
                    >
                        Zeitfenster wählen:
                    </label>
                    <select
                        id="time-select"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="col-span-6 w-full mb-4 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                    >
                        <option disabled value="">
                            Zeitfenster wählen
                        </option>
                        {availableTimeSlots.map(({ slot, availableSpaces }, index) => (
                            <option className="text-textColor text-sm mb-4" key={index} value={slot}>
                                {slot} (Verfügbare Plätze: {availableSpaces})
                            </option>
                        ))}
                    </select>
                </>
            )}
            {isFullyBooked && <P>Leider sind keine Zeitfenster für das gewählte Datum verfügbar.</P>}
            <div className="w-full col-span-12 sm:mb-8 absolute flex space-x-2 lg:space-x-4 bottom-0">
                <MainButtonNOLink onClick={handlePrevStep} klasse="bg-textColor mt-4">
                    Zurück
                </MainButtonNOLink>
                <MainButtonNOLink
                    disabled={!isStepComplete}
                    onClick={handleNext}
                    klasse="bg-primaryColor border-2 border-primaryColor mt-4"
                >
                    Weiter
                </MainButtonNOLink>
            </div>
        </div>
    );
};

export default StepTwo;
