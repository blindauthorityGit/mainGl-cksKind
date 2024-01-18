import React, { useEffect } from "react";
import { PaymentForm } from "../../contactForm";
import { H2, H3, H4, P } from "../../typography";

import { StripePaymentComponent } from "../../stripe";

const StepTwo = ({ data, events }) => {
    let isWorkshop = false;

    const intro = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ut perferendis ratione.";

    useEffect(() => {
        console.log(events, data);
    }, [events, data]);

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <div className="col-span-12 ">
                <H2 klasse={``}>Bezahlung</H2>
                <StripePaymentComponent
                    description={events.subline}
                    price={Number("10")}
                    title={events.headline}
                ></StripePaymentComponent>
            </div>
        </div>
    );
};

export default StepTwo;
