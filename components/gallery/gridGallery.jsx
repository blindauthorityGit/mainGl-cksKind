import React, { useEffect, useState } from "react";

//COMPONENTS
import { CoverImage } from "../images";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

// TYPO
import { H2, H4, P } from "../typography";

const GridGallery = ({ data }) => {
    useEffect(() => {}, [data]);

    return (
        <>
            <div className="col-span-12 grid grid-cols-12 lg:gap-8 px-6 lg:px-24 lg:mt-[-3rem]">
                {data.map((e, i) => {
                    return (
                        <CoverImage
                            key={i}
                            src={urlFor(e).url()}
                            mobileSrc={urlFor(e).url()}
                            alt="Cover Background"
                            style={{ aspectRatio: "1/1" }}
                            className={`w-full z-20 relative rounded-[40px] overflow-hidden col-span-3 `}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default GridGallery;
