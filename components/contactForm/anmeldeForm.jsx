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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import useStore from "../../store/store"; // adjust the path as necessary

const AnmeldeForm = ({ data, children, events, intro, kategorie, isPekip, recurring }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [waitingList, setWaitingList] = useState(false);

    const formData = useStore((state) => state.formData);
    const setFormData = useStore((state) => state.setFormData);
    const updateFormData = useStore((state) => state.updateFormData);

    const setModalContent = useStore((state) => state.setModalContent);

    const [birthDate, setBirthDate] = useState(new Date());

    let dateOptions = [];
    if (events.isBlock && events.blocks && events.blocks.length > 0) {
        // Event has blocks: Use the first date from each block
        dateOptions = events.blocks.map((block) => block.dates[0]);
    } else if (Array.isArray(events.datum)) {
        // No blocks: Use all dates in the datum array
        dateOptions = events.datum;
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Update form data as before
        updateFormData({ [name]: value });

        // Additional logic for warteliste check
        if (name === "date") {
            // Find the selected date or block based on value
            let selectedOption;
            if (events.isBlock) {
                // Assuming each date's value is unique across all blocks
                events.blocks.forEach((block) => {
                    if (block.warteliste) {
                        setWaitingList(true);
                    }
                });
            } else {
                setWaitingList(false);

                // Handle non-block events if necessary, depending on your data structure
            }
        }
    };

    const {
        register,
        trigger,
        formState: { errors },
    } = useForm();

    const validateFormAndProceed = async (e) => {
        e.preventDefault();
        const result = await trigger(); // Triggers validation for all fields
        // updateFormData({ kurs: events.headline });
        // updateFormData({ sum: events.headline });
        // updateFormData({ trainerEmail: events.eventDetails.partner.email });

        if (result) {
            // If form is valid
            setModalContent(<Step2 data={data} formData={formData} events={events}></Step2>);
            // Here, you can also handle saving the form data to state or context
        }
    };

    async function onSubmitForm(values) {
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
        setFormData({});
        console.log(formData);
        updateFormData({
            kurs: events.headline,
            sum: events.headline,
            trainerEmail: events.eventDetails.partner.email,
            trainer: events.eventDetails.partner.name,
        });
    }, [events]);

    useEffect(() => {
        console.log(data);
        console.log("IS PEKIP?", isPekip);
        console.log("IS RECURRIUNG?", recurring);
    }, []);

    useEffect(() => {
        // This function is called when the component mounts or when waitingList updates.
        updateFormData({
            waitingList: waitingList,
        });

        // Cleanup function to be called on component unmount or before the effect runs again.
        return () => {
            // Assuming updateFormData can be used to remove or reset the waitingList data,
            // or you might have a different function/method to clear or reset form data.
            updateFormData({
                waitingList: null, // Set to null, undefined, or any initial state you prefer
            });
        };
    }, [waitingList]); // Dependency array ensures this effect runs when waitingList changes.

    const shouldShowBirthDateField =
        events.kategorie.name === "Baby & Kleinkind" || events.headline.includes("Rückbildung");

    const shouldShowBabyFields = events.kategorie.name === "Baby & Kleinkind";

    return (
        <MainContainer width=" sm:pt-4 sm:pb-0  relative ">
            <div className="col-span-12 xl:col-span-6  grid grid-cols-12 ">
                {/* <P klasse="col-span-12 mb-6">{intro}</P> */}
                <form
                    // onSubmit={handleSubmit(onSubmitForm)}
                    className="col-span-12 grid grid-cols-12 footer topKontakt gap-4 sm:gap-2 text-sm sm:text-base"
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
                        {...register("wohnort", { required: false })}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Wohnort"
                        className="col-span-12 text-xs  border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                    />
                    {errors.phone && (
                        <Error klasse="col-span-12 text-themeRed text-xs">Bitte geben Sie Ihren Wohnort an</Error>
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
                    {shouldShowBirthDateField && (
                        <div className=" items-center lg:space-x-4 col-span-12 grid grid-cols-12">
                            <label
                                htmlFor="birthDate"
                                className="text-xs col-span-12 mb-2 lg:mb-0 lg:col-span-4 font-sans text-textColor whitespace-nowrap font-semibold"
                            >
                                ET oder Geburtsdatum
                            </label>
                            <input
                                {...register("birthDate", { required: shouldShowBirthDateField })}
                                id="birthDate"
                                name="birthDate"
                                type="date"
                                className="text-xs 
                                 border-2  col-span-12 lg:col-span-8 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                                onChange={handleInputChange}
                            />
                            {errors.birthDate && (
                                <Error klasse="col-span-12 text-themeRed text-xs">
                                    Bitte geben Sie das ET oder Geburtsdatum an
                                </Error>
                            )}
                        </div>
                    )}
                    {shouldShowBabyFields && (
                        <div className=" items-center space-x-4 col-span-12 grid grid-cols-12">
                            <label
                                htmlFor="twins"
                                className="text-xs col-span-4  font-sans text-textColor whitespace-nowrap font-semibold"
                            >
                                Zwillinge?
                            </label>
                            <select
                                {...register("twins", { required: shouldShowBabyFields })}
                                id="twins"
                                name="twins"
                                className="col-span-8 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                                onChange={handleInputChange}
                            >
                                <option value="">Bitte wählen</option>
                                <option value="ja">Ja</option>
                                <option value="nein">Nein</option>
                            </select>
                            {errors.twins && (
                                <Error klasse="col-span-12 text-themeRed text-xs">
                                    Bitte auswählen, ob Zwillinge vorhanden sind
                                </Error>
                            )}
                        </div>
                    )}

                    {shouldShowBabyFields && (
                        <div className=" items-center lg:space-x-4 col-span-12 grid grid-cols-12">
                            <label
                                htmlFor="siblings"
                                className="text-xs mb-2 lg:mb-0 col-span-12 lg:col-span-4 font-sans text-textColor whitespace-nowrap font-semibold"
                            >
                                Geschwister?
                            </label>
                            <select
                                {...register("siblings", { required: shouldShowBabyFields })}
                                id="siblings"
                                name="siblings"
                                className="col-span-12 lg:col-span-8 text-xs border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                                onChange={handleInputChange}
                            >
                                <option value="">Bitte wählen</option>
                                <option value="ja">Ja</option>
                                <option value="nein">Nein</option>
                            </select>
                            {errors.siblings && (
                                <Error klasse="col-span-12 text-themeRed text-xs">
                                    Bitte angeben, ob Geschwisterkinder vorhanden sind
                                </Error>
                            )}
                        </div>
                    )}

                    {/* Date Dropdown */}
                    {!isPekip && !recurring && (
                        <div className=" items-center space-x-4 col-span-12 grid grid-cols-12">
                            <label
                                htmlFor="date"
                                className="text-xs col-span-4 font-sans text-textColor whitespace-nowrap font-semibold"
                            >
                                {events.isBlock ? "Starttermin wählen" : "Termin wählen"}
                            </label>
                            <select
                                {...register("date", { required: true })}
                                id="date"
                                onChange={handleInputChange}
                                className="text-xs col-span-8 border-2 rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                                defaultValue="" // Set the default value to an empty string
                            >
                                {/* Add this line */}
                                <option value="" disabled>
                                    {events.isBlock ? "Starttermin für Block wählen" : "Kurstermin wählen"}
                                </option>
                                {dateOptions.map((date, index) => (
                                    <option key={index} value={formatStringToDate(date.startDateTime)}>
                                        {formatStringToDate(date.startDateTime)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
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

                    {/* <div className="check col-span-12 mt-2 sm:mt-6 flex ">
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
                    </div> */}
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
                {waitingList ? (
                    <P klasse="font-bold col-span-12 text-green-500">
                        Sie können sich für diesen Kurs auf unsere Warteliste setzen lassen
                    </P>
                ) : null}
                {success ? (
                    <div className="text-primaryColor text-sm w-96 mt-4">Vielen Dank für Ihre Nachricht!</div>
                ) : (
                    ""
                )}
            </div>
            <div className="hidden lg:block col-span-6">
                <Calendar isSmallCalendar data={Array.isArray(events) ? events : [events]}></Calendar>
            </div>
            <div className="col-span-12 lg:col-span-4 grid grid-cols-12">{children}</div>
        </MainContainer>
    );
};

export default AnmeldeForm;
