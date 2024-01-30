import React, { useState, useEffect } from "react";
import { PaymentForm } from "../../contactForm";
import { H2, H3, H4, P } from "../../typography";
import { Rings } from "react-loader-spinner";

import { StripePaymentComponent } from "../../stripe";

import { MainButtonNOLink } from "../../buttons";

const StepTwo = ({ data, events, formData }) => {
    const [loading, setLoading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'failed', or null

    let isWorkshop = false;

    const intro = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ut perferendis ratione.";

    useEffect(() => {
        console.log(events, data, formData);
    }, [events, data]);

    // Function to handle form submission
    const handleSubmit = async () => {
        console.log(JSON.stringify(formData));
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
                console.log("Form submitted successfully");
                setSubmissionStatus("success");

                // Handle success here (e.g., update UI to show a success message)
            } else {
                console.log("Form submission failed");
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
                <div className="wrapper mb-4">
                    <p>
                        <strong>Name:</strong> {formData.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {formData.email}
                    </p>
                    <p>
                        <strong>Telefon:</strong> {formData.phone}
                    </p>
                    <p>
                        <strong>Termin:</strong> {formData.date}
                    </p>
                </div>
                {loading ? (
                    <div className="flex justify-center">
                        <Rings height="80" width="80" color="#df3288" radius="6" visible={true} />
                    </div>
                ) : submissionStatus === "success" ? (
                    <P klasse="!text-green-500">Vielen Dank für Ihre Anmeldung!</P>
                ) : submissionStatus === "failed" ? (
                    <P klasse="!text-red-500">Fehler bei der Anmeldung. Bitte versuchen Sie es später erneut.</P>
                ) : (
                    <MainButtonNOLink klasse="bg-primaryColor border-2 border-primaryColor mt-4" onClick={handleSubmit}>
                        Jetzt anmelden
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
