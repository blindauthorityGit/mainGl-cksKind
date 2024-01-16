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

//STORE
import useStore from "../../store/store"; // Adjust the path to your store file

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";
//ASETS
// import Sackerl from "../../assets/SVG/sackl.svg";

const Events = ({ events, currentIndex }) => {
    const [swiper, setSwiper] = useState(null);

    const modalColor = useStore((state) => state.showModal);
    const setModalColor = useStore((state) => state.setModalColor);

    const handleNav = (e) => {
        if (swiper) {
            const currentEvent = events[swiper.activeIndex];
            if (currentEvent) {
                setModalColor(currentEvent.kategorie.farbe.value);
            }
        }
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
        <div className={` col-span-12  0 relative `}>
            <div className="w-full z-50 ">
                <div
                    onClick={() => {
                        swiper.slidePrev();
                    }}
                    className="absolute top-[30%] left-[-16px]  transform -translate-x-1/2 z-40 "
                >
                    <button className=" rounded-full h-8 xl:w-12 xl:h-12 bg-white w-8 flex items-center justify-center">
                        <FaChevronLeft className="text-textColor xl:text-4xl" />
                    </button>
                </div>
                <div
                    onClick={() => {
                        swiper.slideNext();
                    }}
                    className="absolute  top-[30%] right-[-32px]   z-30"
                >
                    <button className=" rounded-full h-8 w-8 xl:w-12 xl:h-12 flex items-center justify-center bg-white">
                        <FaChevronRight className="text-textColor xl:text-4xl" />
                    </button>
                </div>
            </div>
            <Swiper
                initialSlide={currentIndex}
                slidesPerView={1}
                spaceBetween={"15px"}
                onSwiper={(swiper) => {
                    {
                        setSwiper(swiper);
                    }
                }}
                onSlideChange={(e) => {
                    handleNav(e);
                    console.log(e);
                }}
                breakpoints={{
                    // when window width is >= 640px

                    1600: {
                        // slidesPerView: 2,
                        // navigation: false,
                        // spaceBetween: 10,
                    },
                }}
                // Add other Swiper parameters as needed
            >
                {events.map(
                    (event, index) => (
                        console.log(event.kategorie.name, event.kategorie.name == "Beratung & Workshops"),
                        (
                            <SwiperSlide key={index}>
                                {/* Render your event data here */}
                                <EventsSlide
                                    data={event}
                                    isWorkshop={event.kategorie.name == "Beratung & Workshops"}
                                ></EventsSlide>
                                {/* Add more event details as needed */}
                            </SwiperSlide>
                        )
                    )
                )}
            </Swiper>
        </div>
    );
};

export default Events;
