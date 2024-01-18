import React, { useState, useEffect } from "react";
import MainContainer from "../layout/mainContainer";
import { useForm } from "react-hook-form";
import Error from "./error";
import axios from "axios";
import { Rings } from "react-loader-spinner";

import { P } from "../typography";

import formatStringToDate from "../../functions/formatStringToDate";

import { MainButtonNOLink } from "../buttons";
import { Calendar } from "../calendar";
import Step2 from "../modalContent/steps/stepTwo";

import useStore from "../../store/store"; // adjust the path as necessary

const AnmeldeForm = ({ data, children, events, intro }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const formData = useStore((state) => state.formData);
    const updateFormData = useStore((state) => state.updateFormData);

    const setModalContent = useStore((state) => state.setModalContent);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        updateFormData({ [name]: value });
    };

    const {
        register,
        trigger,
        formState: { errors },
    } = useForm();

    const validateFormAndProceed = async (e) => {
        e.preventDefault();
        const result = await trigger(); // Triggers validation for all fields
        updateFormData({ kurs: events.headline });
        updateFormData({ sum: events.headline });
        if (result) {
            // If form is valid
            setModalContent(<Step2 data={data} events={events}></Step2>);
            // Here, you can also handle saving the form data to state or context
        }
    };

    async function onSubmitForm(values) {
        console.log(values, props.bild);
        setLoading(true);
        let config = {
            method: "post",
            // url: `http://localhost:3000/api/contact`,
            url: `/api/anmeldung`,
            headers: {
                "Content-Type": "application/json",
            },
            data: values,
        };

        try {
            const response = await axios(config);
            setLoading(false);
            setSuccess(true);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // console.log(props.bild);
        console.log(events, data);
    }, [events]);

    return (
        <MainContainer width=" sm:pt-4 sm:pb-0  relative ">
            <div className="col-span-12 xl:col-span-6  grid grid-cols-12 ">
                <P klasse="col-span-12 mb-6">{intro}</P>
                <form
                    // onSubmit={handleSubmit(onSubmitForm)}
                    className="col-span-12 grid grid-cols-12 footer topKontakt gap-2 sm:gap-2 text-sm sm:text-base"
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
                            onChange={handleInputChange}
                        />
                    </div>
                    <input
                        {...register("name", { required: true })}
                        id="name"
                        className="col-span-12 border-2 text-xs rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                        type="text"
                        placeholder="Ihr Name"
                        onChange={handleInputChange}
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
                        placeholder="Ihre Email"
                        onChange={handleInputChange}
                    />
                    {errors.email && (
                        <Error klasse="col-span-12 lg:col-span-6 text-themeRed text-xs">
                            Bitte geben Sie Ihre Email an
                        </Error>
                    )}

                    <input
                        {...register("phone", { required: true })}
                        onChange={handleInputChange}
                        type="tel"
                        placeholder="Telefon"
                        className="col-span-12 text-xs  border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                    />
                    {errors.phone && (
                        <Error klasse="col-span-12 text-themeRed text-xs">Bitte geben Sie Ihre Telefonnummer an</Error>
                    )}

                    {/* Date Dropdown */}
                    <div className="flex items-center space-x-4 col-span-12">
                        <label
                            htmlFor="date"
                            className="text-xs font-sans text-textColor whitespace-nowrap font-semibold"
                        >
                            Termin wählen
                        </label>
                        <select
                            {...register("date", { required: true })}
                            id="date"
                            className="text-xs w-full border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                        >
                            {data.map((date, index) => (
                                <option key={index} value={date}>
                                    {formatStringToDate(date.startDateTime)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Number of Participants */}
                    {/* <div className="flex">
                        <button type="button" onClick={() => {}}>
                            -
                        </button>
                        <input {...register("participants", { required: true, valueAsNumber: true })} type="number" />
                        <button type="button" onClick={() => {}}>
                            +
                        </button>
                    </div> */}
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

                    <textarea
                        {...register("message", { required: false })}
                        className="col-span-12 text-xs  border-2 font-regular rounded-[20px] border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                        name="message"
                        id="message"
                        cols="20"
                        rows="4"
                        placeholder="Ihre Nachricht"
                        onChange={handleInputChange}
                    ></textarea>
                    {errors.message && (
                        <Error klasse="block col-span-12 text-themeRed text-xs">
                            Bitte geben Sie Ihre Nachricht an
                        </Error>
                    )}

                    <div className="check col-span-12 mt-2 sm:mt-6 flex ">
                        <input
                            {...register("checkbox", { required: true })}
                            id="checkbox"
                            className="mr-4 text-primaryColor"
                            type="checkbox"
                        />
                        <label htmlFor="checkbox" className="text-textColor text-xs sm:text-sm">
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
                                color="#b0ad98"
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
                                klasse="bg-primaryColor border-2 border-primaryColor mt-8"
                                onClick={validateFormAndProceed}
                            >
                                Weiter
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
            <div className="col-span-6">
                <Calendar isSmallCalendar data={Array.isArray(events) ? events : [events]}></Calendar>
            </div>
            <div className="col-span-12 lg:col-span-4 grid grid-cols-12">{children}</div>
        </MainContainer>
    );
};

export default AnmeldeForm;
