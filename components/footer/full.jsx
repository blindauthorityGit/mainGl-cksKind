import React from "react";
import Link from "next/link";

import { Newsletter } from "../modalContent";
import { H3, H4, H5, P } from "../typography";
import { MainButtonNOLink } from "../buttons";
//STORE
import useStore from "../../store/store"; // Adjust the path to your store file

//COMPS
import FullWidthSection from "../layout/fullWidthSection";

const Full = () => {
    const showModal = useStore((state) => state.showModal);
    const setShowModal = useStore((state) => state.setShowModal);

    const modalColor = useStore((state) => state.modalColor);
    const setShowOverlay = useStore((state) => state.setShowOverlay);

    const setIsFullHeightModal = useStore((state) => state.setIsFullHeightModal);

    const modalContent = useStore((state) => state.modalContent);
    const setModalContent = useStore((state) => state.setModalContent);
    return (
        <FullWidthSection klasse="bg-[#F8F7FB]">
            <div className="container mx-auto grid grid-cols-12 col-span-12 font-sans text-textColor text-sm px-8">
                <div className="col-span-12 md:col-span-6 mb-8 lg:mb-0 lg:col-span-3">
                    <H4 klasse="!font-sans !font-bold mb-4">Abonniere unseren Newsletter:</H4>
                    <MainButtonNOLink
                        klasse="bg-primaryColor "
                        onClick={() => {
                            setShowModal(true);
                            setShowOverlay(true);
                            setModalContent(<Newsletter></Newsletter>);
                            setIsFullHeightModal(true);
                        }}
                    >
                        abonnieren
                    </MainButtonNOLink>
                </div>
                <div className="lg:col-span-3"></div>
                <div className="lg:col-span-2"></div>
                <div className="col-span-12 lg:col-span-4 xl:col-span-2 flex flex-col font-semibold space-y-2 ">
                    <Link href="/programm">KURSPROGRAMM</Link>
                    {/* <Link href="/cafe">DAS CAFE</Link> */}
                    <Link href="/kindergeburtstag">KINDERGEBURTSTAG</Link>
                    <Link href="/raumvermietung">RAUMVERMIETUNG</Link>
                    <Link href="/ueber-uns">ÜBER UNS</Link>
                    <div className="hidden lg:flex xl:hidden text-xs pt-4 flex-col">
                        <Link href="/impressum">IMPRESSUM</Link>
                        <Link href="/datenschutz">DATENSCHUTZERKLÄRUNG</Link>
                    </div>
                    {/* <Link href="#">KONTAKT</Link> */}
                </div>
                <div className="col-span-2 text-xs flex flex-col font-semibold space-y-2 mt-8 text-xs lg:hidden xl:flex xl:text-xs lg:mt-0">
                    {" "}
                    <Link href="/impressum">IMPRESSUM</Link>
                    <Link href="/datenschutz">DATENSCHUTZERKLÄRUNG</Link>
                </div>
            </div>
        </FullWidthSection>
    );
};

export default Full;
