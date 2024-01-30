import React, { useEffect } from "react";

//TYPO
import { H2, P } from "../typography";

//COMPONENTS
import { CoverImage } from "../images";
import { MainButton, MainButtonNOLink } from "../buttons";
import { BasicPortableText } from "./";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

//ANIMATIONM
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TextImage = ({ data, overlap, richText, onClick, noLink }) => {
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

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: data.rightImage ? 50 : -50 }}
            animate={controls}
            variants={variants}
            className="col-span-12 grid grid-cols-12 px-6 xl:px-12 2xl:px-24 "
        >
            <div
                className={`col-span-12 lg:col-span-6 2xl:col-span-5 flex flex-col justify-center mt-6 lg:mt-0 mb-12 lg:mb-0   ${
                    !data.rightImage ? "order-last lg:pl-12 2xl:pl-36" : "lg:pr-36 order-last lg:order-first"
                }`}
            >
                <H2 klasse="">{data.headline}</H2>
                {richText ? <BasicPortableText value={data.text}></BasicPortableText> : <P>{data.text}</P>}
                {/* <P>{data.text}</P> */}
                {noLink ? (
                    <MainButtonNOLink
                        klasse={` max-w-[20rem] mt-8 lg:mt-12 ${
                            data.button.HauptButton
                                ? "bg-primaryColor border-2 border-primaryColor"
                                : "border-2 border-primaryColor-50"
                        }`}
                        onClick={onClick}
                    >
                        {data.button.label}
                    </MainButtonNOLink>
                ) : (
                    <MainButton
                        klasse={` max-w-[20rem] mt-8 lg:mt-12 ${
                            data.button.HauptButton
                                ? "bg-primaryColor border-2 border-primaryColor"
                                : "border-2 border-primaryColor-50"
                        }`}
                        link={data.button.link}
                    >
                        {data.button.label}
                    </MainButton>
                )}
            </div>
            <div
                className={`col-span-12 lg:col-span-6 2xl:col-span-7 grid grid-cols-12 gap-2 lg:gap-8 ${
                    overlap ? "xl:mt-[-3rem]" : "lg:mt-[-3rem]"
                }`}
            >
                {data.image.map((e, i) => {
                    return (
                        <CoverImage
                            key={i}
                            src={urlFor(e).url()}
                            mobileSrc={urlFor(e).url()}
                            alt="Cover Background"
                            // style={{ aspectRatio: data.image.length > 1 ? "1/2" : "1/1" }}
                            className={`w-full z-20 relative rounded-[40px] overflow-hidden ${
                                data.image.length > 1
                                    ? "col-span-6 aspect-[1/1.5] xl:aspect-[1/2]"
                                    : "col-span-12 aspect-[1/0.7] xl:aspect-[1/1]"
                            }`}
                        />
                    );
                })}
            </div>
        </motion.div>
    );
};

export default TextImage;
