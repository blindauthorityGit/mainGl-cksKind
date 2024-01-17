import React, { useEffect } from "react";
import { PaymentForm } from "../../contactForm";
import { H2, H3, H4, P } from "../../typography";

const StepTwo = ({ data, events }) => {
    let isWorkshop = false;

    const intro = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ut perferendis ratione.";

    useEffect(() => {
        console.log(events, data);
    }, [events]);

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <div className="col-span-12 ">
                <H2 klasse={``}>Bezahlung</H2>
                <PaymentForm></PaymentForm>
            </div>
        </div>
    );
};

export default StepTwo;
