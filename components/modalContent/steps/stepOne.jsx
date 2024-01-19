import React, { useEffect } from "react";

import { H2, H3, H4, P } from "../../typography";

import { AnmeldeForm } from "../../contactForm";

const Anmeldung = ({ data, events }) => {
    let isWorkshop = false;

    const intro = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ut perferendis ratione.";

    useEffect(() => {
        console.log(events, data);
    }, [events]);

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <div className="col-span-12 ">
                <H2 klasse={``}>Anmeldung {events.headline}</H2>

                <AnmeldeForm intro={intro} events={events} data={events.datum}></AnmeldeForm>
            </div>
        </div>
    );
};

export default Anmeldung;