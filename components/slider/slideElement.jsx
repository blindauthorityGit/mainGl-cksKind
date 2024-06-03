import React from "react";
import Link from "next/link";

//COMPONENTS
import { CoverImage } from "../images";

//TYPO
import { H4, P } from "../typography";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

import formatStringToDate from "../../functions/formatStringToDate";
import shortenYear from "../../functions/shortenYear";

//ASSETS
import Calendar from "../../assets/calendar.svg";
import Time from "../../assets/time.svg";

const SlideElement = ({ data, isWorkshop, aspectRatio }) => {
    return (
        <div className="wrapper col-span-6 md:col-span-4 lg:col-span-3 bg-white rounded-[10px] pb-4">
            <Link href={`/event/${data.slug.current}`} className="relative">
                {/* <div className="absolute w-6 h-6 right-2 top-2 rounded-full bg-primaryColor z-30"></div> */}
                <CoverImage
                    src={urlFor(data.image).url()} // Replace with the actual path to your image
                    mobileSrc={urlFor(data.image).url()} // Replace with the actual path to your image
                    alt="Cover Background"
                    klasse={data.ausgebucht ? "opacity-20" : "null"}
                    style={{ aspectRatio: "30/17", borderColor: data.kategorie.farbe.value }}
                    className="w-full z-20 relative rounded-t-[10px] overflow-hidden mb-3"
                />

                {/* {data.ausgebucht ? (
                    <div className="ausgebucht  xl:text-xl text-primaryColor-700 absolute z-30 flex justify-center items-center inset-0 font-sans font-bold">
                        Ausgebucht
                    </div>
                ) : null} */}
            </Link>
            <div className="px-2 hyphens-auto text-balance">
                <H4 klasse={`${isWorkshop ? "!text-blueColor-100" : null} !font-sans !text-sm !font-semibold`}>
                    {data.headline}
                </H4>
                <div className="flex w-full items-center mt-4">
                    <div className="image">
                        {data.eventDetails.partner.isHidden ? (
                            <CoverImage
                                src={urlFor(data.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                mobileSrc={urlFor(data.eventDetails.partner.image).url()} // Replace with the actual path to your image
                                alt="Cover Background"
                                style={{ aspectRatio: "1/1" }}
                                className=" w-10 h-10 z-20 relative rounded-[40px] overflow-hidden  mr-4"
                            />
                        ) : null}
                    </div>{" "}
                    <P klasse={`text-xs ${isWorkshop && !isMobile ? "!text-blueColor-100" : "text-textColor"}`}>
                        {data.eventDetails.partner.name}
                    </P>
                </div>
                <hr className="my-2" />
                <div className="flex space-x-4 ">
                    <div className="date flex space-x-1 items-center">
                        <img src={Calendar.src} alt="" />
                        <P klasse={`${isWorkshop ? "!text-blueColor-100" : null} !text-xs`}>
                            {shortenYear(formatStringToDate(data.date).split(" ")[0])}
                        </P>
                    </div>
                    <div className="time flex space-x-1 items-center">
                        <img src={Time.src} alt="" />
                        <P klasse={`${isWorkshop ? "!text-blueColor-100" : null} !text-xs`}>
                            {" "}
                            {formatStringToDate(data.date).split(" ")[1]}
                        </P>
                    </div>
                </div>
                {/* <P klasse={isWorkshop ? "!text-blueColor-100" : null}>{formatStringToDate(data.date)}</P> */}
            </div>
        </div>
    );
};

export default SlideElement;
