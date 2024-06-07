import React, { useState, useEffect } from "react";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import { AnimatePresence, motion } from "framer-motion";
import { MainButtonNOLink } from "../../buttons";
import ClipLoader from "react-spinners/ClipLoader";
import CoverImage from "../../images/CoverImage";
import useStore from "../../../store/store";
import urlFor from "../../../functions/urlFor";

const MultiStepReservation = ({ image }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const formData = useStore((state) => state.formData);
    const updateFormData = useStore((state) => state.updateFormData);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        // Reset formData when the component mounts
        updateFormData({});
    }, [updateFormData]);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const reservationData = {
            ...formData,
            date: formData.date.toISOString().split("T")[0],
        };

        try {
            const response = await fetch("/api/reservierung", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservationData),
            });

            if (response.ok) {
                setLoading(false);
                setSuccess(true);
            } else {
                setLoading(false);
                setSuccess(false);
            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <StepOne handleNextStep={handleNextStep} />;
            case 2:
                return <StepTwo handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />;
            case 3:
                return <StepThree handleSubmit={handleSubmit} handlePrevStep={handlePrevStep} />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto grid-cols-12 font-sans flex-grow flex">
            <div className="col-span-12 xl:col-span-6 flex-grow flex relative">
                <AnimatePresence>{renderStep()}</AnimatePresence>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <ClipLoader size={50} color={"#123abc"} loading={loading} />
                    </div>
                ) : success ? (
                    <div className="w-full col-span-12 sm:mb-8 text-green-500">
                        <p>Ihre Reservierung wurde erfolgreich aufgenommen. Vielen Dank!</p>
                    </div>
                ) : null}
            </div>
            <div className="hidden xl:col-span-6 pl-8">
                {image && (
                    <CoverImage
                        key={"imageresver"}
                        src={urlFor(image).url()}
                        mobileSrc={urlFor(image).url()}
                        alt="Cover Background"
                        className="w-full z-20 relative rounded-[40px] overflow-hidden aspect-[1/1.5] xl:aspect-[1/1.25]"
                    />
                )}
            </div>
        </div>
    );
};

export default MultiStepReservation;
