import { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

// COMPS
import Overlay from "../overlay";
import ModalMobile from "../modal/modalMobile";
import { Opening, Contact, Öffnungszeiten, CafeReservierung } from "../modalContent";
import { AiOutlineClockCircle } from "react-icons/ai";

//ASSETS
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import Programm from "../../assets/programm.svg";
import Zeiten from "../../assets/zeiten.svg";

const MobileBar = (props) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showOpening, setShowOpening] = useState(false);
    const [showReserve, setShowReserve] = useState(false);

    return (
        <>
            {showOverlay ? (
                <>
                    <ModalMobile
                        onClick={() => {
                            setShowOverlay(false);
                        }}
                    >
                        {showOpening && <Öffnungszeiten data={props.data} />}
                        {showContact && <Contact />}
                        {showReserve && <CafeReservierung />}
                    </ModalMobile>
                    <Overlay
                        onClick={() => {
                            setShowOverlay(false);
                        }}
                    />
                </>
            ) : null}
            <div className="fixed lg:hidden  z-50 bottom-0 w-full flex justify-center items-center bg-textColor text-sm ">
                <a
                    onClick={() => {
                        setShowOverlay((showOverlay) => !showOverlay);
                        setShowContact(false);
                        setShowOpening(true);
                    }}
                    className="w-1/3 p-3 flex border-r border-opacity-30 border-primaryColor-200 flex-col justify-center items-center text-primaryColor-50 hover:text-primaryColor"
                >
                    <img className="h-[1.35rem] md:h-10" src={Phone.src} alt="" />
                    <span className="text-xs md:text-base mt-1">Anruf</span>
                </a>
                <a
                    onClick={() => {
                        setShowOverlay((showOverlay) => !showOverlay);
                        setShowContact(false);
                        setShowOpening(true);
                        setShowReserve(false);
                    }}
                    className="w-1/3 p-3 flex flex-col border-r border-primaryColor-200 border-opacity-30  justify-center items-center text-primaryColor-50 hover:text-primaryColor"
                >
                    <img className="h-[1.35rem] md:h-10" src={Zeiten.src} alt="" />
                    <span className="text-xs md:text-base font-base mt-1">Zeiten</span>
                </a>
                <a
                    className="w-1/3 p-3 border-r bg-primaryColor-600 border-primaryColor-200 border-opacity-30 flex flex-col justify-center items-center text-primaryColor-200 hover:text-primaryColor "
                    onClick={() => {
                        setShowOverlay((showOverlay) => !showOverlay);
                        setShowContact(false);
                        setShowOpening(false);
                        setShowReserve(true);
                    }}
                >
                    <img className="h-[1.35rem] md:h-10" src={Programm.src} alt="" />
                    <span className="text-xs md:text-base mt-1">Reservierung</span>
                </a>
            </div>
        </>
    );
};

export default MobileBar;
