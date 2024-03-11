import React, { useEffect, useState } from "react";

//COMPONENTS
import { CoverImage } from "../images";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

// TYPO
import { H2, H4, P } from "../typography";

const GridGallery = ({ data, big, selectedImage, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(selectedImage);

    useEffect(() => {
        setCurrentIndex(selectedImage);
    }, [selectedImage]);

    return (
        <>
            <div className="col-span-12 grid grid-cols-12 gap-2 lg:gap-8 px-6 lg:px-24 mt-[-1rem] lg:mt-[-3rem]">
                {data.map((e, i) => {
                    return (
                        <CoverImage
                            key={i}
                            src={urlFor(e).url()}
                            mobileSrc={urlFor(e).url()}
                            alt="Cover Background"
                            style={{ aspectRatio: big ? "1/1.5" : "1/1" }}
                            className={`w-full z-20 relative rounded-[20px] lg:rounded-[40px] overflow-hidden col-span-4 ${
                                big ? "lg:col-span-4" : "lg:col-span-3"
                            } `}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default GridGallery;
