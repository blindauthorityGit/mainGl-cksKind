import React from "react";

//COMPS
import CardButton from "./cardButton";

//TYPO
import { H2, H4, P } from "../typography";

const CardButtonHolder = ({ data, klasse }) => {
    return (
        <>
            <div className={`col-span-12 grid grid-cols-12 lg:gap-8 px-6 lg:px-24 ${klasse}`}>
                {data.map((e, i) => {
                    return <CardButton i={i} data={e}></CardButton>;
                })}
            </div>
        </>
    );
};

export default CardButtonHolder;
