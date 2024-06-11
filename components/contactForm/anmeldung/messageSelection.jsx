import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useStore from "../../../store/store"; // Adjust the path as necessary

const MessageSelection = () => {
    const formData = useStore((state) => state.formData);
    const updateFormData = useStore((state) => state.updateFormData);
    const { dates } = useStore();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: formData,
    });

    useEffect(() => {
        // Set default values when component mounts
        setValue("message", formData.message || "");
    }, [formData, setValue]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    return (
        <div className="items-center col-span-12 grid grid-cols-12">
            <div className="items-center col-span-12 grid grid-cols-12">
                <label
                    htmlFor="message"
                    className="text-xs lg:text-lg col-span-12 mb-2 font-sans text-textColor whitespace-nowrap font-semibold"
                >
                    Nachricht
                </label>
                <textarea
                    {...register("message", { required: true })}
                    rows="8"
                    cols="50"
                    id="message"
                    name="message"
                    value={formData.message || ""}
                    className="text-xs lg:text-lg border-2 col-span-12 rounded-lg border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                    onChange={handleInputChange}
                />
                {errors.message && (
                    <div className="col-span-12 text-themeRed text-xs">Bitte geben Sie eine Nachricht ein</div>
                )}
            </div>
        </div>
    );
};

export default MessageSelection;
