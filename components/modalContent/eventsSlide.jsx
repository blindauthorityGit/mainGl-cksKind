import React from "react";
//SANITY
import { PortableText } from "@portabletext/react";
import { CoverImage } from "../images";

import urlFor from "../../functions/urlFor";

import { H2, H3, H4, P } from "../typography";

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// animations
import { motion } from "framer-motion";

// icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";
//ASETS
// import Sackerl from "../../assets/SVG/sackl.svg";

const EventsSlide = ({ data }) => {
    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <CoverImage
                src={urlFor(data.image).url()}
                mobileSrc={urlFor(data.image).url()}
                alt="Cover Background"
                // style={{ aspectRatio: isEvent ? "3/2" : "1642/650" }}
                className={`w-full col-span-12 z-20 relative rounded-[40px] overflow-hidden aspect-[3/2] xl:aspect-[3/2]`}
            />
            <div className="col-span-12 pt-3 px-4">
                <H3>{data.headline}</H3>
            </div>
        </div>
    );
};

export default EventsSlide;
