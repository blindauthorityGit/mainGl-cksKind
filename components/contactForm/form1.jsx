import React, { useState, useEffect } from "react";
import MainContainer from "../layout/mainContainer";
import { useForm } from "react-hook-form";
import Error from "./error";
import axios from "axios";
import { Rings } from "react-loader-spinner";

import { MainButton, MainButtonNOLink } from "../buttons";

const Form1 = (props) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    async function onSubmitForm(values) {
        console.log(values, props.bild);
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
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // console.log(props.bild);
    }, []);

    return (
        <MainContainer width=" sm:pt-4 sm:pb-0  relative ">
            <div className="col-span-12  grid grid-cols-12 ">
                <form
                    onSubmit={handleSubmit(onSubmitForm)}
                    className="col-span-12 grid grid-cols-12 footer topKontakt gap-2 sm:gap-4 text-sm sm:text-base"
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

                    <textarea
                        {...register("message", { required: true })}
                        className="col-span-12 text-xs  border-2 font-regular rounded-[20px] border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
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

                    <div className="check col-span-12 mt-2 sm:mt-6 flex ">
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
