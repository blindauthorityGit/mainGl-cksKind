import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { H4, P } from "../../typography";
import { CoverImage } from "../../images";
import urlFor from "../../../functions/urlFor";
import Block from "../../../assets/block.svg";
import Calendar from "../../../assets/calendar.svg";
import Price from "../../../assets/price.svg";
import useStore from "../../../store/store"; // Adjust the path as necessary
import { useForm } from "react-hook-form";
import ChildSelection from "../../contactForm/anmeldung/childSelection";

const StepOneNew = forwardRef(({ data, events, updateFormData }, ref) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm();

    useEffect(() => {}, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        updateFormData({ [name]: value });
    };

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <div className="col-span-12 h-full relative">
                <H4 klasse={`my-4 lg:!text-xl`}>Angaben zu deinem Kind</H4>
            </div>
            <ChildSelection events={events} />
        </div>
    );
});

export default StepOneNew;
