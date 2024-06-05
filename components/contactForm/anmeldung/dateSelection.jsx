import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import formatStringToDate from "../../../functions/formatStringToDate";
import useStore from "../../../store/store"; // Adjust the path as necessary

const DateSelection = ({ events, onDateSelect }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [selectedDate, setSelectedDate] = useState("");
    const [isValid, setIsValid] = useState(false);
    const updateFormData = useStore((state) => state.updateFormData);

    useEffect(() => {
        setIsValid(selectedDate !== "");
    }, [selectedDate]);

    const handleDateChange = (e) => {
        // setSelectedDate(e.target.value);
        // setIsValid(e.target.value !== "");
        // onDateSelect(e.target.value);
        console.log(e.target.value);
        updateFormData({ date: e.target.value });
    };

    let dateOptions = [];
    if (events.isBlock && events.blocks && events.blocks.length > 0) {
        dateOptions = events.blocks.map((block) => block.dates[0]);
    } else if (Array.isArray(events.datum)) {
        dateOptions = events.datum;
    }

    const onSubmit = (data) => {
        updateFormData({ date: selectedDate });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" items-center space-x-4 col-span-12 grid grid-cols-12">
                {/* <label
                    htmlFor="date"
                    className="text-xs col-span-4 font-sans text-textColor whitespace-nowrap font-semibold"
                >
                    {events.isBlock ? "Starttermin wählen" : "Termin wählen"}
                </label> */}
                <select
                    {...register("date", { required: true })}
                    id="date"
                    onChange={handleDateChange}
                    className="text-xs col-span-12 border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                    defaultValue=""
                >
                    <option value="" disabled>
                        {events.isBlock ? "Starttermin für Block wählen" : "Kurstermin wählen"}
                    </option>
                    {dateOptions.map((date, index) => (
                        <option key={index} value={formatStringToDate(date.startDateTime)}>
                            {formatStringToDate(date.startDateTime)}
                        </option>
                    ))}
                </select>
                {errors.date && <span className="text-red-500 text-xs">Bitte wählen Sie ein Datum aus</span>}
            </div>
            {/* <button type="submit" disabled={!isValid} className="btn-next">
                Next
            </button> */}
        </form>
    );
};

export default DateSelection;
