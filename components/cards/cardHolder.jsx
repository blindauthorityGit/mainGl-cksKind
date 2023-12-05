import React from "react";

//COMPS
import Card from "./card";

const CardHolder = ({ data }) => {
    return (
        <div className="col-span-12 grid grid-cols-12 gap-8">
            {data.map((e, i) => {
                return <Card data={e}></Card>;
            })}
        </div>
    );
};

export default CardHolder;
