import React, { useState, useEffect } from "react";

import { H2, H3, H4, P } from "../typography";
import { MainButtonNOLink } from "../buttons";

import { CoverImage } from "../images";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

//ASSETS
import Pin from "../../assets/pinPink.svg";
import Phone from "../../assets/phonePink.svg";
import Mail from "../../assets/mailPink.svg";

const Öffnungszeiten = ({ data, image, dataKontakt }) => {
    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    useEffect(() => {}, []);

    return (
        <div className="container mx-auto grid grid-cols-12 font-sans">
            <div className="col-span-12 xl:col-span-6">
                <H2 klasse="mt-4 mb-6 ">Öffnungszeiten</H2>

                {/* <P klasse="mb-6">
                    Reservieren Sie jetzt Ihren Tisch und sichern Sie sich Ihren Wohlfühlplatz, wo Kaffee und Lächeln
                    auf Sie warten.
                </P> */}
                {data.oeffnungszeiten.map((e, i) => {
                    return (
                        <div className="wrapper flex font-sans mb-2 lg:text-lg text-textColor">
                            <div className="left w-16">{e.day}</div>
                            <div className="left font-bold">{e.time}</div>
                        </div>
                    );
                })}
                <div className={`col-span-12 lg:col-span-5 flex flex-col justify-center mt-6 lg:mt-0 mb-12 lg:mb-0 `}>
                    {/* <P>{dangerouslySetInnerHTML={createMarkup(data.text)}} </P> */}
                    <div className="flex mt-10 space-x-12 items-center">
                        <img src={Pin.src} alt="" />

                        <p
                            className="text-sm linker text-textColor sm:text-base font-sans font-[500]  xl:leading-relaxed lg:text-base xl:text-sm 2xl:text-base"
                            dangerouslySetInnerHTML={createMarkup(dataKontakt.adresse)}
                        />
                    </div>
                    {/* <div className="flex mt-10 space-x-12 items-center">
                        <img src={Phone.src} alt="" />
                        <P>{dataKontakt.telefon}</P>
                    </div> */}
                    <div className="flex mt-10 space-x-12 items-center">
                        <img src={Mail.src} alt="" />
                        <P>
                            {" "}
                            <a href={`mailto:${"cafe@mainglueckskind.de"}`}></a> {"cafe@mainglueckskind.de"}
                        </P>
                    </div>
                </div>
            </div>
            <div className="xl:col-span-6 pl-8">
                {image ? (
                    <CoverImage
                        key={"imageresver"}
                        src={urlFor(image).url()}
                        mobileSrc={urlFor(image).url()}
                        alt="Cover Background"
                        // style={{ aspectRatio: data.image.length > 1 ? "1/2" : "1/1" }}
                        className={`w-full z-20 relative rounded-[40px] overflow-hidden aspect-[1/1.5] xl:aspect-[1/1.25]
                    }`}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default Öffnungszeiten;
