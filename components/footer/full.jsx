import React from "react";
import Link from "next/link";

//COMPS
import FullWidthSection from "../layout/fullWidthSection";

const Full = () => {
    return (
        <FullWidthSection klasse="bg-[#F8F7FB]">
            <div className="container mx-auto grid grid-cols-12 col-span-12 font-sans text-textColor text-sm px-8">
                <div className="lg:col-span-6">Newsletter</div>
                <div className="lg:col-span-2"></div>
                <div className="col-span-12 lg:col-span-2 flex flex-col font-semibold space-y-2 ">
                    <Link href="#">KURSPROGRAMM</Link>
                    <Link href="#">DAS CAFE</Link>
                    <Link href="#">KINDERGEBURTSTAG</Link>
                    <Link href="#">RAUMVERMIETUNG</Link>
                    <Link href="#">ÜBER UNS</Link>
                    <Link href="#">KONTAKT</Link>
                </div>
                <div className="col-span-2 flex flex-col font-semibold space-y-2 mt-2 lg:mt-0">
                    {" "}
                    <Link href="#">IMPRESSUM</Link>
                    <Link href="#">DATENSCHUTZERKLÄRUNG</Link>
                </div>
            </div>
        </FullWidthSection>
    );
};

export default Full;
