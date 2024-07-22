import React, { useEffect } from "react";

//COMPO
import { MainButtonNOLink } from "../buttons";

import MultiStepForm from "../modalContent/steps/multiStepForm";
//ASSETS
import Anmelden from "../../assets/anmelden.svg";
import useStore from "../../store/store";
const AnmeldeButton = ({ events, isPekip, data, dates, anfrage }) => {
    const setShowModal = useStore((state) => state.setShowModal);
    const setShowOverlay = useStore((state) => state.setShowOverlay);
    const setModalContent = useStore((state) => state.setModalContent);

    useEffect(() => {}, []);

    return (
        <div>
            <MainButtonNOLink
                klasse={` lg:max-w-[20rem] mt-8 lg:mt-12 bg-primaryColor border-2 border-primaryColor`}
                link={""}
                onClick={() => {
                    setShowOverlay(true);
                    setShowModal(true);
                    setModalContent(
                        <MultiStepForm
                            recurring={events.recurringDates?.length > 0}
                            isPekip={isPekip}
                            data={data}
                            events={events}
                            dates={dates}
                            anfrage={anfrage}
                        ></MultiStepForm>
                    );
                }}
            >
                <img className="inline mr-4" src={Anmelden.src} alt="" />
                {events.anfrage ? "Online Anfrage" : "ONLINE ANMELDUNG"}
            </MainButtonNOLink>
        </div>
    );
};

export default AnmeldeButton;
