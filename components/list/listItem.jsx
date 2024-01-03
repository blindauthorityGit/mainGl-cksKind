import React from "react";
import Link from "next/link";

import { H4, P } from "../typography";

const ListItem = ({ data }) => {
    return (
        <div className={` font-bold  text-textColor col-span-12 lg:mb-5`}>
            <div className="flex w-full justify-between !text-[#FFC5DA]">
                <H4 klasse="!text-[#FFC5DA]">{data.title}</H4>
                <H4 klasse="!text-[#FFC5DA]">{data.price}</H4>
            </div>
            <P klasse="text-white">{data.description}</P>
        </div>
    );
};
export default ListItem;
