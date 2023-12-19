import React from "react";

//COMPS
import Element from "./element";

//TYPO
import { H2, H4, P } from "../typography";

const LinkGrid = ({ data, headline, isWorkshop }) => {
    return (
        <>
            <H2 klasse={`col-span-12 pl-6 text-center ${isWorkshop ? "!text-white" : null}`}>{headline}</H2>

            <div className="col-span-12 grid grid-cols-12 lg:gap-8 px-6 lg:px-24">
                {data.map((e, i) => {
                    return <Element i={i} isWorkshop={isWorkshop} data={e}></Element>;
                })}
            </div>
        </>
    );
};

export default LinkGrid;
