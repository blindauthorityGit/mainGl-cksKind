import React, { useEffect } from "react";
import Link from "next/link";

//TYPO
import { H2, P } from "../typography";

//COMPONENTS
import { CoverImage } from "../images";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

const RegularText = ({ data, isWorkshop, link }) => {
    useEffect(() => {}, []);

    return (
        <div className="col-span-12 px-6 xl:ml-8 2xl:ml-28  ">
            <H2 klasse={`${isWorkshop ? "!text-white" : null}`}>{data.title}</H2>
            <div className=" pt-3 w-full lg:mt-6 xl:flex ">
                <Link href={link ? "/partner/" + link : "#"}>
                    <CoverImage
                        key={"bubu"}
                        src={urlFor(data.image).url()}
                        mobileSrc={urlFor(data.image).url()}
                        alt="Cover Background"
                        // style={{ aspectRatio: data.image.length > 1 ? "1/2" : "1/1" }}
                        className={`w-full lg:w-[400px] z-20  relative rounded-[10px] overflow-hidden  ${
                            data.image.length > 1
                                ? "col-span-6  xl:aspect-[1/2]"
                                : "col-span-12 aspect-[1/0.66] xl:aspect-[1/1]"
                        }`}
                    />
                </Link>
                <P klasse={`md:px-8 xl:w-2/4 mt-6 lg:mt-0 ${isWorkshop ? "!text-blueColor-100" : null}`}>
                    {data.beschreibung}
                </P>
            </div>
            {/* {data?.button && <MainButton link={data?.button.link}>{data?.button.label}</MainButton>} */}
        </div>
    );
};

export default RegularText;
