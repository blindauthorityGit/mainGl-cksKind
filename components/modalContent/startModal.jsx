import React from "react";

import { BasicPortableText } from "../content/";

//ASSETS
// import Getreide from "../../assets/SVG/getreide.svg";

const StartModal = ({ data }) => {
    return (
        <div className="container mx-auto grid-cols-12 flex flex-grow items-center text-center">
            <div className="col-span-12">
                <BasicPortableText value={data}></BasicPortableText>
            </div>
        </div>
    );
};

export default StartModal;
