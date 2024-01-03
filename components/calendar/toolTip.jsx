import React, { useEffect } from "react";

import { H4, P } from "../typography";

const ToolTip = ({ data }) => {
    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className="absolute w-[400px] p-8 bottom-[2rem]" style={{ background: data.kategorie.farbe.value }}>
            <H4 klasse="hidden lg:block">{data.headline}</H4>
        </div>
    );
};

export default ToolTip;
