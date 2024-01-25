import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { H4, P } from "../typography";
import { MainButtonNOLink } from "../buttons";

const CafeReservierung = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [guests, setGuests] = useState(1);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reservationData = { date: startDate, time, guests };

        // Send this data to the backend and handle the response
    };

    return (
        <div className="container mx-auto grid grid-cols-12">
            <div className="col-span-12">
                <H4 klasse="mt-4 mb-6 !text-xl">Reservierung!</H4>

                <form onSubmit={handleSubmit}>
                    <DatePicker
                        className="col-span-12 text-xs  border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy/MM/dd"
                    />
                    <select value={time} onChange={(e) => setTime(e.target.value)}>
                        {/* Generate time slots here */}
                    </select>
                    <input
                        className="col-span-12 text-xs  border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                        type="number"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        min="1"
                        max="32"
                    />
                </form>
                <div className="w-full col-span-12 sm:mb-8">
                    <MainButtonNOLink
                        // className="bg-primaryColor-500 text-white mt-6 tracking-widest hover-underline-animation z-20 flex items-center justify-center lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-8"
                        type="submit"
                        klasse="bg-primaryColor border-2 border-primaryColor mt-4"
                    >
                        Absenden
                    </MainButtonNOLink>
                </div>
            </div>
        </div>
    );
};

export default CafeReservierung;
