import React, { useState, useEffect } from "react";
import Link from "next/link";
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
import SlideElement from "./slideElement";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

const EventSlider1 = (props) => {
    const [isLoaded, setisLoaded] = useState(false);
    const [swiper, setSwiper] = useState(null);
    const [isLastSlideLeft, setIsLastSlideLeft] = useState(true);
    const [isLastSlideRight, setIsLastSlideRight] = useState(false);
    const [flatData, setFlatData] = useState(null);
    const [dataLen, setDataLen] = useState(null);

    const handleNav = () => {
        if (swiper && swiper.activeIndex === 0) {
            setIsLastSlideLeft(true);
        } else if (swiper.activeIndex === swiper.slides.length - 1) {
            setIsLastSlideRight(true);
        } else {
            setIsLastSlideLeft(false);
            setIsLastSlideRight(false);
        }
    };

    useEffect(() => {
        setisLoaded(true);

        //CHECK CURRENT DATE
        const currentDate = new Date();
        // FLATTEN ARRAY TO SINGLE DATES AND FILTER OUT OUTDATED EVENTS
        const flattenedEvents = props.data.flatMap((event) =>
            event.datum
                .map((date) => ({ ...event, date: date.startDateTime }))
                .filter((event) => new Date(event.date) >= currentDate)
        );

        // Sort the flattened events by date
        const sortedEvents = flattenedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        setFlatData(sortedEvents);
        setDataLen(sortedEvents.length);
    }, [props.data]);

    useEffect(() => {
        console.log(typeof dataLen);
    }, [dataLen]);

    const textMotion = {
        rest: {
            x: -50,
            opacity: 0,

            transition: {
                duration: 0.85,
                type: "tween",
                ease: "easeIn",
            },
        },
        hover: {
            // color: "blue",
            x: 0,
            opacity: 1,

            transition: {
                duration: 0.5,
                type: "tween",
                ease: "easeOut",
            },
        },
    };

    return (
        <div
            className={`${
                isLoaded ? "opacity-100" : "opacity-0"
            } col-span-12 px-10 md:px-8 lg:px-24 pt-6 lg:pt-0 relative ${props.colspan}`}
        >
            <div className="w-full z-50 ">
                <div
                    onClick={() => {
                        swiper.slidePrev();
                    }}
                    className="absolute top-[30%] left-[16px]  transform -translate-x-1/2 z-30 "
                >
                    <button
                        style={{ opacity: isLastSlideLeft ? 0.5 : 1 }}
                        className=" rounded-full h-8  w-8 flex items-center justify-center"
                    >
                        <FaChevronLeft className="text-textColor lg:text-5xl" />
                    </button>
                </div>
                <div
                    onClick={() => {
                        swiper.slideNext();
                    }}
                    className="absolute  top-[30%] right-[-16px] transform -translate-x-1/2  z-30"
                >
                    <button
                        style={{ opacity: isLastSlideRight ? 0.5 : 1 }}
                        className=" rounded-full h-8 w-8 flex items-center justify-center"
                    >
                        <FaChevronRight className="text-textColor lg:text-5xl" />
                    </button>
                </div>
            </div>
            {/* {props.nonstart ? (
                <h2 className="font-oswald text-4xl lg:text-6xl font-semibold mb-8 lg:mb-12">
                    Weitere Veranstaltungen:
                </h2>
            ) : null} */}

            {dataLen > 0 && (
                <Swiper
                    // install Swiper modules
                    modules={[Pagination, Navigation, A11y]}
                    slidesPerView={4}
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => {
                        {
                            setSwiper(swiper);
                        }
                    }}
                    onSlideChange={() => {
                        handleNav();
                        console.log(isLastSlideRight, swiper.activeIndex, swiper.slides.length - 1);
                    }}
                    className="h-full eventSlider"
                    // style={{ paddingBottom: "3.75rem!important" }}
                    breakpoints={{
                        // when window width is >= 640px
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 3,

                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 3,
                            navigation: false,
                        },
                        1280: {
                            slidesPerView: 4,
                            navigation: false,
                            spaceBetween: 20,
                        },
                        1600: {
                            slidesPerView: dataLen >= 5 ? 5 : dataLen,
                            navigation: false,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {flatData?.map((e, i) => {
                        return (
                            <SwiperSlide key={`sliderKey${i}`} className="lg:px-6 sm:px-0 relative ">
                                <SlideElement
                                    aspectRatio={dataLen > 3 ? "1/1" : "2/1"}
                                    isWorkshop={props.isWorkshop}
                                    data={e}
                                ></SlideElement>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </div>
    );
};

export default EventSlider1;
