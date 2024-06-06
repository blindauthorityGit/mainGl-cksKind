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
        setSelectedDate(e.target.value);
        setIsValid(e.target.value !== "");
        onDateSelect(e.target.value);
        updateFormData({ date: e.target.value });
    };

    const currentDate = new Date();

    let dateOptions = [];
    if (events.isBlock && events.blocks && events.blocks.length > 0) {
        // Extract start and end dates for each block
        dateOptions = events.blocks.map((block, index) => {
            const startDate = new Date(block.dates[0].startDateTime);
            const endDate = new Date(block.dates[block.dates.length - 1].startDateTime);
            const hasFutureDate = block.dates.some((date) => new Date(date.startDateTime) >= currentDate);
            return {
                startDate: formatStringToDate(block.dates[0].startDateTime),
                endDate: formatStringToDate(block.dates[block.dates.length - 1].startDateTime),
                hasFutureDate,
            };
        });
    } else if (Array.isArray(events.datum)) {
        dateOptions = events.datum.map((date, index) => {
            const startDate = new Date(date.startDateTime);
            const endDate = new Date(date.endDateTime);
            const hasFutureDate = new Date(date.startDateTime) >= currentDate;
            return {
                startDate: formatStringToDate(date.startDateTime),
                endDate: formatStringToDate(date.endDateTime),
                hasFutureDate,
            };
        });
    }

    const onSubmit = (data) => {
        updateFormData({ date: selectedDate });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="items-center space-x-4 col-span-12 grid grid-cols-12">
                <select
                    {...register("date", { required: true })}
                    id="date"
                    onChange={handleDateChange}
                    className="text-xs col-span-12 border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                    defaultValue=""
                >
                    <option className="text-sm" value="" disabled>
                        {events.isBlock ? "Block wählen" : "Kurstermin wählen"}
                    </option>
                    {dateOptions.map((date, index) => (
                        <option
                            key={index}
                            value={`${date.startDate} - ${date.endDate}`}
                            disabled={!date.hasFutureDate}
                            // style={{ opacity: date.hasFutureDate ? null : "0.3" }}
                            className={`text-sm my-1 ${date.hasFutureDate ? "font-semibold" : "!opacity-10"}`}
                        >
                            {`${date.startDate} - ${date.endDate}`}
                        </option>
                    ))}
                </select>
                {errors.date && <span className="text-red-500 text-xs">Bitte wählen Sie ein Datum aus</span>}
            </div>
        </form>
    );
};

export default DateSelection;
