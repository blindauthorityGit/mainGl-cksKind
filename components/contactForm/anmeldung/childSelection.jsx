import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import formatStringToDate from "../../../functions/formatStringToDate";
import useStore from "../../../store/store"; // Adjust the path as necessary

const ChildSelection = ({ events, onDateSelect }) => {
    const formData = useStore((state) => state.formData);
    const updateFormData = useStore((state) => state.updateFormData);

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
        setValue("birthDate", formData.birthDate || "");
        setValue("twins", formData.twins || "");
        setValue("siblings", formData.siblings || "");
    }, [formData, setValue]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    return (
        <div className="col-span-12 grid grid-cols-12 lg:gap-6 xl:mb-16">
            <div className=" lg:space-x-4 col-span-12 grid grid-cols-12 mb-3">
                <label
                    htmlFor="birthDate"
                    className="text-xs lg:text-base col-span-12 mb-2 lg:mb-0 lg:col-span-4 font-sans text-textColor whitespace-nowrap font-semibold"
                >
                    ET oder Geburtsdatum
                </label>
                <input
                    {...register("birthDate", { required: true })}
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate || ""}
                    className="text-xs lg:text-base border-2 col-span-12 lg:col-span-8 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                    onChange={handleInputChange}
                />
                {errors.birthDate && (
                    <div className="col-span-12 lg:col-span-4 text-themeRed text-xs">
                        Bitte geben Sie das ET oder Geburtsdatum an
                    </div>
                )}
            </div>
            <div className=" lg:space-x-4 col-span-12 grid grid-cols-12  mb-3">
                <label
                    htmlFor="twins"
                    className="text-xs lg:text-base col-span-12 lg:col-span-4 mb-2 font-sans text-textColor whitespace-nowrap font-semibold"
                >
                    Zwillinge?
                </label>
                <select
                    {...register("twins", { required: true })}
                    id="twins"
                    name="twins"
                    value={formData.twins || ""}
                    className="col-span-12 lg:col-span-8 text-xs lg:text-base border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                    onChange={handleInputChange}
                >
                    <option value="">Bitte wählen</option>
                    <option value="ja">Ja</option>
                    <option value="nein">Nein</option>
                </select>
                {errors.twins && (
                    <div className="col-span-12 text-themeRed text-xs">
                        Bitte auswählen, ob Zwillinge vorhanden sind
                    </div>
                )}
            </div>

            <div className=" lg:space-x-4 col-span-12 grid grid-cols-12  mb-3">
                <label
                    htmlFor="siblings"
                    className="text-xs lg:text-base mb-2 lg:mb-0 col-span-12 lg:col-span-4 font-sans text-textColor whitespace-nowrap font-semibold"
                >
                    Geschwister?
                </label>
                <select
                    {...register("siblings", { required: true })}
                    id="siblings"
                    name="siblings"
                    value={formData.siblings || ""}
                    className="col-span-12 lg:col-span-8 text-xs lg:text-base border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                    onChange={handleInputChange}
                >
                    <option value="">Bitte wählen</option>
                    <option value="ja">Ja</option>
                    <option value="nein">Nein</option>
                </select>
                {errors.siblings && (
                    <div className="col-span-12 text-themeRed text-xs">
                        Bitte angeben, ob Geschwisterkinder vorhanden sind
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChildSelection;
