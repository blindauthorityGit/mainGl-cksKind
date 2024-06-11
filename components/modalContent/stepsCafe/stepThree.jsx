import React, { useState, useEffect } from "react";
import { MainButtonNOLink } from "../../buttons";
import { H2, P } from "../../typography";
import useStore from "../../../store/store";

const StepThree = ({ handleSubmit, handlePrevStep, loading, success, error }) => {
    const formData = useStore((state) => state.formData);
    const updateFormData = useStore((state) => state.updateFormData);

    const isStepComplete = formData.name && formData.telefon && formData.email;

    const handleNext = () => {
        handleSubmit();
    };

    return (
        <div className="flex-grow xl:w-2/4">
            <H2 klasse="mt-4 mb-6">Zusammenfasung </H2>

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
            <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="Name"
                className="col-span-6 w-full mb-4 text-xs lg:text-base border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                required
            />
            <input
                type="tel"
                value={formData.telefon || ""}
                onChange={(e) => updateFormData({ telefon: e.target.value })}
                placeholder="Telefon"
                className="col-span-6 w-full mb-4 text-xs lg:text-base border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                required
            />
            <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => updateFormData({ email: e.target.value })}
                placeholder="Email"
                className="col-span-6 w-full mb-4 text-xs lg:text-base border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                required
            />
            <div className="w-full col-span-12 sm:mb-8 absolute flex space-x-2 lg:space-x-4 bottom-0">
                {loading || success ? null : (
                    <>
                        <MainButtonNOLink onClick={handlePrevStep} klasse="bg-textColor mt-4">
                            Zurück
                        </MainButtonNOLink>
                        <MainButtonNOLink
                            disabled={!isStepComplete}
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
