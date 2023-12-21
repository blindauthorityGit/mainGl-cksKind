import React from "react";

//TYPO
import { H2, P } from "../typography";

//COMPONENTS
import { CoverImage } from "../images";

//FUNCTIONS
import urlFor from "../../functions/urlFor";

const RegularText = ({ data }) => {
    return (
        <div className="col-span-12 px-6 lg:ml-28  ">
            <H2 klasse="">{data.title}</H2>
            <div className=" pt-3 lg:mt-6 flex ">
                <CoverImage
                    key={"bubu"}
                    src={urlFor(data.image).url()}
                    mobileSrc={urlFor(data.image).url()}
                    alt="Cover Background"
                    style={{ aspectRatio: data.image.length > 1 ? "1/2" : "1/1" }}
                    className={`lg:w-[400px] z-20  relative rounded-[40px] overflow-hidden  ${
                        data.image.length > 1 ? "col-span-6" : "col-span-12"
                    }`}
                />
                <P klasse="px-8 w-2/4">{data.beschreibung}</P>
            </div>
            {/* {data?.button && <MainButton link={data?.button.link}>{data?.button.label}</MainButton>} */}
        </div>
    );
};

export default RegularText;
