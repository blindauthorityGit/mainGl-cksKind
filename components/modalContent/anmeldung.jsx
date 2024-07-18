import React, { useEffect } from "react";
import Link from "next/link";
//SANITY
import { PortableText } from "@portabletext/react";
import { CoverImage } from "../images";

import urlFor from "../../functions/urlFor";

import { H2, H3, H4, P } from "../typography";

import { MainButton } from "../buttons";
import { AnmeldeForm } from "../contactForm";

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

const Anmeldung = ({ data, events }) => {
    let isWorkshop = false;

    const intro =
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ut perferendis ratione, fugiat reminventore praesentium nulla quia ex iusto qui voluptas laborum aspernatur eveniet non, sapiente enimlaboriosam totam.";

    useEffect(() => {}, [events]);

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <div className="col-span-12 ">
                <H3 klasse={``}>Anmeldung</H3>

                <AnmeldeForm intro={intro} events={events} data={events.datum}></AnmeldeForm>
            </div>
        </div>
    );
};

export default Anmeldung;
