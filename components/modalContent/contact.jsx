import React from "react";
import { Form1 } from "../contactForm";

//ASSETS
// import Getreide from "../../assets/SVG/getreide.svg";

const Contact = () => {
    return (
        <div className="container mx-auto grid grid-cols-12">
            <div className="brot absolute bottom-10 right-[-2rem] w-72 opacity-[0.08]">
                {/* <img src={Getreide.src} alt="" /> */}
            </div>
            <div className="col-span-12">
                <h4
                    data-aos="fade-left"
                    className="font-thin font-freight text-3xl sm:text-xl text-darkText lg:text-4xl  mt-4 mb-4 lg:mb-6"
                >
                    Schreiben Sie mir!
                </h4>
                <Form1 contact />
            </div>
        </div>
    );
};

export default Contact;
