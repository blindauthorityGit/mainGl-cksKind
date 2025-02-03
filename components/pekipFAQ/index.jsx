import React, { useState } from "react";
import BulletIcon from "../../assets/icons/bullet.svg"; // Custom bullet point SVG
import { H2, P } from "../typography";

// Data Object for List & FAQ
const contentData = {
    headline: "Das macht unsere PEKiP-Kurse besonders",
    subline: "Hier findest du Antworten auf die wichtigsten Fragen.",
    listItems: [
        "Feste, altersgerechte Gruppen für ein ganzes Jahr.",
        "Spielerische Förderung deines Babys und Unterstützung seiner Entwicklung.",
        "Austausch und Vernetzung mit anderen Eltern.",
        "Liebevolle Betreuung durch erfahrene Kursleiterinnen.",
    ],
    faq: [
        {
            question: "Kann ich mir einen bestimmten Tag oder eine Uhrzeit aussuchen?",
            answer: "Nein, die Kurse werden von uns nach Altersstruktur und Verfügbarkeit zusammengestellt.",
        },
        {
            question: "Wie lange dauert ein Kurs?",
            answer: "Die Kurse laufen in der Regel ein Jahr lang in festen Gruppen.",
        },
        {
            question: "Was passiert, wenn kein Platz frei ist?",
            answer: "Deine Vormerkung bleibt aktiv, und wir melden uns bei dir, sobald ein Platz verfügbar ist.",
        },
    ],
};

const FAQSection = ({ data }) => {
    const [openIndex, setOpenIndex] = useState(null);

    // Toggle FAQ visibility
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full lg:max-w-6xl mx-auto py-12 px-6">
            {/* Headline & Subline */}
            <H2 className="text-center">{data.specials.headline}</H2>

            {/* Custom Bullet List */}
            <ul className="mb-10 space-y-3">
                {contentData.listItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <img src={BulletIcon.src} alt="Bullet Point" className="w-4 h-4 mr-2" />
                        <P>{item}</P>
                    </li>
                ))}
            </ul>

            {/* FAQ Section */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <H2 className="text-lg font-semibold mb-4">FAQ</H2>
                {data.faq.map((faq, index) => (
                    <div key={index} className="border-b border-gray-300">
                        <button
                            className="w-full text-left py-3 px-4 flex bg-textColor text-white justify-between items-center font-medium focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <div
                                className={`transform transition-transform  ${openIndex === index ? "rotate-180" : ""}`}
                            >
                                ▼
                            </div>
                        </button>
                        {openIndex === index && <P klasse="p-4">{faq.answer}</P>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
