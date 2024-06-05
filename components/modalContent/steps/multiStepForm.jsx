import React, { useState, useEffect } from "react";
import StepOneNew from "./stepOneNew";
import StepTwoNew from "./stepTwoNew";
import StepThreeNew from "./stepThreeNew";
import StepSummary from "./stepSummary";
import StepThankYou from "./stepThankYou";
import useStore from "../../../store/store"; // Adjust the path as necessary
import { AnimatePresence, motion } from "framer-motion";
import StepIndicator from "./stepIndicator"; // Adjust the path as necessary
import { Rings } from "react-loader-spinner";
import { H2, H3, H4, P } from "../../typography";

//COMPS
import { MainButtonNOLink } from "../../buttons";

const MultiStepForm = ({ data, events, isPekip, recurring }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

    const formData = useStore((state) => state.formData);
    const setFormData = useStore((state) => state.setFormData);
    const updateFormData = useStore((state) => state.updateFormData);

    const [loading, setLoading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'failed', or null

    const [steps, setSteps] = useState(0);

    // Function to handle form submission
    const handleSubmit = async () => {
        console.log(JSON.stringify(formData));
        setLoading(true);

        try {
            const response = await fetch("/api/anmeldung", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            setLoading(false);

            if (response.ok) {
                console.log("Form submitted successfully");
                setSubmissionStatus("success");
                setCurrentStep((prev) => prev + 1); // Move to the Thank You step

                // Handle success here (e.g., update UI to show a success message)
            } else {
                console.log("Form submission failed");
                setSubmissionStatus("failed");

                // Handle failure here (e.g., update UI to show an error message)
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setLoading(false);
            setSubmissionStatus("failed");
            // Handle network errors here (e.g., update UI to show an error message)
        }
    };

    useEffect(() => {
        setFormData({});
        console.log(formData);
        updateFormData({
            kurs: events.headline,
            sum: events.headline,
            trainerEmail: events.eventDetails.partner.email,
            trainer: events.eventDetails.partner.name,
        });
    }, [events]);

    const handleNextStep = () => {
        console.log(formData);
        setDirection(1);
        setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        setDirection(-1);
        setCurrentStep(currentStep - 1);
    };

    const handleDateSelect = (date) => {
        // updateFormData({ date });
        console.log(formData);
        handleNextStep();
    };

    useEffect(() => {
        console.log(currentStep);
    }, [currentStep]);

    useEffect(() => {
        setSteps(4);
    }, []);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <StepOneNew
                        handleNextStep={handleNextStep}
                        data={data}
                        events={events}
                        onDateSelect={handleDateSelect}
                    />
                );
            case 2:
                return (
                    <StepTwoNew
                        data={data}
                        events={events}
                        handleNextStep={handleNextStep}
                        handlePrevStep={handlePrevStep}
                    />
                );
            case 3:
                return <StepThreeNew handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />;
            case 4:
                return <StepSummary handleNextStep={handleSubmit} handlePrevStep={handlePrevStep} />;
            case 5:
                return <StepThankYou />;
            default:
                return null;
        }
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <>
            <div
                className="top h-[6svh] flex items-center justify-start"
                style={
                    {
                        // background: events.kategorie.farbe.value,
                    }
                }
            >
                {currentStep != steps + 1 && <StepIndicator steps={steps} currentStep={currentStep} />}
            </div>
            <div className="multi-step-form">
                {renderStep()}
                <div className="navigation-buttons mt-8 grid grid-cols-2 gap-x-2">
                    {loading ? (
                        <div className="flex justify-center col-span-2">
                            <Rings height="80" width="80" color="#df3288" radius="6" visible={true} />
                        </div>
                    ) : submissionStatus === "success" ? (
                        <P klasse="!text-green-500 col-span-2">Vielen Dank für Ihre Anmeldung!</P>
                    ) : submissionStatus === "failed" ? (
                        <P klasse="!text-red-500 col-span-2">
                            Fehler bei der Anmeldung. Bitte versuchen Sie es später erneut.
                        </P>
                    ) : (
                        <>
                            {currentStep > 1 && currentStep != steps + 1 && (
                                <MainButtonNOLink
                                    onClick={handlePrevStep}
                                    klasse="text-textColor border border-textColor border-1"
                                >
                                    Zurück
                                </MainButtonNOLink>
                            )}
                            {currentStep === steps + 1 && (
                                <MainButtonNOLink onClick={handlePrevStep} klasse="bg-primaryColor col-span-2">
                                    Jetzt Bewerten
                                </MainButtonNOLink>
                            )}
                            {currentStep < steps ? (
                                <MainButtonNOLink
                                    onClick={handleNextStep}
                                    klasse={`bg-primaryColor ${currentStep === 1 ? "col-span-2" : ""}`}
                                >
                                    Weiter
                                </MainButtonNOLink>
                            ) : (
                                currentStep != steps + 1 && (
                                    <MainButtonNOLink onClick={handleSubmit} klasse="bg-themeGreen !text-white">
                                        Anmelden
                                    </MainButtonNOLink>
                                )
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default MultiStepForm;
