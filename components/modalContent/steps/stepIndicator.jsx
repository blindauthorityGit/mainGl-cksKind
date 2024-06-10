import React, { useEffect, useState } from "react";

const StepIndicator = ({ steps, currentStep }) => {
    const [lineWidth, setLineWidth] = useState(0);
    const [lineColor, setLineColor] = useState("bg-primaryColor");

    useEffect(() => {
        // Calculate the width of the line based on the current step
        if (steps > 1) {
            const stepPercentage = (currentStep - 1) / (steps - 1);
            setLineWidth(stepPercentage * 100);
        }

        // Change the line color when the last step is reached
        if (currentStep === steps) {
            setLineColor("bg-themeGreen");
        } else {
            setLineColor("bg-primaryColor");
        }
    }, [currentStep, steps]);

    return (
        <div className="flex items-center w-full relative">
            <div className="absolute top-1/2 left-0 h-0.5 bg-primaryColor-100 w-full"></div>
            <div
                className={`absolute top-1/2 left-0 h-0.5 transition-all duration-500 ease-in-out ${lineColor}`}
                style={{ width: `${lineWidth}%` }}
            ></div>
        </div>
    );
};

export default StepIndicator;
