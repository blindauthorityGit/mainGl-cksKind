import React, { useState, useEffect } from "react";
import { MainButtonNOLink } from "../../buttons";
import useStore from "../../../store/store";
import { H2, P } from "../../typography";

const StepOne = ({ handleNextStep, handlePrevStep }) => {
    const updateFormData = useStore((state) => state.updateFormData);
    const formData = useStore((state) => state.formData);
    const [cleaning, setCleaning] = useState(formData.cleaning || "");
    const [deko, setDeko] = useState(formData.deko || "");
    const [message, setMessage] = useState(formData.message || ""); // Added state for message

    const handleNext = () => {
        updateFormData({ cleaning, deko, message });
        handleNextStep();
    };

    // Handle change for cleaning checkbox
    const handleCleaningChange = () => {
        setCleaning(!cleaning);
    };

    // Handle change for deko checkbox
    const handleDekoChange = () => {
        setDeko(!deko);
    };

    // Handle change for message textarea
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <div className="flex-grow 2xl:w-2/4">
            <H2 klasse="mt-4 mb-6">Leistungen</H2>
            <P klasse="mb-6">Gib deine gewünschten Leistungen an, oder frage uns einfach was möglich ist.</P>

            <div className="col-span-12  items-center ">
                <div className="flex items-center w-full">
                    <input
                        checked={cleaning}
                        id="reinigung"
                        type="checkbox"
                        className="text-primaryColor"
                        onChange={handleCleaningChange} // Set onChange handler
                    />
                    <label htmlFor="reinigung" className="ml-2 font-sans text-base sm:text-sm text-textColor">
                        inkl. Endreinigung
                    </label>
                </div>
                <div className="flex items-center w-full">
                    <input
                        checked={deko}
                        id="dekoration"
                        type="checkbox"
                        className="text-primaryColor"
                        onChange={handleDekoChange} // Set onChange handler
                    />
                    <label htmlFor="dekoration" className="ml-2 font-sans text-base sm:text-sm text-textColor">
                        inkl. Dekoration
                    </label>
                </div>
            </div>

            <textarea
                className="col-span-12 w-full mt-6 text-base border-2 font-regular rounded-[10px] border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans px-3 py-2 sm:p-4"
                name="message"
                id="message"
                cols="20"
                rows="5"
                placeholder="Nachricht"
                value={message} // Set value to message state
                onChange={handleMessageChange} // Set onChange handler
            ></textarea>
            <div className="w-full col-span-12 sm:mb-8 absolute flex space-x-2 lg:space-x-4 bottom-0">
                <MainButtonNOLink onClick={handlePrevStep} klasse="bg-textColor mt-4">
                    Zurück
                </MainButtonNOLink>

                <MainButtonNOLink
                    disabled={false}
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
