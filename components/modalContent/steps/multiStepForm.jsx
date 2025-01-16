import React, { useState, useEffect } from "react";
import StepOneNew from "./stepOneNew";
import StepTwoNew from "./stepTwoNew";
import StepThreeNew from "./stepThreeNew";
import StepFourNew from "./stepFourNew";
import StepSummary from "./stepSummary";
import StepThankYou from "./stepThankYou";
import useStore from "../../../store/store"; // Adjust the path as necessary
import { AnimatePresence, motion } from "framer-motion";
import StepIndicator from "./stepIndicator"; // Adjust the path as necessary
import { Rings } from "react-loader-spinner";
import { H2, H3, H4, P } from "../../typography";

//COMPS
import { MainButton, MainButtonNOLink } from "../../buttons";
import getValidationRules from "./getValidationRules";

const MultiStepForm = ({ data, events, isPekip, recurring, anfrage }) => {
    const [currentCategory, setCurrentCategory] = useState(null);

    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

    const formData = useStore((state) => state.formData);
    const setFormData = useStore((state) => state.setFormData);
    const updateFormData = useStore((state) => state.updateFormData);

    const [loading, setLoading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'failed', or null

    const [steps, setSteps] = useState(0);

    const [isStepValid, setIsStepValid] = useState(false); // Track the validity of the current step

    //SET CATEGORY
    useEffect(() => {
        setCurrentCategory(events.kategorie.name);
    }, [events]);

    console.log("DAT DATA", data, events, isPekip, recurring, anfrage);

    useEffect(() => {
        // Validate the current step whenever formData or currentStep changes
        setIsStepValid(false);
        const validate = getValidationRules(events.kategorie.name, currentStep)(formData);
        //IF PEKIP FIRST STEP IS VALID
        if (events.slug.current.includes("pekip") && currentStep == 1) {
            setIsStepValid(true);
        }
        if (events.recurringDates && currentStep == 1) {
            setIsStepValid(true);
        }

        if (validate) {
            setIsStepValid(true);
        }
    }, [formData, currentStep, events.kategorie.name]);

    // Function to handle form submission
    const handleSubmit = async () => {
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
                setSubmissionStatus("success");

                setCurrentStep(currentStep + 1);

                // Handle success here (e.g., update UI to show a success message)
            } else {
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
        updateFormData({
            kurs: events.headline,
            sum: events.headline,
            trainerEmail: events.eventDetails.partner.email,
            trainer: events.eventDetails.partner.name,
            isPekip: events.slug.current.includes("pekip"),
        });
    }, [events]);

    const handleNextStep = () => {
        const isValid = getValidationRules(currentCategory, currentStep)(formData);

        if (events.slug.current.includes("pekip") && currentStep == 1) {
            setDirection(1);
            setCurrentStep(currentStep + 1);
        }
        if (events.recurringDates && currentStep == 1) {
            setDirection(1);
            setCurrentStep(currentStep + 1);
        }
        if (isValid) {
            setDirection(1);
            setCurrentStep(currentStep + 1);
        } else {
            // Handle invalid form data (e.g., show an error message)
        }
    };

    const handlePrevStep = () => {
        setDirection(-1);
        setCurrentStep(currentStep - 1);
    };

    useEffect(() => {
        setSteps(events.kategorie.name == "Baby & Kleinkind" ? 5 : 4);
    }, [events]);

    const renderStep = () => {
        switch (events.kategorie.name) {
            case "Baby & Kleinkind":
                switch (currentStep) {
                    case 1:
                        return (
                            <StepOneNew
                                handleNextStep={handleNextStep}
                                data={data}
                                events={events}
                                isPekip={events.slug.current.includes("pekip")}
                                anfrage={anfrage}
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
                        return (
                            <StepFourNew
                                events={events}
                                handleNextStep={handleNextStep}
                                handlePrevStep={handlePrevStep}
                                isPekip={events.slug.current.includes("pekip")}
                            />
                        );
                    case 5:
                        return <StepSummary handleNextStep={handleSubmit} handlePrevStep={handlePrevStep} />;

                    case 6:
                        return <StepThankYou />;
                    default:
                        return null;
                }
            default:
                switch (currentStep) {
                    case 1:
                        return (
                            <StepOneNew
                                handleNextStep={handleNextStep}
                                data={data}
                                events={events}
                                isPekip={events.slug.current.includes("pekip")}
                                anfrage={anfrage}
                            />
                        );
                    case 2:
                        return <StepThreeNew handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />;
                    case 3:
                        return (
                            <StepFourNew
                                events={events}
                                handleNextStep={handleNextStep}
                                handlePrevStep={handlePrevStep}
                                isPekip={events.slug.current.includes("pekip")}
                            />
                        );
                    case 4:
                        return <StepSummary handleNextStep={handleSubmit} handlePrevStep={handlePrevStep} />;
                    case 5:
                        return <StepThankYou />;
                    default:
                        return null;
                }
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
            <div className="top h-[1svh] flex items-center justify-start">
                {currentStep != steps + 1 && <StepIndicator steps={steps} currentStep={currentStep} />}
            </div>
            <div className="multi-step-form flex-grow flex flex-col lg:w-[60%]">
                {renderStep()}
                <div className="navigation-buttons mt-auto grid grid-cols-2 gap-x-2 l">
                    {loading ? (
                        <div className="flex justify-center col-span-2">
                            <Rings height="80" width="80" color="#df3288" radius="6" visible={true} />
                        </div>
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
                                <MainButton
                                    link="https://g.page/r/CYHG1TcTsB2pEB0/review"
                                    aklass="col-span-2"
                                    klasse="bg-primaryColor "
                                >
                                    Jetzt Bewerten
                                </MainButton>
                            )}
                            {currentStep < steps ? (
                                <MainButtonNOLink
                                    disabled={!isStepValid}
                                    onClick={handleNextStep}
                                    klasse={`bg-primaryColor ${currentStep === 1 ? "col-span-2" : ""}`}
                                >
                                    Weiter
                                </MainButtonNOLink>
                            ) : (
                                currentStep != steps + 1 && (
                                    <MainButtonNOLink onClick={handleSubmit} klasse="bg-themeGreen !text-white">
                                        {events.slug.current.includes("pekip") ? "Anfragen" : "Anmelden"}
                                    </MainButtonNOLink>
                                )
                            )}
                        </>
                    )}
                </div>
            </div>{" "}
        </>
    );
};

export default MultiStepForm;
