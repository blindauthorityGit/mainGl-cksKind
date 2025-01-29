import React, { useState } from "react";
import axios from "axios";

import { P, H2 } from "../typography";
import { CoverImage } from "../images";

// Import icons
import UserIcon from "../../assets/icons/user.svg";
import BabyIcon from "../../assets/icons/baby.svg";
import EmailIcon from "../../assets/icons/email.svg";
import PhoneIcon from "../../assets/icons/phone.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import Anmeldung from "../../assets/pekipKontakt.png";
// import CheckIcon from "../../assets/icons/check.svg";

const PekipAnmeldung = () => {
    const [formData, setFormData] = useState({
        parentName: "",
        babyNameBirthdate: "",
        email: "",
        phone: "",
        preferredDays: "",
        agreement: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Validate form
    const validate = () => {
        let newErrors = {};
        if (!formData.parentName.trim()) newErrors.parentName = "Bitte den Namen der Eltern eingeben.";
        if (!formData.babyNameBirthdate.trim())
            newErrors.babyNameBirthdate = "Bitte Name und Geburtsdatum des Babys eingeben.";
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
        if (!formData.phone.trim() || !/^\+?[\d\s-]{6,}$/.test(formData.phone))
            newErrors.phone = "Bitte eine gültige Telefonnummer eingeben.";
        if (!formData.agreement) newErrors.agreement = "Bitte die Checkbox bestätigen.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setSuccess(false);
        setErrors({});

        try {
            // Replace with your API endpoint
            await axios.post("/api/pekip-anmeldung", formData);
            setSuccess(true);
            setFormData({
                parentName: "",
                babyNameBirthdate: "",
                email: "",
                phone: "",
                preferredDays: "",
                agreement: false,
            });
        } catch (error) {
            setErrors({ form: "Fehler beim Senden des Formulars. Bitte versuchen Sie es erneut." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            id="anmelden"
            className="col-span-12 mt-16 lg:mt-20 lg:mb-12 px-4 md:px-36 bg-yellowColor py-16 2xl:pb-0 2xl:pt-16 font-sans"
        >
            <div className="container mx-auto grid grid-cols-12 lg:px-16">
                <div className="col-span-12">
                    <H2 className="text-center">Jetzt für PEKiP vormerken</H2>
                </div>

                {/* Form */}
                <div className="col-span-12 lg:col-span-6">
                    <form onSubmit={handleSubmit} className=" mx-auto  p-6 rounded-lg ">
                        {/* Input Fields */}
                        {[
                            { label: "Name der Eltern", name: "parentName", icon: UserIcon, type: "text" },
                            {
                                label: "Name und Geburtsdatum des Babys",
                                name: "babyNameBirthdate",
                                icon: BabyIcon,
                                type: "text",
                            },
                            { label: "E-Mail Adresse", name: "email", icon: EmailIcon, type: "email" },
                            { label: "Telefonnummer", name: "phone", icon: PhoneIcon, type: "text" },
                            {
                                label: "Wunsch-Tage und Zeiten (optional)",
                                name: "preferredDays",
                                icon: CalendarIcon,
                                type: "text",
                            },
                        ].map((field, index) => (
                            <div key={index} className="mb-4">
                                <div className="relative flex items-center border bg-white rounded-md p-4">
                                    <img src={field.icon.src} alt="" className="w-7 h-7 mr-3" />
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        placeholder={field.label}
                                        className="w-full outline-none bg-white text-gray-700"
                                    />
                                </div>
                                {errors[field.name] && <P className="text-red-500 text-sm">{errors[field.name]}</P>}
                            </div>
                        ))}

                        {/* Checkbox */}
                        <div className="mb-4 flex items-start">
                            <input
                                type="checkbox"
                                name="agreement"
                                checked={formData.agreement}
                                onChange={handleChange}
                                className="w-5 h-5 mr-3 mt-1"
                            />
                            <label className="text-sm text-gray-700">
                                Ich habe verstanden, dass die Kurszuteilung nach Altersgruppen erfolgt und ein
                                Wunschdatum nicht garantiert werden kann.
                            </label>
                        </div>
                        {errors.agreement && <P className="text-red-500 text-sm">{errors.agreement}</P>}

                        {/* Submit Button or Spinner */}
                        <div className="">
                            {loading ? (
                                <div className="flex justify-center">
                                    <div className="w-6 h-6 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-primaryColor font-semibold text-white py-4 px-24 rounded-md hover:bg-primaryColor-700 transition duration-200"
                                >
                                    abschicken
                                </button>
                            )}
                        </div>

                        {/* Success Message */}
                        {success && <P className="text-green-600 text-center mt-4">Anmeldung erfolgreich gesendet!</P>}

                        {/* General Error Message */}
                        {errors.form && <P className="text-red-500 text-center mt-4">{errors.form}</P>}
                    </form>
                </div>
                <div className="col-span-6 hidden 2xl:block">
                    <CoverImage
                        src={Anmeldung.src} // Replace with the actual path to your image
                        mobileSrc={Anmeldung.src} // Replace with the actual path to your image
                        alt="Cover Background"
                        className={`w-full z-20   lg:block relative rounded-[10px] overflow-hidden  aspect-[957/926] `}
                        priority={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default PekipAnmeldung;
