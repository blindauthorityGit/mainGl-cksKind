import React, { useEffect } from "react";
import Link from "next/link";
//SANITY
import { PortableText } from "@portabletext/react";
import { CoverImage } from "../images";

import urlFor from "../../functions/urlFor";

import { H2, H3, H4, P } from "../typography";

import { MainButton } from "../buttons";
import { Form1 } from "../contactForm";

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import formatStringToDate from "../../functions/formatStringToDate";

// animations
import { motion } from "framer-motion";

// icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";
//ASETS
// import Sackerl from "../../assets/SVG/sackl.svg";

const Anmeldung = ({ data }) => {
    let isWorkshop = false;

    useEffect(() => {}, [data]);

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <div className="col-span-12 ">
                <H3 klasse={``}>Anmeldung</H3>
                <Form1></Form1>
                <MainButton
                    onClick={(e) => {
                        console.log("BUIBUBUBUBUBUBUBUB");
                    }}
                    klasse="col-span-12 bg-primaryColor"
                    link={`#`}
                >
                    Mehr
                </MainButton>
            </div>
        </div>
    );
};

export default Anmeldung;
