import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { H2, P } from "../../typography";
import useStore from "../../../store/store"; // Adjust the path as necessary
import Star from "../../../assets/star.svg";
import Google from "../../../assets/google.svg";

import { MainButton } from "../../buttons";

const ThankYou = ({ data, events }) => {
    useEffect(() => {}, []);

    const containerVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    };

    const starVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (i) => ({
            scale: [1.2, 1],
            opacity: 1,
            transition: {
                delay: 0.5 + i * 0.2, // 0.5 seconds delay for container animation to complete
                type: "spring",
                stiffness: 300,
                damping: 20,
            },
        }),
    };

    return (
        <motion.div
            className="container mx-auto grid grid-cols-12 sm:gap-8 font-sans"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="col-span-12 xl:col-span-6 text-center ">
                <H2 klasse={`mb-3 mt-2`}>Wir freuen uns auf dich!</H2>
                <P>
                    Wir würden uns riesig freuen, wenn Du dir einen Moment Zeit nehmen könntest, um Deine Erfahrungen
                    auf Google zu teilen. Dein Feedback hilft uns, noch mehr strahlende Kinderaugen zu sehen!
                </P>
                <div className="flex space-x-4 justify-center mt-8">
                    {Array.from({ length: 5 }, (_, index) => (
                        <motion.img
                            key={index}
                            src={Star.src}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={starVariants}
                            className="w-8 h-8"
                        />
                    ))}
                </div>
                <div className="flex justify-center mt-6">
                    <img src={Google.src} alt="" />
                </div>
                {/* <MainButton link="#" klasse="bg-primaryColor">
                    {" "}
                    Jetzt bewerten
                </MainButton> */}
            </div>
        </motion.div>
    );
};

export default ThankYou;
