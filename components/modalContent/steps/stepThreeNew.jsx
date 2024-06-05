import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { H4, P } from "../../typography";

import useStore from "../../../store/store"; // Adjust the path as necessary
import { useForm } from "react-hook-form";
import PersonalSelection from "../../contactForm/anmeldung/personalSelection";

const StepThreeNew = forwardRef(({ data, events, updateFormData }, ref) => {
    useEffect(() => {}, []);

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <div className="col-span-12 h-full relative">
                <H4 klasse={`my-4`}>Angaben zu dir</H4>
            </div>
            <PersonalSelection events={events} />
        </div>
    );
});

export default StepThreeNew;
