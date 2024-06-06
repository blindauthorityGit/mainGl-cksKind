import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import formatStringToDate from "../../../functions/formatStringToDate";
import useStore from "../../../store/store"; // Adjust the path as necessary

const PersonalSelection = ({ events, onDateSelect }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const updateFormData = useStore((state) => state.updateFormData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Update form data as before
        updateFormData({ [name]: value });
    };

    return (
        <div className=" items-center  col-span-12 grid grid-cols-12">
            <div className="hidden">
                <label htmlFor="firstName">Name</label>
                <input
                    {...register("firstName", { required: false })}
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="off"
                    onChange={handleInputChange}
                />
            </div>
            <label
                htmlFor="name"
                className="text-xs col-span-12 mb-2 lg:mb-0 lg:col-span-4 font-sans text-textColor whitespace-nowrap font-semibold"
            >
                Dein Name
            </label>
            <input
                {...register("name", { required: true })}
                id="name"
                className="col-span-12 mb-3 border-2 text-xs rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                type="text"
                placeholder="Name"
                onChange={handleInputChange}
            />
            {errors.name && (
                <Error klasse="col-span-12 text-themeRed text-xs">Bitte geben Sie Ihren vollen Namen an</Error>
            )}
            <label
                htmlFor="wohnort"
                className="text-xs col-span-12 mb-2 lg:mb-0 lg:col-span-4 font-sans text-textColor whitespace-nowrap font-semibold"
            >
                Dein Wohnort
            </label>
            <input
                {...register("wohnort", { required: false })}
                onChange={handleInputChange}
                id="wohnort"
                type="text"
                placeholder="Wohnort"
                className="col-span-12 text-xs mb-3  border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
            />
            {errors.phone && <Error klasse="col-span-12 text-themeRed text-xs">Bitte geben Sie Ihren Wohnort an</Error>}
            <label
                htmlFor="email"
                className="text-xs col-span-12 mb-2 lg:mb-0 lg:col-span-4 font-sans text-textColor whitespace-nowrap font-semibold"
            >
                Deine Email
            </label>
            <input
                {...register("email", { required: true })}
                name="email"
                id="email"
                className="col-span-12 text-xs mb-3 border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                type="email"
                placeholder="Ihre Email"
                onChange={handleInputChange}
            />
            {errors.email && (
                <Error klasse="col-span-12 lg:col-span-6 text-themeRed text-xs">Bitte geben Sie Ihre Email an</Error>
            )}
            <label
                htmlFor="telefon"
                className="text-xs col-span-12 mb-2 lg:mb-0 lg:col-span-4 font-sans text-textColor whitespace-nowrap font-semibold"
            >
                Deine Telefonnummer
            </label>
            <input
                {...register("phone", { required: true })}
                onChange={handleInputChange}
                type="tel"
                id="telefon"
                placeholder="Telefon"
                className="col-span-12 text-xs  border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
            />
            {errors.phone && (
                <Error klasse="col-span-12 text-themeRed text-xs">Bitte geben Sie Ihre Telefonnummer an</Error>
            )}
        </div>
    );
};

export default PersonalSelection;
