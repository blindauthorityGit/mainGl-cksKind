import React, { useState, useEffect } from "react";
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

//COMPONENTS
import EventsSlide from "./eventsSlide";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";
//ASETS
// import Sackerl from "../../assets/SVG/sackl.svg";

const Events = ({ events, currentIndex }) => {
    const [swiper, setSwiper] = useState(null);

    const handleNav = () => {
        // if (swiper && swiper.activeIndex === 0) {
        //     setIsLastSlideLeft(true);
        // } else if (swiper.activeIndex === swiper.slides.length - 1) {
        //     setIsLastSlideRight(true);
        // } else {
        //     setIsLastSlideLeft(false);
        //     setIsLastSlideRight(false);
        // }
    };

    return (
        <div className={` col-span-12 px-8 md:px-8 lg:px-24 pt-6 lg:pt-0 relative `}>
            <div className="w-full z-50 ">
                <div
                    onClick={() => {
                        swiper.slidePrev();
                    }}
                    className="absolute top-[30%] left-[16px]  transform -translate-x-1/2 z-30 "
                >
                    <button className=" rounded-full h-8  w-8 flex items-center justify-center">
                        <FaChevronLeft className="text-textColor lg:text-5xl" />
                    </button>
                </div>
                <div
                    onClick={() => {
                        swiper.slideNext();
                    }}
                    className="absolute  top-[30%] right-[-16px] transform -translate-x-1/2  z-30"
                >
                    <button className=" rounded-full h-8 w-8 flex items-center justify-center">
                        <FaChevronRight className="text-textColor lg:text-5xl" />
                    </button>
                </div>
            </div>
            <Swiper
                initialSlide={currentIndex}
                onSwiper={(swiper) => {
                    {
                        setSwiper(swiper);
                    }
                }}
                onSlideChange={() => {
                    handleNav();
                }}
                // Add other Swiper parameters as needed
            >
                {events.map((event, index) => (
                    <SwiperSlide key={index}>
                        {/* Render your event data here */}
                        <EventsSlide data={event}></EventsSlide>
                        {/* Add more event details as needed */}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Events;
