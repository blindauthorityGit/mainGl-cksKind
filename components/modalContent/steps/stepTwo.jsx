import React, { useState, useEffect } from "react";
import { PaymentForm } from "../../contactForm";
import { H2, H3, H4, P } from "../../typography";
import { Rings } from "react-loader-spinner";

import { StripePaymentComponent } from "../../stripe";

import { MainButtonNOLink } from "../../buttons";

const StepTwo = ({ data, events, formData }) => {
    const [loading, setLoading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'failed', or null

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    let isWorkshop = false;

    const intro = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ut perferendis ratione.";

    useEffect(() => {}, []);

    // Function to handle form submission
    const handleSubmit = async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/anmeldung", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            setLoading(false);

            if (response.ok) {
                setSubmissionStatus("success");

                // Handle success here (e.g., update UI to show a success message)
            } else {
                setSubmissionStatus("failed");

                // Handle failure here (e.g., update UI to show an error message)
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setLoading(false);
            setSubmissionStatus("failed");
            // Handle network errors here (e.g., update UI to show an error message)
        }
    };

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8 font-sans">
            <div className="col-span-12 xl:col-span-6 ">
                <H2 klasse={``}>Zusammenfassung</H2>
                <div className="wrapper mb-4 space-y-2">
                    <div className="flex justify-start items-center">
                        <p className="flex-1 font-bold">Name:</p>
                        <p className="flex-3">{formData.name}</p>
                    </div>
                    <div className="flex justify-start items-center">
                        <p className="flex-1 font-bold">Wohnort:</p>
                        <p className="flex-3">{formData.wohnort}</p>
                    </div>
                    <div className="flex justify-start items-center">
                        <p className="flex-1 font-bold">Email:</p>
                        <p className="flex-3">{formData.email}</p>
                    </div>
                    <div className="flex justify-start items-center">
                        <p className="flex-1 font-bold">Telefon:</p>
                        <p className="flex-3">{formData.phone}</p>
                    </div>
                    {formData.birthDate && (
                        <div className="flex justify-start items-center">
                            <p className="flex-1 font-bold">ET / Geburtsdatum:</p>
                            <p className="flex-3">{formData.birthDate}</p>
                        </div>
                    )}
                    {formData.twins && (
                        <div className="flex justify-start items-center">
                            <p className="flex-1 font-bold">Zwillinge:</p>
                            <p className="flex-3">{formData.twins}</p>
                        </div>
                    )}
                    {formData.siblings && (
                        <div className="flex justify-start items-center">
                            <p className="flex-1 font-bold">Geschwisterkinder:</p>
                            <p className="flex-3">{formData.siblings}</p>
                        </div>
                    )}
                    <div className="flex justify-start items-center">
                        <p className="flex-1 font-bold">Termin:</p>
                        <p className="flex-3">{formData.date}</p>
                    </div>
                </div>

                {/* Checkbox für die Zustimmung */}
                <div className="mb-10 mt-8">
                    <label htmlFor="agreementCheckbox" className="flex items-start">
                        <input
                            type="checkbox"
                            id="agreementCheckbox"
                            checked={isCheckboxChecked}
                            onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                            className="mt-1"
                        />
                        <span className="ml-2">
                            Ich nehme zur Kenntnis, dass MAIN GLÜCKSKIND keine inhaltliche Verantwortung für das
                            gebuchte Kursangebot übernimmt. Vertragspartner für das Kursangebot ist{" "}
                            <strong> {formData.trainer}</strong>
                        </span>
                    </label>
                </div>

                {/* Anmeldebutton */}
                {loading ? (
                    <div className="flex justify-center">
                        <Rings height="80" width="80" color="#df3288" radius="6" visible={true} />
                    </div>
                ) : submissionStatus === "success" ? (
                    <P klasse="!text-green-500">Vielen Dank für Ihre Anmeldung!</P>
                ) : submissionStatus === "failed" ? (
                    <P klasse="!text-red-500">Fehler bei der Anmeldung. Bitte versuchen Sie es später erneut.</P>
                ) : (
                    <MainButtonNOLink
                        klasse={`bg-primaryColor border-2 border-primaryColor mt-4 ${
                            !isCheckboxChecked ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={isCheckboxChecked ? handleSubmit : null}
                        disabled={!isCheckboxChecked} // Deaktiviert den Button, wenn die Checkbox nicht ausgewählt ist
                    >
                        {formData.waitingList ? "In Warteliste eintragen" : "Jetzt anmelden"}
                    </MainButtonNOLink>
                )}
                {/* <StripePaymentComponent
                    description={events.subline}
                    price={Number("10")}
                    title={events.headline}
                ></StripePaymentComponent> */}
            </div>
        </div>
    );
};

export default StepTwo;
