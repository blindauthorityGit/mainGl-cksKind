import React from "react";

const StepIndicator = ({ steps, currentStep }) => {
    return (
        <>
            <div className="flex justify-start  text-sans">
                {Array.from({ length: steps }, (_, index) => (
                    <div
                        key={index}
                        className={`w-4 h-4 flex text-xs items-center justify-center rounded-full mr-6 ${
                            currentStep === index + 1 || currentStep > index
                                ? "bg-primaryColor text-white"
                                : "bg-primaryColor-100 text-textColor"
                        }`}
                    >
                        {/* {index + 1} */}
                    </div>
                ))}{" "}
            </div>{" "}
            <hr />
        </>
    );
};

export default StepIndicator;
