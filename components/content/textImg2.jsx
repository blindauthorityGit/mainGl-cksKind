import React, { useEffect, useRef } from "react";

//TYPO
import { H2, P } from "../typography";

//COMPONENTS
import { CoverImage } from "../images";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

//ANIMATIONM
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TextImage2 = ({ data, overlap }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-150px 0px", // Adjust the rootMargin for the threshold
    });

    const hRef = useRef();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    useEffect(() => {
        console.log(hRef.current.clientHeight);
    }, [hRef.current]);

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
            initial="hidden"
            animate={controls}
            variants={variants}
            className="col-span-12 grid grid-cols-12 px-6 lg:px-24"
        >
            <div
                className={`col-span-12 lg:col-span-5 relative flex flex-col justify-center mt-6 lg:mt-0 mb-12 lg:mb-0   ${
                    !data.rightImage ? "order-last xl:pl-12 2xl:pl-36" : "xl:pr-12 2xl:pr-36 order-last lg:order-first"
                }`}
            >
                <div ref={hRef} className="">
                    <H2 klasse="">{data.headline}</H2>
                </div>
                {/* {hRef.current && (
                    <hr
                        style={{
                            top:
                                hRef.current.offsetTop +
                                hRef.current.children[0].clientHeight +
                                hRef.current.children[0].clientHeight / 2 +
                                "px",
                        }}
                        className="left-0 top-2/4 xl:w-[400px] 2xl:w-[650px]  h-1 border-textColor absolute"
                    />
                )} */}
                <P>{data.text}</P>
            </div>
            <div
                className={`col-span-12 lg:col-span-7 grid grid-cols-12 gap-2 lg:gap-8 ${
                    overlap ? "mt-[-3rem]" : "lg:mt-[-3rem]"
                }`}
            >
                {data.image.map((e, i) => {
                    return (
                        <CoverImage
                            key={i}
                            src={urlFor(e).url()}
                            mobileSrc={urlFor(e).url()}
                            alt="Cover Background"
                            style={{ aspectRatio: data.image.length > 1 ? "1/2" : "1/1" }}
                            className={`w-full z-20 relative rounded-[40px] overflow-hidden ${
                                data.image.length > 1 ? "col-span-6" : "col-span-12"
                            }`}
                        />
                    );
                })}
            </div>
        </motion.div>
    );
};

export default TextImage2;
