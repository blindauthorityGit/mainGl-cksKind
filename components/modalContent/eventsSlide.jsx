import React, { useEffect } from "react";
import Link from "next/link";
//SANITY
import { PortableText } from "@portabletext/react";
import { CoverImage } from "../images";

import urlFor from "../../functions/urlFor";

import { H2, H3, H4, P } from "../typography";

import { MainButton } from "../buttons";

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

const EventsSlide = ({ data, isWorkshop }) => {
    useEffect(() => {}, [data]);

    return (
        <div className="container mx-auto grid grid-cols-12 sm:gap-8">
            <CoverImage
                src={urlFor(data.image).url()}
                mobileSrc={urlFor(data.image).url()}
                alt="Cover Background"
                // style={{ aspectRatio: isEvent ? "3/2" : "1642/650" }}
                className={`w-full col-span-12 xl:col-span-6 z-20 relative rounded-[40px] overflow-hidden aspect-[5/2] xl:aspect-[3/3] 2xl:aspect-[3/4]`}
            />
            <div className="col-span-12 xl:col-span-6 pt-3 px-4 relative xl:flex xl:flex-col xl:justify-center">
                <H3 klasse={`${data.kategorie.name == "Beratung & Workshops" ? "!text-white" : "text-textColor"}`}>
                    {data.headline}
                </H3>
                <H4
                    klasse={`mt-3 mb-4 ${
                        data.kategorie.name == "Beratung & Workshops" ? "!text-white" : "text-textColor"
                    }`}
                >
                    {formatStringToDate(data.date)}
                </H4>
                <P
                    klasse={`text-xs ${
                        data.kategorie.name == "Beratung & Workshops" ? "!text-white" : "text-textColor"
                    }`}
                >
                    {data.description}
                </P>
                <div className={`wrapper mb-6 font-sans ${isWorkshop ? "!text-blueColor-100" : "text-textColor"}`}>
                    <div className="flex w-full items-center mt-6">
                        <div className="image">
                            <Link href={`/partner/${data.eventDetails.partner.slug.current}`}>
                                <CoverImage
                                    src={urlFor(data.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                    mobileSrc={urlFor(data.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                    alt="Cover Background"
                                    style={{ aspectRatio: "1/1" }}
                                    className=" w-12 h-12 z-20 relative rounded-[40px] overflow-hidden  mr-4"
                                />
                            </Link>
                        </div>{" "}
                        <P
                            klasse={` ${
                                data.kategorie.name == "Beratung & Workshops" ? "!text-blueColor-100" : "text-textColor"
                            }`}
                        >
                            {data.eventDetails.partner.name}
                        </P>
                    </div>
                </div>
                <MainButton
                    onClick={(e) => {}}
                    klasse="col-span-12 bg-primaryColor xl:mt-12"
                    link={`/event/${data.slug.current}`}
                >
                    Mehr
                </MainButton>
            </div>
        </div>
    );
};

export default EventsSlide;
