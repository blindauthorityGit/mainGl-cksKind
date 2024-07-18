import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { H2, P } from "../typography";
import { MainButtonNOLink } from "../buttons";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import de from "date-fns/locale/de"; // Import the German locale
import { isAfter, isToday, getDay } from "date-fns";

import { FaChevronDown } from "react-icons/fa";
import { CoverImage } from "../images";

import ClipLoader from "react-spinners/ClipLoader";

// FUNCTIONS
import urlFor from "../../functions/urlFor";

// FIREBASE
import { fetchFirestoreData } from "../../config/firebase";

registerLocale("de", de);
setDefaultLocale("de");

const CafeReservierung = ({ image }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);

    const [startDate, setStartDate] = useState(null);
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState("");
    const [kids, setKids] = useState("");

    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [isFullyBooked, setIsFullyBooked] = useState(false);

    const [name, setName] = useState("");
    const [telefon, setTelefon] = useState("");
    const [email, setEmail] = useState("");

    const MAX_CAPACITY = 20;

    const isStep1Complete = startDate && guests && availableTimeSlots.some((slotObj) => slotObj.slot === time);
    const isStep2Complete = name && telefon && email;

    useEffect(() => {
        const validateForm = () => {
            const guestsNumber = parseInt(guests, 10);
            const validGuests = guestsNumber > 0;
            const validDate = !!startDate;
            const validTimeSlot = time && availableTimeSlots.some((slotObj) => slotObj.slot === time);

            setFormIsValid(validDate && validGuests && validTimeSlot);
        };

        validateForm();
    }, [startDate, guests, time, availableTimeSlots]);

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

    useEffect(() => {
        if (startDate) {
            updateAvailableTimeSlots(startDate);
        }
    }, [startDate]);

    useEffect(() => {
        if (startDate && guests) {
            checkAvailability(startDate, guests);
        }
    }, [guests]);

    const handleBack = () => {
        setCurrentStep(1);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (currentStep === 1) {
            if (isStep1Complete) {
                setCurrentStep(2);
            } else {
            }
        } else if (currentStep === 2) {
            if (isStep2Complete) {
                const adjustDateForTimezone = (date) => {
                    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
                    return utcDate.toISOString().split("T")[0];
                };
                const adjustedDate = adjustDateForTimezone(startDate);

                setLoading(true);
                const reservationData = {
                    date: adjustedDate,
                    timeSlot: time,
                    email,
                    guests,
                    kids,
                    name,
                    telefon,
                };
                try {
                    const response = await fetch("/api/reservierung", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(reservationData),
                    });

                    if (response.ok) {
                        setLoading(false);
                        setSuccess(true);
                    } else {
                        setLoading(false);
                        setSuccess(false);
                    }
                } catch (error) {
                    console.error("Error:", error);
                    setLoading(false);
                }
            } else {
            }
        }
    };

    const isWeekdayAndFutureDate = (date) => {
        const day = getDay(date);
        const isWeekday = day !== 0 && day !== 6;
        return isWeekday && (isToday(date) || isAfter(date, new Date()));
    };

    return (
        <div className="container mx-auto grid grid-cols-12 font-sans">
            <div className="col-span-12 xl:col-span-6">
                <H2 klasse="mt-4 mb-6 ">Tischreservierung</H2>

                <P klasse="mb-6">
                    Reservieren Sie jetzt Ihren Tisch und sichern Sie sich Ihren Wohlfühlplatz, wo Kaffee und Lächeln
                    auf Sie warten.
                </P>

                <form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                        <>
                            <label
                                htmlFor="date-picker"
                                className="block text-sm lg:text-lg font-semibold font-sans text-textColor mb-1"
                            >
                                Datum auswählen:
                            </label>
                            <div className="relative col-span-12">
                                <DatePicker
                                    id="date-picker"
                                    className="col-span-12 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4 mb-4 w-full"
                                    selected={startDate}
                                    onChange={(date) => {
                                        setStartDate(date);
                                        setTime("");
                                        setGuests("");
                                        setAvailableTimeSlots([]);
                                        setIsFullyBooked(false);
                                        updateAvailableTimeSlots(date);
                                    }}
                                    filterDate={(date) => {
                                        const day = getDay(date);
                                        return day !== 0 && day !== 6;
                                    }}
                                    minDate={new Date()}
                                    locale="de-DE"
                                    placeholderText="Datum auswählen"
                                    dateFormat="dd/MM/yyyy"
                                    dayClassName={(date) =>
                                        isWeekdayAndFutureDate(date) ? "weekday bg-primaryColor-200" : ""
                                    }
                                />

                                <FaChevronDown className="absolute right-4 top-[38%] transform -translate-y-1/2 text-gray-700 pointer-events-none" />
                            </div>
                            {startDate && (
                                <>
                                    <label
                                        htmlFor="guest-number"
                                        className="block text-sm lg:text-lg font-semibold font-sans text-textColor mb-1"
                                    >
                                        Anzahl der Erwachsenen:
                                    </label>
                                    <input
                                        id="guest-number"
                                        className="col-span-6 w-full  mb-4 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                                        type="number"
                                        value={guests}
                                        placeholder="Anzahl der Erwachsenen, z.B. 2"
                                        onChange={(e) => {
                                            const numGuests = e.target.value;
                                            setGuests(numGuests);
                                            setTime("");
                                            if (startDate && numGuests) {
                                                checkAvailability(startDate, numGuests); // Check availability when guests change
                                            }
                                        }}
                                        min="1"
                                        max="25"
                                    />
                                    <label
                                        htmlFor="kids-number"
                                        className="block text-sm lg:text-lg font-semibold font-sans text-textColor mb-1"
                                    >
                                        Anzahl der Kinder:
                                    </label>
                                    <input
                                        id="kids-number"
                                        className="col-span-6 w-full mb-4 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                                        type="number"
                                        value={kids}
                                        placeholder="Anzahl der Kinder, z.B. 1"
                                        onChange={(e) => {
                                            setKids(e.target.value);
                                        }}
                                        min="0"
                                    />
                                </>
                            )}
                            {startDate && guests && availableTimeSlots.length > 0 && (
                                <>
                                    <label
                                        htmlFor="time-select"
                                        className="block text-sm lg:text-lg font-semibold font-sans text-textColor mb-1"
                                    >
                                        Zeitfenster wählen:
                                    </label>
                                    <select
                                        id="time-select"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="col-span-6 w-full  mb-4 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
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
                        </>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <div className="wrapper mb-4">
                                <P>
                                    <strong>Datum:</strong> {startDate.toLocaleDateString("de-DE")}
                                </P>
                                <P>
                                    <strong>Zeitfenster:</strong> {time}
                                </P>
                                <P>
                                    <strong>Anzahl der Erwachsenen:</strong> {guests}
                                </P>
                                <P>
                                    <strong>Anzahl der Kinder:</strong> {kids}
                                </P>
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="col-span-6 w-full  mb-4 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                                required
                            />
                            <input
                                type="tel"
                                value={telefon}
                                onChange={(e) => setTelefon(e.target.value)}
                                placeholder="Telefon"
                                className="col-span-6 w-full  mb-4 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                                required
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="col-span-6 w-full  mb-4 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                                required
                            />
                        </div>
                    )}
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <ClipLoader size={50} color={"#123abc"} loading={loading} />
                        </div>
                    ) : success ? (
                        <div className="w-full col-span-12 sm:mb-8 text-green-500">
                            <p>Ihre Reservierung wurde erfolgreich aufgenommen. Vielen Dank!</p>
                        </div>
                    ) : (
                        <div className="w-full col-span-12 sm:mb-8 flex space-x-2 lg:space-x-4">
                            {currentStep === 2 && (
                                <MainButtonNOLink onClick={handleBack} klasse="bg-textColor mt-4">
                                    Zurück
                                </MainButtonNOLink>
                            )}
                            <MainButtonNOLink
                                disabled={!formIsValid}
                                type="submit"
                                klasse="bg-primaryColor border-2 border-primaryColor mt-4"
                            >
                                {currentStep === 1 ? "Weiter zu Schritt 2" : "Bestätigen"}
                            </MainButtonNOLink>
                        </div>
                    )}
                </form>
            </div>
            <div className="xl:col-span-6 pl-8">
                {image ? (
                    <CoverImage
                        key={"imageresver"}
                        src={urlFor(image).url()}
                        mobileSrc={urlFor(image).url()}
                        alt="Cover Background"
                        className={`w-full z-20 relative rounded-[40px] overflow-hidden aspect-[1/1.5] xl:aspect-[1/1.25]
                    }`}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default CafeReservierung;
