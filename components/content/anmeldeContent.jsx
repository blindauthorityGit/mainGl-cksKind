import React, { useEffect } from "react";

//TYPO
import { H1, P } from "../typography";

//COMPO
import { MainButtonNOLink } from "../buttons";
import { Anmeldung } from "../modalContent";
import StepOne from "../modalContent/steps/stepOne";

//ASSETS
import Pin from "../../assets/pinPink.svg";
import Phone from "../../assets/phonePink.svg";
import Mail from "../../assets/mailPink.svg";

import useStore from "../../store/store";

const AnmeldeContent = ({ data, events, email, phone, isPekip }) => {
    const setShowModal = useStore((state) => state.setShowModal);
    const setShowOverlay = useStore((state) => state.setShowOverlay);
    const setModalContent = useStore((state) => state.setModalContent);

    useEffect(() => {
        console.log("DAT THE DATA", data, events, events.recurringDates, events.recurringDates?.length > 0);
    }, [data]);

    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    return (
        <div className="col-span-12 px-6 lg:px-48 ">
            <H1 klasse=""> {events.anfrage ? "Anfrage" : "Anmeldung"}</H1>
            <div className="2xl:w-2/4 pt-3 lg:mt-6">
                {/* <P>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo dolores sed temporibus, deleniti
                    accusamus nihil culpa a pariatur rerum doloremque ab natus, itaque fugiat, eius facilis ducimus
                    voluptates nemo explicabo? Quas, veniam quisquam? Asperiores ad iste error reprehenderit.
                    Necessitatibus voluptatem corporis omnis quas inventore temporibus ut quis, ex sed, quos natus.
                    Sequi labore dolor illo, ratione ut molestiae error libero.
                </P> */}
                {events.anfrage ? (
                    <>
                        <P>Hast du Interesse an unserem Kurs?</P>
                        <P klasse="mt-4">
                            Schicke uns eine Anfrage und wir melden uns bei dir sobald es genug Verfügbarkeiten gibt!
                        </P>
                    </>
                ) : null}
            </div>
            <div className="flex mt-10 space-x-12">
                <img src={Pin.src} alt="" />
                <p
                    className="text-sm linker text-textColor sm:text-base font-sans font-[500]  xl:leading-relaxed lg:text-base xl:text-sm 2xl:text-base"
                    dangerouslySetInnerHTML={createMarkup(data.adresse)}
                />{" "}
            </div>
            {/* <div className="flex mt-10 space-x-12">
                <img src={Phone.src} alt="" />
                <P>{data.telefon}</P>
            </div> */}
            <div className="flex mt-10 space-x-12">
                <img src={Mail.src} alt="" />
                <P>
                    {" "}
                    <a href={`mailto:${email}`}></a> {email}
                </P>
            </div>
            <MainButtonNOLink
                klasse={` max-w-[20rem] mt-8 lg:mt-12 bg-primaryColor border-2 border-primaryColor `}
                link={""}
                onClick={() => {
                    setShowOverlay(true);
                    setShowModal(true);
                    setModalContent(
                        <StepOne
                            recurring={events.recurringDates?.length > 0}
                            isPekip={isPekip}
                            data={data}
                            events={events}
                        ></StepOne>
                    );
                    console.log("ANMELDUNG");
                }}
            >
                {events.anfrage ? "Online Anfrage" : "ONLINE ANMELDUNG"}
            </MainButtonNOLink>
        </div>
    );
};

export default AnmeldeContent;
