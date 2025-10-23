import React, { useState, useEffect } from "react";
import { MainButtonNOLink } from "../../buttons";
import useStore from "../../../store/store";
import { H2, P } from "../../typography";

const StepOne = ({ handleNextStep }) => {
    const updateFormData = useStore((state) => state.updateFormData);
    const formData = useStore((state) => state.formData);
    const [guests, setGuests] = useState(formData.guests || "");
    const [kids, setKids] = useState(formData.kids || "");

    const isStepComplete = guests && !isNaN(guests);

    const handleNext = () => {
        updateFormData({ guests, kids });
        handleNextStep();
    };

    return (
        <div className="flex-grow 2xl:w-2/4">
            <H2 klasse="mt-4 mb-6">Tischreservierung</H2>
            <P klasse="mb-6">Bitte gib die Anzahl der Erwachsenen und Kinder an.</P>
            <label
                htmlFor="guest-number"
                className="block text-sm 2xl:text-lg font-semibold font-sans text-textColor mb-1"
            >
                Personen über 2 Jahre: :
            </label>
            <input
                id="guest-number"
                className="col-span-6 w-full mb-4 text-xs 2xl:text-base border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                type="number"
                value={guests}
                placeholder="Anzahl Personen"
                onChange={(e) => setGuests(e.target.value)}
                min="1"
                max="25"
            />
            <label
                htmlFor="kids-number"
                className="block text-sm 2xl:text-lg font-semibold font-sans text-textColor mb-1"
            >
                Personen unter 2 Jahre::
            </label>
            <input
                id="kids-number"
                className="col-span-6 w-full mb-4 text-xs 2xl:text-base border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                type="number"
                value={kids}
                placeholder="Anzahl der Personen unter 2, Babies"
                onChange={(e) => setKids(e.target.value)}
                min="0"
            />
            <div className="w-full col-span-12 sm:mb-8 absolute flex space-x-2 lg:space-x-4 bottom-0">
                <MainButtonNOLink
                    disabled={!isStepComplete}
                    onClick={handleNext}
                    klasse="bg-primaryColor border-2 border-primaryColor mt-4"
                >
                    Weiter
                </MainButtonNOLink>
            </div>
        </div>
    );
};

export default StepOne;
