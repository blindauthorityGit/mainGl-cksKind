import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

//COMPONENTS
import SlideElement from "./slideElement";

//functions
import processEvents from "../../functions/processEvents";

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
        const sortedEvents = processEvents(props.data, true);

        // Check if there are more events than the limit
        const limitedEvents = sortedEvents.slice(0, 15);
        if (sortedEvents.length > 15) {
            // Add a placeholder object for the 'View All' slide
            limitedEvents.push({ viewAll: true });
        }

        setFlatData(limitedEvents);
        setDataLen(sortedEvents.length);
    }, [props.data]);

    return (
        <div
            className={`${
                isLoaded ? "opacity-100" : "opacity-0"
            } col-span-12 px-8 md:px-8 lg:px-24 pt-6 lg:pt-0 relative ${props.colspan}`}
        >
            {dataLen && dataLen > 0 ? (
                <div className="w-full z-50 ">
                    <div
                        onClick={() => {
                            swiper.slidePrev();
                        }}
                        className="absolute top-[30%] left-[16px]  transform -translate-x-1/2 z-20 "
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
                        className="absolute  top-[30%] right-[-16px] transform -translate-x-1/2  z-20"
                    >
                        <button
                            style={{ opacity: isLastSlideRight ? 0.5 : 1 }}
                            className=" rounded-full h-8 w-8 flex items-center justify-center"
                        >
                            <FaChevronRight className="text-textColor lg:text-5xl" />
                        </button>
                    </div>
                </div>
            ) : null}

            {dataLen && dataLen > 0 && (
                <Swiper
                    // install Swiper modules
                    modules={[Pagination, Navigation, A11y]}
                    slidesPerView={4}
                    lazy
                    pagination={{ clickable: true, dynamicBullets: true }}
                    onSwiper={(swiper) => {
                        {
                            setSwiper(swiper);
                        }
                    }}
                    onSlideChange={() => {
                        handleNav();
                    }}
                    className="h-full eventSlider"
                    // style={{ paddingBottom: "3.75rem!important" }}
                    breakpoints={{
                        // when window width is >= 640px
                        320: {
                            slidesPerView: dataLen >= 2 ? 2 : 1,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: dataLen >= 3 ? 3 : dataLen,

                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 3,
                            navigation: false,
                            spaceBetween: 15,
                        },
                        1280: {
                            slidesPerView: dataLen >= 4 ? 4 : dataLen === 1 ? 2 : dataLen,
                            navigation: false,
                            spaceBetween: 15,
                        },
                        1600: {
                            slidesPerView: dataLen >= 5 ? 5 : dataLen === 1 ? 2 : dataLen,
                            navigation: false,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {flatData?.map((e, i) => {
                        // Check if the current item is the 'View All' placeholder
                        if (e.viewAll) {
                            return (
                                <SwiperSlide key={`viewAllSlide`} className="2xl:px-6 sm:px-0 relative">
                                    <div className="w-full h-2/3 rounded-2xl flex items-center justify-center bg-primaryColor-600">
                                        {/* Adjust the link as necessary */}
                                        <a href="/programm" className="font-sans text-primaryColor-100 font-semibold">
                                            Alle anzeigen
                                        </a>
                                    </div>
                                </SwiperSlide>
                            );
                        } else {
                            // Normal event slide rendering
                            return (
                                <SwiperSlide key={`sliderKey${i}`} className="2xl:px-6 sm:px-0 relative">
                                    <SlideElement
                                        aspectRatio={dataLen > 2 ? "1/1" : "1.5/1"}
                                        isWorkshop={props.isWorkshop}
                                        data={e}
                                        loading="lazy"
                                    ></SlideElement>
                                </SwiperSlide>
                            );
                        }
                    })}
                </Swiper>
            )}
        </div>
    );
};

export default EventSlider1;
