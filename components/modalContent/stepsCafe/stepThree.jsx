import React, { useState, useEffect } from "react";
import { MainButtonNOLink } from "../../buttons";
import { H2, P } from "../../typography";
import useStore from "../../../store/store";

const StepThree = ({ handleSubmit, handlePrevStep, loading, success, error, infoContent }) => {
    const formData = useStore((state) => state.formData);
    const updateFormData = useStore((state) => state.updateFormData);

    const [errors, setErrors] = useState({ telefon: "", email: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmedArrival, setConfirmedArrival] = useState(false);

    // Validation
    const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    const validateTelefon = (value) => /^[+]?([0-9][ -]?){6,19}[0-9]$/.test(value.trim());

    // Handlers
    const handleChange = (field) => (e) => {
        const { value } = e.target;
        updateFormData({ [field]: value });

        let valid;
        if (field === "email") valid = validateEmail(value);
        if (field === "telefon") valid = validateTelefon(value);

        setErrors((prev) => ({
            ...prev,
            [field]: valid ? "" : `Ungültige${field === "telefon" ? " Telefonnummer" : " E-Mail"}`,
        }));
    };

    const handleBlur = (field) => () => {
        const value = formData[field] || "";
        let valid;
        if (field === "email") valid = validateEmail(value);
        if (field === "telefon") valid = validateTelefon(value);

        setErrors((prev) => ({
            ...prev,
            [field]: valid ? "" : `Ungültige${field === "telefon" ? " Telefonnummer" : " E-Mail"}`,
        }));
    };

    const isMorningSlot = formData.timeSlot && formData.timeSlot !== "15:00";

    const isValidForm =
        formData.name &&
        formData.email &&
        formData.telefon &&
        !errors.email &&
        !errors.telefon &&
        (!isMorningSlot || confirmedArrival); // Checkbox Pflicht nur bei Morgenslot

    const handleNext = () => {
        if (!isValidForm) {
            setErrors({
                telefon: validateTelefon(formData.telefon) ? "" : "Ungültige Telefonnummer",
                email: validateEmail(formData.email) ? "" : "Ungültige E-Mail",
            });
            return;
        }
        if (loading || isSubmitting) return; // Prevent duplicate
        setIsSubmitting(true);
        handleSubmit();
    };

    useEffect(() => {
        if (!loading) setIsSubmitting(false);
    }, [loading, success]);

    // Default Info-Box Inhalt
    const defaultInfoBox = (
        <div className="border-2 border-textColor rounded-2xl p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-textColor mb-2">Wichtige Hinweise</h3>
            <ul className="list-disc pl-5 text-sm leading-relaxed">
                <li>Reservierungen nur innerhalb der Öffnungszeiten möglich.</li>
                <li>Bitte kommen Sie bis 10:30 Uhr (bei Buchungen am Vormittag)</li>
                <li>Änderungen bitte per Telefon oder E-Mail mitteilen.</li>
            </ul>
        </div>
    );

    return (
        <div className="flex-grow">
            <H2 klasse="mt-4 mb-6">Zusammenfassung </H2>

            {/* 2-spaltiges Layout auf Desktop, einspaltig auf Mobile */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative">
                {/* Linke Spalte: Zusammenfassung + Inputs */}
                <div className="xl:col-span-7 relative pb-32">
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

                    {/* Checkbox nur bei Morgenslots */}
                    {isMorningSlot && (
                        <div className="flex items-center space-x-3 mb-4">
                            <input
                                id="arrival-confirm"
                                type="checkbox"
                                checked={confirmedArrival}
                                onChange={(e) => setConfirmedArrival(e.target.checked)}
                                className="h-5 w-5 border-2 border-textColor rounded accent-primaryColor"
                            />
                            <label htmlFor="arrival-confirm" className="text-sm font-sans text-textColor select-none">
                                Ich bestätige, dass meine Ankunftszeit bis 10:30 Uhr erfolgt.
                            </label>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="w-full col-span-12 sm:mb-8 absolute left-0 right-0 flex space-x-2 lg:space-x-4 bottom-0">
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

                {/* Rechte Spalte: Info-Box */}
                <div className="xl:col-span-5">{infoContent ? infoContent : defaultInfoBox}</div>
            </div>
        </div>
    );
};

export default StepThree;
