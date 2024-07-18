import React, { useState, useEffect } from "react";
import MainContainer from "../layout/mainContainer";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronDown } from "react-icons/fa"; // St
import Error from "./error";
import axios from "axios";
import { Rings } from "react-loader-spinner";

import { MainButton, MainButtonNOLink } from "../buttons";

const TIME_SLOTS = ["09:30 - 11:30", "11:30 - 13:30"];

const Form1 = (props) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    async function onSubmitForm(values) {
        setLoading(true);
        let config = {
            method: "post",
            url: `/api/contact`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                ...values,
                cafe: props.cafe,
                raum: props.raum,
                kindergeburtstag: props.kindergeburtstag,
            },
        };

        try {
            const response = await axios(config);
            setLoading(false);
            setSuccess(true);
        } catch (err) {}
    }

    useEffect(() => {
        //
    }, []);

    return (
        <MainContainer width=" sm:pt-4 sm:pb-0  relative ">
            <div className="col-span-12  grid grid-cols-12 ">
                <form
                    onSubmit={handleSubmit(onSubmitForm)}
                    className="col-span-12 grid grid-cols-12 footer topKontakt gap-4 sm:gap-4 text-sm sm:text-base"
                    action=""
                >
                    <div className="hidden">
                        <label htmlFor="firstName">Name</label>
                        <input
                            {...register("firstName", { required: false })}
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="off"
                        />
                    </div>
                    <div className="hidden">
                        <label htmlFor="bild" className="font-sans text-blackText-950">
                            Bild
                        </label>
                        <input
                            {...register("bild", { required: false })}
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="off"
                            value={props.bild}
                        />
                    </div>
                    <input
                        {...register("name", { required: true })}
                        id="name"
                        className="col-span-12 border-2 text-xs rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                        type="text"
                        placeholder="Name"
                    />
                    {errors.name && (
                        <Error klasse="col-span-12 text-themeRed text-xs">Bitte geben Sie Ihren vollen Namen an</Error>
                    )}

                    <input
                        {...register("email", { required: true })}
                        name="email"
                        id="email"
                        className="col-span-12 text-xs  border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                        type="email"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <Error klasse="col-span-12 lg:col-span-6 text-themeRed text-xs">
                            Bitte geben Sie Ihre Email an
                        </Error>
                    )}

                    {/* <input
                        {...register("phone", { required: true })}
                        name="phone"
                        id="phone"
                        className="col-span-12 lg:col-span-6 border-b border-primaryColor bg-transparent text-primaryColor-200 placeholder-primaryColor-200 p-4"
                        type="text"
                        placeholder="Telefonnummer"
                    />
                    {errors.phone && (
                        <Error klasse="col-span-12 lg:col-span-6">Bitte geben Sie Ihre Telefonnummer an</Error>
                    )} */}

                    {props.kindergeburtstag && (
                        <>
                            <div className=" items-center space-x-4 col-span-12 grid grid-cols-12">
                                <label
                                    htmlFor="timeSlot"
                                    className="block col-span-4 text-sm lg:text-base font-medium font-sans text-textColor  mb-1"
                                >
                                    Zeitfenster:
                                </label>
                                <select
                                    {...register("timeSlot", { required: props.kindergeburtstag })}
                                    id="timeSlot"
                                    className="col-span-8    text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                                >
                                    <option disabled value="">
                                        Zeitfenster wählen
                                    </option>
                                    {TIME_SLOTS.map((slot, index) => (
                                        <option key={index} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                                {errors.timeSlot && (
                                    <Error klasse="col-span-12 text-themeRed text-xs">
                                        Bitte wählen Sie ein Zeitfenster
                                    </Error>
                                )}
                            </div>
                            <div className=" items-center  space-x-4 col-span-12 grid grid-cols-12">
                                <label
                                    htmlFor="date-picker"
                                    className="block col-span-4 text-sm lg:text-base font-medium font-sans text-textColor  mb-1"
                                >
                                    Datum:
                                </label>
                                <Controller
                                    control={control}
                                    name="date"
                                    rules={{ required: true }} // Fügen Sie hier Ihre Validierungsregeln hinzu
                                    render={({ field }) => (
                                        <div className="relative col-span-8">
                                            <DatePicker
                                                id="date-picker"
                                                className="col-span-12 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4  w-full"
                                                placeholderText="Datum auswählen"
                                                dateFormat="dd/MM/yyyy"
                                                onChange={(date) => field.onChange(date)}
                                                selected={field.value}
                                                locale="de-DE"
                                            />
                                            <FaChevronDown className="absolute right-4 top-[38%] transform -translate-y-1/2 text-gray-700 pointer-events-none" />
                                        </div>
                                    )}
                                />
                                {errors.date && (
                                    <Error klasse="col-span-12 text-themeRed text-xs">Bitte wählen Sie ein Datum</Error>
                                )}
                            </div>
                            <div className="col-span-12 flex space-x-4 items-center">
                                <div className="flex items-center">
                                    <input
                                        {...register("reinigung")}
                                        id="reinigung"
                                        type="checkbox"
                                        className="text-primaryColor"
                                    />
                                    <label
                                        htmlFor="cleaningIncluded"
                                        className="ml-2 font-sans text-xs sm:text-sm text-textColor"
                                    >
                                        inkl. Endreinigung
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        {...register("dekoration")}
                                        id="dekoration"
                                        type="checkbox"
                                        className="text-primaryColor"
                                    />
                                    <label
                                        htmlFor="decorationIncluded"
                                        className="ml-2 font-sans text-xs sm:text-sm text-textColor"
                                    >
                                        inkl. Dekoration
                                    </label>
                                </div>
                            </div>
                        </>
                    )}

                    <textarea
                        {...register("message", { required: true })}
                        className="col-span-12 text-xs   border-2 font-regular rounded-[10px] border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans px-3 py-2 sm:p-4"
                        name="message"
                        id="message"
                        cols="20"
                        rows="4"
                        placeholder="Nachricht"
                    ></textarea>
                    {errors.message && (
                        <Error klasse="block col-span-12 text-themeRed text-xs">
                            Bitte geben Sie Ihre Nachricht an
                        </Error>
                    )}

                    <div className="check col-span-12 mt-2  flex ">
                        <input
                            {...register("checkbox", { required: true })}
                            id="checkbox"
                            className="mr-4 text-primaryColor"
                            type="checkbox"
                        />
                        <label htmlFor="checkbox" className="text-textColor font-sans text-xs sm:text-sm">
                            Ich erlaube Datenverarbeitung für Kontaktaufnahme laut Datenschutzerklärung.
                        </label>
                        {errors.checkbox && (
                            <Error klasse="block col-span-12 text-themeRed text-xs">Bitte bestätigen</Error>
                        )}
                    </div>
                    {loading ? (
                        <div className="w-full col-span-12 flex justify-center">
                            <Rings
                                height="80"
                                width="80"
                                color="#df3288"
                                radius="6"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel="rings-loading"
                            />
                        </div>
                    ) : (
                        <div className="w-full col-span-12 sm:mb-8">
                            <MainButtonNOLink
                                // className="bg-primaryColor-500 text-white mt-6 tracking-widest hover-underline-animation z-20 flex items-center justify-center lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-8"
                                type="submit"
                                klasse="bg-primaryColor border-2 border-primaryColor mt-4"
                            >
                                Absenden
                            </MainButtonNOLink>
                        </div>
                    )}
                </form>
                {success ? (
                    <div className="text-primaryColor text-sm w-96 mt-4">Vielen Dank für Ihre Nachricht!</div>
                ) : (
                    ""
                )}
            </div>
            <div className="col-span-12 lg:col-span-4 grid grid-cols-12">{props.children}</div>
        </MainContainer>
    );
};

export default Form1;
