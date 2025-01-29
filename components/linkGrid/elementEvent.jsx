import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CoverImage } from "../images";
import { TextButton } from "../buttons";
import { H3, H4, P } from "../typography";
import urlFor from "../../functions/urlFor";
import formatStringToDate from "../../functions/formatStringToDate";
import { useWindowDimensions } from "../../hooks/useWindowDimension";
import Calendar from "../../assets/calendar.svg";
import Time from "../../assets/time.svg";
import shortenYear from "../../functions/shortenYear";

const ElementEvent = ({ data, i, isWorkshop, isDetail, anfrage }) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 480;

    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-150px 0px",
    });

    const cardVariants = {
        initial: { scale: 1 },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15,
                staggerChildren: 0.1,
            },
        },
        whileTap: {
            scale: 0.95,
            transition: { type: "spring", stiffness: 800, damping: 15 },
        },
    };

    const contentVariants = {
        initial: { y: 0, opacity: 1 },
        hover: { y: -10, opacity: 1 },
    };

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView, isMobile]);

    // --- Decide if this is a PekipSingle event ---
    const isPekip = data.pekipSingle;

    // --- If it's Pekip, we expect data.trainer to be expanded via GROQ ---
    // Otherwise, use data.eventDetails?.partner
    let personImage = null;
    let personName = null;
    let personLink = null;
    let isHiddenPartner = false;

    if (isPekip) {
        // 1) PEKIP case
        personImage = data.trainer?.image;
        personName = data.trainer?.name;
        personLink = `/trainer/${data.trainer?.slug || ""}`;
    } else {
        // 2) Normal (non-PEKIP) case
        isHiddenPartner = data.eventDetails?.partner?.isHidden;
        personImage = data.eventDetails?.partner?.image;
        personName = data.eventDetails?.partner?.name;
        personLink = `/partner/${data.eventDetails?.partner?.slug?.current}`;
    }

    return (
        <motion.div
            className="wrapper col-span-6 md:col-span-4 lg:col-span-3 bg-white rounded-[10px] pb-4"
            initial="initial"
            whileHover="hover"
            whileTap="whileTap"
            variants={cardVariants}
            ref={ref}
        >
            {/* Link to the event slug */}
            <Link href={`/event/${data.slug.current}`} className="relative">
                <>
                    {/* Cover image for the event (same for Pekip or normal) */}
                    <CoverImage
                        src={urlFor(data.image).url()}
                        mobileSrc={urlFor(data.image).url()}
                        alt="Cover Background"
                        klasse={data.ausgebucht ? "opacity-20" : "null"}
                        style={{ aspectRatio: "30/17", borderColor: data.kategorie.farbe.value }}
                        className="w-full z-20 relative rounded-t-[10px] overflow-hidden mb-3"
                    />

                    {/* Text Section */}
                    <motion.div className="px-4 hyphens-auto text-balance" variants={contentVariants}>
                        <H4
                            klasse={`${
                                isWorkshop ? "!text-blueColor-100" : null
                            } !font-sans !text-sm xl:!text-lg !font-semibold !leading-snug`}
                        >
                            {data.headline}
                        </H4>

                        {/* Trainer/Partner block */}
                        <div className="flex w-full items-center mt-4">
                            <div className="image">
                                {/* If partner is hidden or it's Pekip, show no link (or link to trainer), etc. */}
                                {isPekip ? (
                                    // --- Show trainer image/link if we have it ---
                                    personImage ? (
                                        <Link href={personLink}>
                                            <CoverImage
                                                src={urlFor(personImage).url()}
                                                mobileSrc={urlFor(personImage).url()}
                                                alt="Trainer Image"
                                                style={{ aspectRatio: "1/1" }}
                                                className="w-10 h-10 z-20 relative rounded-[40px] overflow-hidden mr-4"
                                            />
                                        </Link>
                                    ) : (
                                        // No trainer image
                                        <div className="w-10 h-10 z-20 relative rounded-[40px] overflow-hidden mr-4 bg-gray-200" />
                                    )
                                ) : isHiddenPartner ? (
                                    // --- If partner is hidden, show the image but no link
                                    <CoverImage
                                        src={urlFor(personImage).url()}
                                        mobileSrc={urlFor(personImage).url()}
                                        alt="Partner Image"
                                        style={{ aspectRatio: "1/1" }}
                                        className="w-10 h-10 z-20 relative rounded-[40px] overflow-hidden mr-4"
                                    />
                                ) : (
                                    // --- Otherwise link to partner
                                    <Link href={personLink}>
                                        <CoverImage
                                            src={urlFor(personImage).url()}
                                            mobileSrc={urlFor(personImage).url()}
                                            alt="Partner Image"
                                            style={{ aspectRatio: "1/1" }}
                                            className="w-10 h-10 z-20 relative rounded-[40px] overflow-hidden mr-4"
                                        />
                                    </Link>
                                )}
                            </div>

                            <P
                                klasse={`text-xs xl:!text-base ${
                                    isWorkshop && !isMobile ? "!text-blueColor-100" : "text-textColor"
                                }`}
                            >
                                {personName || "—"}
                            </P>
                        </div>

                        <hr className="my-2" />

                        {/* Date/Time or "Termine auf Anfrage" */}
                        <div className="flex space-x-4">
                            {anfrage ? (
                                <div className="date flex space-x-1 items-center">
                                    <img src={Calendar.src} alt="" />
                                    <P klasse={`${isWorkshop ? "!text-blueColor-100" : null} !text-xs xl:!text-base`}>
                                        Termin auf Anfrage
                                    </P>
                                </div>
                            ) : (
                                <>
                                    <div className="date flex space-x-1 items-center">
                                        <img src={Calendar.src} alt="" />
                                        <P
                                            klasse={`${
                                                isWorkshop ? "!text-blueColor-100" : null
                                            } !text-xs xl:!text-base`}
                                        >
                                            {shortenYear(formatStringToDate(data.date).split(" ")[0])}
                                        </P>
                                    </div>

                                    <div className="time flex space-x-1 items-center">
                                        <img src={Time.src} alt="" />
                                        <P
                                            klasse={`${
                                                isWorkshop ? "!text-blueColor-100" : null
                                            } !text-xs xl:!text-base`}
                                        >
                                            {formatStringToDate(data.date).split(" ")[1]}
                                        </P>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            </Link>
        </motion.div>
    );
};

export default ElementEvent;
