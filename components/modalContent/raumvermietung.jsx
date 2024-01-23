import React from "react";
import { Form1 } from "../contactForm";

import { H4, P } from "../typography";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

//ASSETS
// import Getreide from "../../assets/SVG/getreide.svg";

const Raumvermietung = () => {
    return (
        <div className="container mx-auto grid grid-cols-12">
            <div className="brot absolute bottom-10 right-[-2rem] w-72 opacity-[0.08]">
                {/* <img src={Getreide.src} alt="" /> */}
            </div>
            <div className="col-span-12">
                <H4 klasse="mt-4 mb-3 !text-xl">Schreiben Sie uns!</H4>
                <Form1 contact />
            </div>
        </div>
    );
};

export default Raumvermietung;
