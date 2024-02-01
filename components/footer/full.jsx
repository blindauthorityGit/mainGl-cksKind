import React from "react";
import Link from "next/link";

//COMPS
import FullWidthSection from "../layout/fullWidthSection";

const Full = () => {
    return (
        <FullWidthSection klasse="bg-[#F8F7FB]">
            <div className="container mx-auto grid grid-cols-12 col-span-12 font-sans text-textColor text-sm px-8">
                <div className="lg:col-span-6"></div>
                <div className="lg:col-span-2"></div>
                <div className="col-span-12 lg:col-span-2 flex flex-col font-semibold space-y-2 ">
                    <Link href="/programm">KURSPROGRAMM</Link>
                    <Link href="/cafe">DAS CAFE</Link>
                    <Link href="/kindergeburtstag">KINDERGEBURTSTAG</Link>
                    <Link href="/raumvermietung">RAUMVERMIETUNG</Link>
                    <Link href="/ueber-uns">ÜBER UNS</Link>
                    <Link href="#">KONTAKT</Link>
                </div>
                <div className="col-span-2 flex flex-col font-semibold space-y-2 mt-2 lg:mt-0">
                    {" "}
                    <Link href="/impressum">IMPRESSUM</Link>
                    <Link href="/datenschutz">DATENSCHUTZERKLÄRUNG</Link>
                </div>
            </div>
        </FullWidthSection>
    );
};

export default Full;
