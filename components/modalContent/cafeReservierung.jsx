import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { H2, H3, H4, P } from "../typography";
import { MainButtonNOLink } from "../buttons";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import de from "date-fns/locale/de"; // Import the German locale
import { isAfter, isToday, getDay } from "date-fns";

import { FaChevronDown } from "react-icons/fa";
import { CoverImage } from "../images";

//FUNCTIONS
import urlFor from "../../functions/urlFor";
import parseDateTime from "../../functions/parseDateTime";

// FIREBASE
import { fetchFirestoreData } from "../../config/firebase";
const TIME_SLOTS = ["09:30 - 11:30", "11:30 - 13:30"];

registerLocale("de", de);
setDefaultLocale("de");

const CafeReservierung = ({ image }) => {
    const [currentStep, setCurrentStep] = useState(1);

    const [startDate, setStartDate] = useState(null);
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(null);

    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [isFullyBooked, setIsFullyBooked] = useState(false);

    const [name, setName] = useState("");
    const [telefon, setTelefon] = useState("");
    const [email, setEmail] = useState("");

    const MAX_CAPACITY = 32;

    // Updated isStep1Complete logic
    const isStep1Complete = startDate && guests && availableTimeSlots.some((slotObj) => slotObj.slot === time);

    // For Step 2
    const isStep2Complete = name && telefon && email;

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

    const handleBack = () => {
        setCurrentStep(1);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (currentStep === 1) {
            if (isStep1Complete) {
                setCurrentStep(2);
            } else {
                console.log("Please fill all fields correctly.");
            }
        } else if (currentStep === 2) {
            if (isStep2Complete) {
                const dateTime = parseDateTime(startDate, time);

                const reservationData = {
                    datum: dateTime,
                    email,
                    guests,
                    name,
                    telefon,
                };
                console.log("Submitting reservation:", reservationData);
                try {
                    const response = await fetch("/api/reservierung", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(reservationData),
                    });

                    if (response.ok) {
                        console.log("Reservation successful");
                        // Handle success...
                    } else {
                        console.log("Reservation failed");
                        // Handle failure...
                    }
                } catch (error) {
                    console.error("Error:", error);
                    // Handle network error...
                }
                // Implement submission logic...
            } else {
                console.log("Please fill all fields correctly.");
            }
        }
    };

    const isWeekdayAndFutureDate = (date) => {
        const day = getDay(date);
        const isWeekday = day !== 0 && day !== 6; // 0 is Sunday, 6 is Saturday

        // Check if the date is today or in the future
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
                                className="block text-lg font-medium font-sans text-textColor mb-1"
                            >
                                Datum auswählen:
                            </label>
                            <div className="relative col-span-12">
                                <DatePicker
                                    id="date-picker"
                                    className="col-span-12  text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4 mb-4 w-full"
                                    selected={startDate}
                                    onChange={(date) => {
                                        setStartDate(date);
                                        setAvailableTimeSlots([]);
                                        setIsFullyBooked(false);
                                    }}
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
                                        className="block text-lg font-medium font-sans text-textColor   mb-1"
                                    >
                                        Anzahl der Gäste:
                                    </label>
                                    <input
                                        id="guest-number"
                                        className="col-span-6 w-full  mb-4 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                                        type="number"
                                        value={guests}
                                        placeHolder="Anzahl der Gäste, z.B. 2"
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
                                    <label
                                        htmlFor="time-select"
                                        className="block text-lg font-medium font-sans text-textColor  mb-1"
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
                                            <option key={index} value={slot}>
                                                {slot} (Verfügbare Plätze: {availableSpaces})
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}
                        </>
                    )}

                    {currentStep === 2 && (
                        <div>
                            {/* Render a summary of the selected date, time, and number of guests */}
                            <div className="wrapper mb-4">
                                <p>
                                    <strong>Datum:</strong> {startDate.toISOString()}
                                </p>
                                <p>
                                    <strong>Zeitfenster:</strong> {time}
                                </p>
                                <p>
                                    <strong>Anzahl der Gäste:</strong> {guests}
                                </p>
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

                    <div className="w-full col-span-12 sm:mb-8 flex space-x-4">
                        {/* Back Button (only shown in step 2) */}
                        {currentStep === 2 && (
                            <MainButtonNOLink onClick={handleBack} klasse="bg-textColor mt-4">
                                Zurück
                            </MainButtonNOLink>
                        )}

                        {/* Submit Button */}
                        <MainButtonNOLink
                            disabled={currentStep === 1 ? !isStep1Complete : !isStep2Complete}
                            type="submit"
                            klasse="bg-primaryColor border-2 border-primaryColor mt-4"
                        >
                            {currentStep === 1 ? "Weiter zu Schritt 2" : "Reservierung bestätigen"}
                        </MainButtonNOLink>
                    </div>
                </form>
            </div>
            <div className="xl:col-span-6 pl-8">
                <CoverImage
                    key={"imageresver"}
                    src={urlFor(image).url()}
                    mobileSrc={urlFor(image).url()}
                    alt="Cover Background"
                    // style={{ aspectRatio: data.image.length > 1 ? "1/2" : "1/1" }}
                    className={`w-full z-20 relative rounded-[40px] overflow-hidden aspect-[1/1.5] xl:aspect-[1/1.25]
                    }`}
                />
            </div>
        </div>
    );
};

export default CafeReservierung;
