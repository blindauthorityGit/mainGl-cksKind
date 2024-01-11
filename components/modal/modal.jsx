import React, { useRef } from "react";
import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

const Modal = (props) => {
    const modalRef = useRef();

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            // Clicked outside the modal
            //Close the modal
            props.onClick();
        }
    };

    return (
        <div onClick={handleClickOutside} className="fixed inset-0 flex items-center justify-center p-2 z-50">
            <motion.div
                ref={modalRef}
                className="w-full relative max-w-[90%] h-[70%] lg:max-w-[80%] max-h-full bg-white p-4 lg:p-12 xl:p-24 overflow-y-auto"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ background: props.background }}
            >
                <div
                    className="closer absolute top-0 right-0 text-4xl cursor-pointer transition hover:opacity-50 z-50"
                    onClick={props.onClick}
                >
                    <MdOutlineClose />
                </div>
                {props.children}
            </motion.div>
        </div>
    );
};

export default Modal;
