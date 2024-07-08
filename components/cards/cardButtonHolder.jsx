import React from "react";

//COMPS
import CardButton from "./cardButton";

//TYPO
import { H2, H4, P } from "../typography";

const CardButtonHolder = ({ data, klasse, onClick, isCafe }) => {
    return (
        <>
            <div className={`col-span-12  grid-cols-12 gap-4 xl:gap-8 px-6 xl:px-24 hidden lg:grid ${klasse}`}>
                {data.map((e, i) => {
                    return <CardButton isCafe={isCafe} onClick={onClick} i={i} data={e}></CardButton>;
                })}
            </div>
        </>
    );
};

export default CardButtonHolder;
