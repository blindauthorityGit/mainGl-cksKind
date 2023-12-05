import React from "react";

import { MdOutlineClose } from "react-icons/md";
const Modal = (props) => {
    return (
        <div className="fixed overflow-y-auto max-h-[100%] fade-in w-[90%] lg:w-[80%] min-h-[80%] h-[80%] bg-white p-8 lg:p-12 xl:p-24 z-50  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
                className="closer absolute top-6 right-6 text-4xl cursor-pointer transition hover:opacity-50 z-50"
                onClick={props.onClick}
            >
                <MdOutlineClose></MdOutlineClose>
            </div>
            {props.children}
        </div>
    );
};

export default Modal;
