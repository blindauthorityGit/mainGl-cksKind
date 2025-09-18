import React, { useState, useEffect } from "react";
import { MainButtonNOLink } from "../../buttons";
import { H2, P } from "../../typography";
import useStore from "../../../store/store";

const StepThree = ({ handleSubmit, handlePrevStep, loading, success, error }) => {
    const formData = useStore((state) => state.formData);
    const updateFormData = useStore((state) => state.updateFormData);

    const [errors, setErrors] = useState({ telefon: "", email: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation functions
    const validateEmail = (value) => {
        const trimmed = value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(trimmed);
    };

    const validateTelefon = (value) => {
        const trimmed = value.trim();
        const phoneRegex = /^[+]?([0-9][ -]?){6,19}[0-9]$/;
        return phoneRegex.test(trimmed);
    };

    // Handlers
    const handleChange = (field) => (e) => {
        const { value } = e.target;
        updateFormData({ [field]: value });

        let valid;
        if (field === "email") valid = validateEmail(value);
        if (field === "telefon") valid = validateTelefon(value);

        setErrors((prev) => ({
            ...prev,
            [field]: valid ? "" : `Ungültiger ${field === "telefon" ? "Telefonnummer" : "E-Mail"}`,
        }));
    };

    const handleBlur = (field) => () => {
        const value = formData[field] || "";
        let valid;
        if (field === "email") valid = validateEmail(value);
        if (field === "telefon") valid = validateTelefon(value);

        setErrors((prev) => ({
            ...prev,
            [field]: valid ? "" : `Ungültige ${field === "telefon" ? "Telefonnummer" : "E-Mail"}`,
        }));
    };

    const isValidForm = formData.name && formData.email && formData.telefon && !errors.email && !errors.telefon;

    const handleNext = () => {
        if (!isValidForm) {
            setErrors({
                telefon: validateTelefon(formData.telefon) ? "" : "Ungültige Telefonnummer",
                email: validateEmail(formData.email) ? "" : "Ungültige E-Mail",
            });
            return;
        }

        // Prevent duplicate submissions
        if (loading || isSubmitting) return;

        setIsSubmitting(true);
        handleSubmit();
    };

    // Reset submitting when loading or success state changes
    useEffect(() => {
        if (!loading) {
            setIsSubmitting(false);
        }
    }, [loading, success]);

    return (
        <div className="flex-grow xl:w-2/4">
            <H2 klasse="mt-4 mb-6">Zusammenfassung </H2>

            <div className="wrapper mb-4">
                <P>
                    <strong>Datum:</strong> {formData.date.toLocaleDateString("de-DE")}
                </P>
                <P>
                    <strong>Zeitfenster:</strong> {formData.timeSlot}
                </P>
                <P>
                    <strong>Anzahl der Erwachsenen:</strong> {formData.guests}
                </P>
                <P>
                    <strong>Anzahl der Kinder:</strong> {formData.kids}
                </P>
            </div>

            <div className="grid grid-cols-6 gap-4 mb-4">
                <div className="col-span-6">
                    <input
                        type="text"
                        value={formData.name || ""}
                        onChange={(e) => updateFormData({ name: e.target.value })}
                        placeholder="Vor- und Nachname"
                        className="w-full text-xs 2xl:text-base border-2 rounded-full p-2 sm:p-4 border-textColor bg-transparent text-textColor placeholder-primaryColor-950"
                        required
                    />
                </div>

                <div className="col-span-6">
                    <input
                        type="tel"
                        value={formData.telefon || ""}
                        onChange={handleChange("telefon")}
                        onBlur={handleBlur("telefon")}
                        placeholder="Telefon"
                        className={`w-full text-xs 2xl:text-base border-2 rounded-full p-2 sm:p-4 ${
                            errors.telefon ? "border-red-500" : "border-textColor"
                        } bg-transparent text-textColor placeholder-primaryColor-950`}
                        required
                    />
                    {errors.telefon && <P klasse="!text-red-500 mt-1">{errors.telefon}</P>}
                </div>

                <div className="col-span-6">
                    <input
                        type="email"
                        value={formData.email || ""}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                        placeholder="E-Mail"
                        className={`w-full text-xs 2xl:text-base border-2 rounded-full p-2 sm:p-4 ${
                            errors.email ? "border-red-500" : "border-textColor"
                        } bg-transparent text-textColor placeholder-primaryColor-950`}
                        required
                    />
                    {errors.email && <P klasse="!text-red-500 mt-1">{errors.email}</P>}
                </div>
            </div>

            <div className="w-full col-span-12 sm:mb-8 absolute flex space-x-2 lg:space-x-4 bottom-0">
                {loading || success ? null : (
                    <>
                        <MainButtonNOLink onClick={handlePrevStep} klasse="bg-textColor mt-4">
                            Zurück
                        </MainButtonNOLink>
                        <MainButtonNOLink
                            disabled={!isValidForm || loading || isSubmitting}
                            onClick={handleNext}
                            klasse="bg-primaryColor border-2 border-primaryColor mt-4"
                        >
                            Bestätigen
                        </MainButtonNOLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default StepThree;
