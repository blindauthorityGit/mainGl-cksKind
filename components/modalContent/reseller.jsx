import React from "react";
// import { Form1 } from "../forms";
// import { ShopGalerie } from "../galerie";

//ICONS
import { FaPhone } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Reseller = (props) => {
    return (
        <div className="grid grid-cols-12 gap-4 mb-16 sm:mb-0">
            <div className="hidden sm:block col-span-12 lg:col-span-6">{/* <ShopGalerie data={props.data} /> */}</div>
            <div className="col-span-12 lg:col-span-6 lg:px-16">
                <h4
                    data-aos="fade-left"
                    className="font-thin font-freight text-2xl sm:text-xl text-darkText lg:text-3xl xl:text-4xl  mt-4 mb-4 lg:mb-6"
                >
                    Sie würden gerne Weingebäck in Ihrem Shop verkaufen?
                </h4>
                <p className="font-freight xl:text-lg leading-relaxed">
                    Gerne stellen wir Ihnen weitere Informationen zur Verfügung. Fordern Sie das Info-Blatt gleich an!
                </p>
                <div className="phoner grid grid-cols-12 mt-8 mb-4 leading-relaxed">
                    <div className="col-span-2 text-primaryColor flex items-center">
                        <FaPhone />{" "}
                    </div>
                    <div className="col-span-10 font-bold font-freight xl:text-xl">+43 / 650 80 11 900</div>
                    <div className="col-span-2 text-primaryColor flex items-center">
                        <HiOutlineMail></HiOutlineMail>
                    </div>
                    <div className="col-span-10 font-freight xl:text-xl tracking-wider">
                        <a className="underline" href="mailto:office@baeckerin.at">
                            office@baeckerin.at
                        </a>
                    </div>
                </div>
                {/* <Form1 /> */}
            </div>
        </div>
    );
};

export default Reseller;
