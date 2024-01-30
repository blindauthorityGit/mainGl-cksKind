import React, { useEffect } from "react";

//TYPO
import { H2, P } from "../typography";

//COMPONENTS
import { CoverImage } from "../images";
import Map from "../map";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

//ASSETS
import Pin from "../../assets/pinPink.svg";
import Phone from "../../assets/phonePink.svg";
import Mail from "../../assets/mailPink.svg";

//ANIMATIONM
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Contact = ({ data, overlap }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-150px 0px", // Adjust the rootMargin for the threshold
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    const variants = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                bounce: 0.8,
            },
        },
        hidden: { opacity: 0, x: data.rightImage ? 50 : -50 },
    };

    // Method to create an object for dangerouslySetInnerHTML
    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className="col-span-12 grid grid-cols-12 px-6 lg:px-24"
        >
            <div className={`col-span-12 lg:col-span-5 flex flex-col justify-center mt-6 lg:mt-0 mb-12 lg:mb-0 `}>
                <H2 klasse="">{data.headline}</H2>
                <p
                    className="text-sm linker text-textColor sm:text-base font-sans font-[500]  xl:leading-relaxed lg:text-base xl:text-sm 2xl:text-base"
                    dangerouslySetInnerHTML={createMarkup(data.text)}
                />

                {/* <P>{dangerouslySetInnerHTML={createMarkup(data.text)}} </P> */}
                <div className="flex mt-10 space-x-12 items-center">
                    <img src={Pin.src} alt="" />

                    <p
                        className="text-sm linker text-textColor sm:text-base font-sans font-[500]  xl:leading-relaxed lg:text-base xl:text-sm 2xl:text-base"
                        dangerouslySetInnerHTML={createMarkup(data.adresse)}
                    />
                </div>
                <div className="flex mt-10 space-x-12 items-center">
                    <img src={Phone.src} alt="" />
                    <P>{data.telefon}</P>
                </div>
                <div className="flex mt-10 space-x-12 items-center">
                    <img src={Mail.src} alt="" />
                    <P>
                        {" "}
                        <a href={`mailto:${data.email}`}></a> {data.email}
                    </P>
                </div>
            </div>
            <div className={`col-span-12 lg:col-span-7 lg:pl-36 ${overlap ? "mt-[-3rem]" : "lg:mt-[-3rem]"}`}>
                <Map></Map>
            </div>
        </motion.div>
    );
};

export default Contact;
