import React from "react";

//TYPO
import { H1, P } from "../typography";

//COMPO
import { MainButton, MainButtonNOLink } from "../buttons";

const CTAContentButton = ({ data, onClick }) => {
    return (
        <div className="col-span-12 px-6 lg:px-48 text-center flex flex-col items-center">
            <H1 klasse="!text-white">{data.headline}</H1>
            <div className="2xl:w-2/4 pt-3 lg:mt-6">
                <P>{data.text}</P>
            </div>
            {data?.button && (
                <MainButtonNOLink
                    klasse="bg-primaryColor border-2 border-primaryColor mt-16 mx-auto max-w-[16rem]"
                    // link={data?.button.link}
                    onClick={onClick}
                >
                    {data?.button.label}
                </MainButtonNOLink>
            )}
        </div>
    );
};

export default CTAContentButton;
