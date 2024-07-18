import { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

// COMPS
import Overlay from "../overlay";
import ModalMobile from "../modal/modalMobile";
import { Opening, Contact } from "../modalContent";
import { AiOutlineClockCircle } from "react-icons/ai";

//ASSETS
import Cafe from "../../assets/cafeBottom.svg";
import Kontakt from "../../assets/kontakt.svg";
import Programm from "../../assets/programmBottom.svg";

//STORE
import useStore from "../../store/store"; // Adjust the path to your store file

const MobileBar = (props) => {
    //STORE
    const showOverlay = useStore((state) => state.showOverlay);
    const showModal = useStore((state) => state.showModal);
    const setShowOverlay = useStore((state) => state.setShowOverlay);
    const showMobileModal = useStore((state) => state.showMobileModal);
    const setShowMobileModal = useStore((state) => state.setShowMobileModal);
    const [showContact, setShowContact] = useState(false);
    const [showOpening, setShowOpening] = useState(false);

    useEffect(() => {
        console.log(props.data);
    }, [props.data]);

    return (
        <>
            {showMobileModal ? (
                <>
                    <ModalMobile
                        onClick={() => {
                            setShowMobileModal(false);
                            setShowOverlay(false);
                        }}
                    >
                        {showOpening && <Opening data={props.data} />}
                        {showContact && <Contact />}
                    </ModalMobile>
                </>
            ) : null}
            <div
                className={`fixed sm:hidden font-sans text-xs ${
                    showModal ? "z-10" : "z-30"
                }  bottom-0 w-full flex justify-center items-center bg-textColor text-sm h-[7vh] `}
            >
                <a
                    href="/cafe"
                    style={{ background: showContact ? "#33333!important" : null }}
                    className="w-1/3 p-3 flex border-r border-opacity-30 space-x-1 border-violetColor-200  justify-center items-center text-violetColor-200 hover:text-primaryColor"
                >
                    <img className="h-[1.35rem]" src={Cafe.src} alt="" />
                    <span className="text-xs font-base mt-1">Cafe</span>
                </a>
                <a
                    onClick={() => {
                        setShowOverlay((showOverlay) => !showOverlay);
                        setShowContact(true);
                        setShowOpening(false);
                        setShowMobileModal(true);
                    }}
                    className="w-1/3 p-3 flex  border-r space-x-1 border-primaryColor-200 border-opacity-30  justify-center items-center text-violetColor-200 hover:text-primaryColor-300"
                >
                    <img className="h-[1.35rem]" src={Kontakt.src} alt="" />
                    <span className="text-xs font-base mt-1">Kontakt</span>
                </a>
                <a
                    href="/programm"
                    className="w-1/3 p-3 border-r space-x-1 border-primaryColor-200 border-opacity-30 flex  justify-center items-center text-violetColor-200 hover:text-primaryColor "
                >
                    <img className="h-[1.35rem]" src={Programm.src} alt="" />
                    <span className="text-xs  mt-1">Programm</span>
                </a>
            </div>
        </>
    );
};

export default MobileBar;
