import React, { useState } from "react";
import { H2, H3, H4, P } from "../typography";
import { MainButtonNOLink } from "../buttons";
import { Rings } from "react-loader-spinner";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState(null); // null, 'success', 'error'

    const validateEmail = (email) => {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailChange = (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);
        setIsEmailValid(validateEmail(emailInput));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submit action
        setSubscriptionStatus("loading");

        try {
            const response = await fetch("/api/newsletterSubscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                // Handle success response
                setSubscriptionStatus("success");

                setEmail(""); // Clear the input field
            } else {
                // Handle non-success response
                setSubscriptionStatus("error");
            }
        } catch (error) {
            console.error("Error submitting the form", error);
            setSubscriptionStatus("error");

            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container mx-auto grid grid-cols-12 font-sans">
            <div className="col-span-12 xl:col-span-6">
                <H2 klasse="mt-4 mb-6">Newsletter abonnieren</H2>
                <P klasse="text-xs text-textColor">
                    Bleib immer auf dem Laufenden über neue Kurse, spannende Events und exklusive Angebote. Trage dich
                    jetzt ein und verpasse keine Neuigkeiten mehr!
                </P>
                <form onSubmit={handleSubmit} className="w-full md:col-span-6 mt-8">
                    <input
                        type="email"
                        placeholder="Deine Email Adresse"
                        className="col-span-12 min-w-[18rem] md:w-2/4 border-2 text-xs rounded-full border-textColor bg-transparent text-textColor placeholder-primaryColor-950 font-sans p-2 sm:p-4"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        disabled={subscriptionStatus === "success"}
                    />
                    {subscriptionStatus === "loading" ? (
                        <div className="flex justify-center mt-4">
                            <Rings height="80" width="80" color="#df3288" radius="6" visible={true} />;
                        </div>
                    ) : subscriptionStatus === "success" ? (
                        <P klasse="text-themeGreen mt-4">
                            Vielen Dank! Bitte schau in dein Postfach um dein Abo zu bestätigen.
                        </P>
                    ) : (
                        <>
                            <MainButtonNOLink
                                klasse={`bg-primaryColor border-2 border-primaryColor mt-8 md:w-2/4 ${
                                    !isEmailValid ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                onClick={handleSubmit}
                                disabled={!isEmailValid || subscriptionStatus === "loading"}
                            >
                                Abonnieren
                            </MainButtonNOLink>
                            {subscriptionStatus === "error" && (
                                <P klasse="text-themeRed mt-4">Subscription failed. Please try again.</P>
                            )}
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
