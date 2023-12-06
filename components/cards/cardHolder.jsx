import React from "react";

//COMPS
import Card from "./card";

//TYPO
import { H2, H4, P } from "../typography";

const CardHolder = ({ data }) => {
    return (
        <>
            <H2 klasse="col-span-12">Unser Angebot</H2>

            <div className="col-span-12 grid grid-cols-12 lg:gap-8 px-8 lg:px-24">
                {data.map((e, i) => {
                    return <Card i={i} data={e}></Card>;
                })}
            </div>
        </>
    );
};

export default CardHolder;
