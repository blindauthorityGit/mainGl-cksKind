import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import formatStringToDate from "../../../functions/formatStringToDate";
import useStore from "../../../store/store"; // Adjust the path as necessary

const ProductSelection = ({ events, onDateSelect }) => {
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
        setIsValid(e.target.value !== "");
        updateFormData({ produkte: e.target.value });
    };

    return (
        <form className="mb-8">
            <div className="items-center space-x-4 col-span-12 grid grid-cols-12">
                <select
                    {...register("date", { required: true })}
                    id="date"
                    onChange={handleDateChange}
                    className="text-xs lg:text-base col-span-12 border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                    value={selectedDate}
                >
                    <option className="text-sm lg:text-base" value="" disabled>
                        Produkt wählen
                    </option>
                    {events.produkte.map((date, index) => (
                        <option
                            key={index}
                            value={`${date.startDate} - ${date.endDate}`}
                            className={`text-sm my-1 ${date.hasFutureDate ? "font-semibold" : "!opacity-10"}`}
                        >
                            {`${date.title}`}
                        </option>
                    ))}
                </select>
                {errors.date && <span className="text-red-500 text-xs">Bitte wählen Sie ein Datum aus</span>}
            </div>
        </form>
    );
};

export default ProductSelection;
