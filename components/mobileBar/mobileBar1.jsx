import { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

// COMPS
import Overlay from "../overlay";
import ModalMobile from "../modal/modalMobile";
import { Opening, Contact } from "../modalContent";
import { AiOutlineClockCircle } from "react-icons/ai";

//ASSETS
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import Programm from "../../assets/programm.svg";

const MobileBar = (props) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showOpening, setShowOpening] = useState(false);

    return (
        <>
            {showOverlay ? (
                <>
                    <ModalMobile
                        onClick={() => {
                            setShowOverlay(false);
                        }}
                    >
                        {showOpening && <Opening data={props.data} />}
                        {showContact && <Contact />}
                    </ModalMobile>
                    <Overlay
                        onClick={() => {
                            setShowOverlay(false);
                        }}
                    />
                </>
            ) : null}
            <div className="fixed sm:hidden  z-50 bottom-0 w-full flex justify-center items-center bg-primaryColor text-sm ">
                <a
                    onClick={() => {
                        setShowOverlay((showOverlay) => !showOverlay);
                        setShowContact(false);
                        setShowOpening(true);
                    }}
                    className="w-1/3 p-3 flex border-r border-opacity-30 border-primaryColor-200 flex-col justify-center items-center text-primaryColor-200 hover:text-primaryColor"
                >
                    <img src={Phone.src} alt="" />
                    <span className="text-xs font-base mt-1">Anruf</span>
                </a>
                <a
                    onClick={() => {
                        setShowOverlay((showOverlay) => !showOverlay);
                        setShowContact(true);
                        setShowOpening(false);
                    }}
                    className="w-1/3 p-3 flex flex-col border-r border-primaryColor-200 border-opacity-30  justify-center items-center text-primaryColor-200 hover:text-primaryColor"
                >
                    <img src={Email.src} alt="" />
                    <span className="text-xs font-base mt-1">Email</span>
                </a>
                <a
                    href="tel:+436508011900"
                    className="w-1/3 p-3 border-r border-primaryColor-200 border-opacity-30 flex flex-col justify-center items-center text-primaryColor-200 hover:text-primaryColor "
                >
                    <img src={Programm.src} alt="" />
                    <span className="text-xs  mt-1">Programm</span>
                </a>
            </div>
        </>
    );
};

export default MobileBar;
