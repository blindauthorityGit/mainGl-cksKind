import React from "react";

// Import local SVG icons
import Icon1 from "../../assets/order/1.svg";
import Icon2 from "../../assets/order/2.svg";
import Icon3 from "../../assets/order/3.svg";
import Icon4 from "../../assets/order/4.svg";
import Icon5 from "../../assets/order/5.svg";
import Arrow from "../../assets/order/arrow.svg"; // Arrow icon between items

import { P, H2 } from "../typography";
import { BasicPortableText } from "../content";

// Control object for order boxes
const orderSteps = [
    {
        icon: Icon1,
        description:
            "Du meldest dich über unser Formular für PEKiP an und gibst an, welche Wochentage oder Zeiten dir grundsätzlich passen würden",
    },
    { icon: Icon2, description: "Deine Vormerkung landet auf unserer Warteliste" },
    { icon: Icon3, description: "Sobald ein Kursplatz frei wird oder ein neuer Kurs startet, melden wir uns bei dir" },
    { icon: Icon4, description: "Die Zuteilung erfolgt je nach Alter deines Babys und den verfügbaren Kursplätzen" },
    { icon: Icon5, description: "Wunschtage oder Wunschzeiten können wir leider nicht garantieren" },
];

const OrderBoxes = ({ data }) => {
    return (
        <>
            <div className="col-span-12 mt-16 lg:mt-20 mb-12 px-4 lg:px-36">
                <H2>{data.process.headline}</H2>
                <P>{data.process.subline}</P>
            </div>

            {/* Desktop: Icons side by side | Mobile: Icons stacked */}
            <div className="w-full col-span-12 flex justify-center py-4">
                <div className="flex flex-col md:flex-row justify-between items-center lg:items-start w-full max-w-7xl">
                    {orderSteps.map((step, index) => (
                        <React.Fragment key={index}>
                            {/* Order Box */}
                            <div className="flex flex-col items-center text-center w-[180px] min-w-[180px] mb-12 lg:mb-0 lg:min-h-[220px]">
                                <img src={step.icon.src} alt={`Step ${index + 1}`} className=" mb-2" />
                                <P className="text-sm md:text-base text-textColor">{data.process.steps[index]}</P>
                            </div>

                            {/* Arrow (Except Last Item) */}
                            {index < orderSteps.length - 1 && (
                                <div className="hidden md:hidden justify-center items-center w-[40px] min-w-[40px]">
                                    <img src={Arrow.src} alt="Next step" className="w-[30px] h-[30px]" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Positive Hinweis Section */}
            <div className="lg:col-span-4 col-span-12 bg-[#F3F3F3] p-8 rounded-2xl lg:mt-8 ml-0 md:ml-24">
                <BasicPortableText value={data.process.hinweis}></BasicPortableText>
            </div>
        </>
    );
};

export default OrderBoxes;
