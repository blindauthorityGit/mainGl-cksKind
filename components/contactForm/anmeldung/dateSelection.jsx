import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import formatStringToDate from "../../../functions/formatStringToDate";
import useStore from "../../../store/store"; // Adjust the path as necessary

const DateSelection = ({ events, onDateSelect }) => {
    const formData = useStore((state) => state.formData);
    const updateFormData = useStore((state) => state.updateFormData);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            date: formData.date || "",
        },
    });

    const [selectedDate, setSelectedDate] = useState(formData.date || "");
    const [isValid, setIsValid] = useState(selectedDate !== "");

    useEffect(() => {
        setIsValid(selectedDate !== "");
    }, [selectedDate]);

    useEffect(() => {
        setValue("date", formData.date || "");
    }, [formData, setValue]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setIsValid(e.target.value !== "");
        onDateSelect(e.target.value);
        updateFormData({ date: e.target.value });
    };

    const currentDate = new Date();

    let dateOptions = [];
    if (events.isBlock && events.blocks && events.blocks.length > 0) {
        dateOptions = events.blocks.map((block, index) => {
            const startDate = new Date(block.dates[0].startDateTime);
            const endDate = new Date(block.dates[block.dates.length - 1].startDateTime);
            const hasFutureDate = block.dates.some((date) => new Date(date.startDateTime) >= currentDate);
            const isBlockDisabled = startDate < currentDate && !block.einstieg;
            const blockOpacity = hasFutureDate ? "" : "opacity-30"; // Adjust opacity based on hasFutureDate

            return {
                startDate: formatStringToDate(block.dates[0].startDateTime),
                endDate: formatStringToDate(block.dates[block.dates.length - 1].startDateTime),
                hasFutureDate,
                isBlockDisabled,
                blockOpacity, // Add this property to control the opacity in the rendering logic
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
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
            <div className="items-center space-x-4 col-span-12 grid grid-cols-12">
                <select
                    {...register("date", { required: true })}
                    id="date"
                    onChange={handleDateChange}
                    className="text-xs lg:text-base col-span-12 border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                    value={selectedDate}
                >
                    <option className="text-sm lg:text-base" value="" disabled>
                        {events.isBlock ? "Block wählen" : "Kurstermin wählen"}
                    </option>
                    {dateOptions.map((date, index) => (
                        <option
                            key={index}
                            value={`${date.startDate} - ${date.endDate}`}
                            disabled={!date.hasFutureDate || date.isBlockDisabled}
                            className={`text-sm my-1 ${
                                !date.hasFutureDate || date.isBlockDisabled ? "!text-[#c1c2c3]" : "font-semibold"
                            } ${date.blockOpacity}`}
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
