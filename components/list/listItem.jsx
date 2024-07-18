import React from "react";
import Link from "next/link";

import { H4, P } from "../typography";

const ListItem = ({ data }) => {
    return (
        <div className={` font-bold  text-textColor col-span-12 lg:mb-5`}>
            <div className="flex w-full justify-between !text-[#FFC5DA]">
                <H4 klasse="!text-[#FFC5DA] !text-sm lg:!text-lg">{data.title}</H4>
                <H4 klasse="!text-[#FFC5DA] !text-sm lg:!text-lg">{data.price}</H4>
            </div>
            <P klasse="text-white text-xs lg:text-sm mt-1 mb-3 lg:mb-0 lg:mt-0 max-w-[80%] lg:max-w-[100%]">
                {data.description}
            </P>
        </div>
    );
};
export default ListItem;
