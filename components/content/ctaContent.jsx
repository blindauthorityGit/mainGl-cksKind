import React from "react";

//TYPO
import { H1, P } from "../typography";

//COMPO
import { MainButton } from "../buttons";

const CTAContent = ({ data }) => {
    return (
        <div className="col-span-12 px-6 lg:px-48 text-center flex flex-col items-center">
            <H1 klasse="!text-white">{data.headline}</H1>
            <div className="2xl:w-2/4 pt-3 lg:mt-6">
                <P>{data.text}</P>
            </div>
            {/* {data?.button && <MainButton link={data?.button.link}>{data?.button.label}</MainButton>} */}
        </div>
    );
};

export default CTAContent;
