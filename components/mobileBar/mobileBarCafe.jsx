import { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

// COMPS
import Overlay from "../overlay";
import ModalMobile from "../modal/modalMobile";
import { Opening, Contact, Öffnungszeiten, CafeReservierung } from "../modalContent";
import MultiStepReservation from "../modalContent/stepsCafe/multiStepReservation";
import { AiOutlineClockCircle } from "react-icons/ai";

//ASSETS
import Phone from "../../assets/phone.svg";
import Email from "../../assets/email.svg";
import Zeiten from "../../assets/time.svg";
//ASSETS
import Cafe from "../../assets/cafeBottom.svg";
import Reservation from "../../assets/reservation.svg";
import Programm from "../../assets/programmBottom.svg";

//STORE
import useStore from "../../store/store"; // Adjust the path to your store file

const MobileBar = (props) => {
    const setIsCafe = useStore((state) => state.setIsCafe);
    const setShowOverlay = useStore((state) => state.setShowOverlay);
    const setShowModal = useStore((state) => state.setShowModal);
    const setModalContent = useStore((state) => state.setModalContent);

    const showModal = useStore((state) => state.showModal);
    const cafeData = useStore((state) => state.cafeData);

    useEffect(() => {}, []);

    return (
        <>
            <div
                className={`fixed lg:hidden  ${
                    showModal ? "z-10" : "z-30"
                } bottom-0 w-full flex justify-center items-center bg-textColor text-sm   h-[7vh] `}
            >
                <a
                    href="/programm"
                    className="w-1/3 p-3 border-r space-x-1 border-primaryColor-200 border-opacity-30 flex  justify-center items-center text-violetColor-200 hover:text-primaryColor "
                >
                    <img className="h-[1.35rem]" src={Programm.src} alt="" />
                    <span className="text-xs  mt-1">Programm</span>
                </a>
                <a
                    onClick={() => {
                        setShowOverlay(true);
                        setShowModal(true);
                        setModalContent(
                            <Öffnungszeiten
                                dataKontakt={cafeData.dataKontakt}
                                data={cafeData}
                                // image={data.reservationImage}
                            />
                        );
                    }}
                    className="w-1/3 p-3 border-r space-x-1 border-primaryColor-200 border-opacity-30 flex  justify-center items-center text-violetColor-200 hover:text-primaryColor "
                >
                    <img className="h-[1.35rem] md:h-10 brightness-150	" src={Zeiten.src} alt="" />
                    <span className="text-xs md:text-base font-base mt-1">Zeiten</span>
                </a>
                <a
                    className="w-1/3 p-3 border-r space-x-1 border-primaryColor-200 border-opacity-30 flex  justify-center items-center text-violetColor-200 hover:text-primaryColor "
                    onClick={() => {
                        setShowOverlay(true);
                        setShowModal(true);
                        setModalContent(<MultiStepReservation image={null} />);
                    }}
                >
                    <img className="h-[1.35rem] md:h-10" src={Reservation.src} alt="" />
                    <span className="text-xs md:text-base mt-1">Reservierung</span>
                </a>
            </div>
        </>
    );
};

export default MobileBar;
