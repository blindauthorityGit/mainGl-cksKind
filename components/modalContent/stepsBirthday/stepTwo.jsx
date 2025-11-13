import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { H2, P } from "../../typography";
import { MainButtonNOLink } from "../../buttons";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import de from "date-fns/locale/de";
import { getDay, isToday, isAfter, format } from "date-fns";
import { fetchFirestoreData } from "../../../config/firebase";
import useStore from "../../../store/store";
import client from "../../../client";

registerLocale("de", de);
setDefaultLocale("de");

// Stichtag: Reservierungen nur bis inklusive 31.12.2025
const MAX_RESERVATION_DATE = new Date(2025, 11, 31); // Monate 0-basiert: 11 = Dezember

// ---- TESTDATEN (Fallback, wenn Sanity leer ist) ----
// akzeptiert: "YYYY-MM-DD" oder { date: "YYYY-MM-DD" }
// const TEST_EXCEPTIONS = ["12-10-2025", { date: "12-10-2025" }];

const StepTwo = ({ handleNextStep, handlePrevStep }) => {
    const [startDate, setStartDate] = useState(null);
    const [timeSlot, setTimeSlot] = useState("");
    const [availableTimeSlots, setAvailableTimeSlots] = useState(["10:00 - 13:00", "15:00 - 18:00"]);
    const [isFullyBooked, setIsFullyBooked] = useState(false);
    const updateFormData = useStore((state) => state.updateFormData);
    const formData = useStore((state) => state.formData);
    const [exceptions, setExceptions] = useState([]);

    // --- AUSNAHMEN aus Sanity laden (und normalisieren) ---
    useEffect(() => {
        const fetchExceptions = async () => {
            try {
                const data = await client.fetch(`*[_type == "kindergeburtstag"][0]{ ausnahmen }`);
                const raw = data?.ausnahmen?.length ? data.ausnahmen : TEST_EXCEPTIONS;
                const normalized = raw.map((ex) => (typeof ex === "string" ? ex : ex?.date)).filter(Boolean); // => ["YYYY-MM-DD", ...]
                setExceptions(normalized);
                console.log(raw);
            } catch (error) {
                console.error("Error fetching exceptions, using TEST_EXCEPTIONS:", error);
                const normalized = TEST_EXCEPTIONS.map((ex) => (typeof ex === "string" ? ex : ex?.date)).filter(
                    Boolean
                );
                setExceptions(normalized);
            }
        };
        fetchExceptions();
    }, []);

    // --- (optional) alte Logik beibehalten / ungenutzt ---
    const updateAvailableTimeSlots = (date) => {
        const dayOfWeek = getDay(date);
        const newTimeSlots = ["09:30", "11:30"];
        if (dayOfWeek === 4) newTimeSlots.push("15:00");
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
        const localDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000);
        updateFormData({ date: localDate, timeSlot });
        handleNextStep();
    };

    const isStepComplete = startDate && timeSlot;

    // ---- AUSNAHMEN-Logik (nur SA & SO, Ausnahmen sperren, Vergangenheit & ab 1.1.2026 sperren) ----
    const toISODate = (date) => format(date, "yyyy-MM-dd");
    const isExceptionDate = (date) => exceptions.includes(toISODate(date));

    const filterDate = (date) => {
        const day = getDay(date);
        const isWeekend = day === 6 || day === 0; // SA/SO
        const futureOrToday = isToday(date) || isAfter(date, new Date());
        const beforeCutoff = !isAfter(date, MAX_RESERVATION_DATE); // nur bis inkl. 31.12.2025

        if (!isWeekend || !futureOrToday || !beforeCutoff) return false;
        if (isExceptionDate(date)) return false; // Urlaub/ausgeschlossen
        return true;
    };

    const getDayClassName = (date) => {
        const day = getDay(date);
        const isWeekend = day === 6 || day === 0;
        const futureOrToday = isToday(date) || isAfter(date, new Date());
        const beforeCutoff = !isAfter(date, MAX_RESERVATION_DATE);

        if (!isWeekend || !futureOrToday || !beforeCutoff || isExceptionDate(date)) {
            return "opacity-40 line-through";
        }
        return "weekday bg-primaryColor-200";
    };

    return (
        <div className="xl:w-2/4">
            <H2 klasse="mt-4 mb-6">Datum und Zeit </H2>
            <P klasse="mb-4 text-sm text-textColor/80">
                Bitte wähle dein Wunschdatum. Buchungen sind in der Regel nur am{" "}
                <span className="font-bold">Samstag und Sonntag </span>
                möglich und aktuell nur bis inklusive 31.12.2025. Urlaubstage und Ausnahmen sind im Kalender ausgegraut
                und nicht anwählbar.
            </P>

            {/* Mobile (inline) */}
            <div className="relative col-span-12 xl:hidden">
                <DatePicker
                    id="date-picker"
                    className="col-span-12 text-xs 2xl:text-lg border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4 mb-4 w-full"
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date);
                        setIsFullyBooked(false);
                        // updateAvailableTimeSlots(date); // falls du die alte Slot-Logik brauchst
                    }}
                    filterDate={filterDate}
                    inline
                    minDate={new Date()}
                    maxDate={MAX_RESERVATION_DATE}
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
                    )}
                    dayClassName={getDayClassName}
                />
            </div>

            {/* Desktop (Dropdown) */}
            <div className="relative col-span-12 hidden xl:block">
                <DatePicker
                    id="date-picker"
                    className="col-span-12 text-xs 2xl:text-lg border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4 mb-4 w-full"
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date);
                        setIsFullyBooked(false);
                        // updateAvailableTimeSlots(date); // falls du die alte Slot-Logik brauchst
                    }}
                    filterDate={filterDate}
                    minDate={new Date()}
                    maxDate={MAX_RESERVATION_DATE}
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
                    )}
                    dayClassName={getDayClassName}
                />
            </div>

            {startDate && (
                <div className=" mb-24">
                    <label
                        htmlFor="time-select"
                        className="block text-sm  2xl:text-lg font-semibold font-sans text-textColor mb-1 mt-3"
                    >
                        Zeitfenster wählen:
                    </label>
                    <select
                        id="time-select"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="col-span-6 w-full mb-4 text-xs 2xl:text-lg border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                    >
                        <option disabled value="">
                            Zeitfenster wählen
                        </option>
                        {availableTimeSlots.map((slot, index) => (
                            <option className="text-textColor text-sm mb-4" key={index} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {isFullyBooked && <P>Leider sind keine Zeitfenster für das gewählte Datum verfügbar.</P>}

            <div className="w-full col-span-12 sm:mb-8 absolute flex space-x-2 lg:space-x-4 bottom-0">
                <MainButtonNOLink
                    disabled={!isStepComplete}
                    onClick={() => {
                        // wenn du Availability wirklich prüfen willst, ruf hier checkAvailability auf
                        handleNextStep ? handleNext() : handleNextStep?.();
                    }}
                    klasse="bg-primaryColor border-2 border-primaryColor mt-4"
                >
                    Weiter
                </MainButtonNOLink>
            </div>
        </div>
    );
};

export default StepTwo;
