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
        <div onClick={handleClickOutside} className="fixed  inset-0 flex items-center justify-center p-2 z-50">
            <motion.div
                ref={modalRef}
                className="w-full relative rounded-xl modalClass transition-colors duration-500 max-w-[90%] h-[80%] lg:h-auto 2xl:min-h-[66%] lg:max-w-[80%] 2xl:max-w-[60%] max-h-full bg-white py-4 px-4 md:p-12 lg:p-12 xl:p-16 "
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ background: props.background }}
            >
                <div
                    className="closer absolute top-2 right-2 text-xl lg:text-4xl cursor-pointer transition hover:opacity-50 z-50"
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
