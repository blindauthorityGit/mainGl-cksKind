import React, { useRef } from "react";
import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

import useStore from "../../store/store";

const Modal = (props) => {
    const resetModalHeight = useStore((state) => state.resetModalHeight);

    const isFullHeightModal = useStore((state) => state.isFullHeightModal);

    const modalRef = useRef();

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            // Clicked outside the modal
            //Close the modal
            console.log("I CLICKED OUTSIDE");
            props.onClick();
            resetModalHeight();
        }
    };

    const closeModal = () => {
        props.onClick(); // Assuming this is your method to close the modal
        resetModalHeight(); // Reset the isFullHeightModal state to false
    };

    const modalClassNames = `w-full relative rounded-xl transition-colors duration-500 max-w-[98%] min-h-[80%] lg:h-auto 2xl:min-h-[66%] lg:max-w-[80%] 2xl:max-w-[60%] lg:max-h-full bg-white py-6 px-6 md:p-12 lg:p-12 xl:p-16 overflow-y-auto ${
        isFullHeightModal ? "!h-full" : ""
    }`;

    return (
        <div onClick={handleClickOutside} className="fixed z-[99] inset-0 flex items-center justify-center p-2 lg:z-50">
            <motion.div
                ref={modalRef}
                className={modalClassNames}
                style={{ maxHeight: "90vh", background: props.background }} // Setzen Sie die maximale Höhe und fügen Sie overflow-y hinzu
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <div
                    className="closer absolute top-2 right-2 text-xl lg:text-4xl cursor-pointer transition hover:opacity-50 z-50"
                    onClick={closeModal}
                >
                    <MdOutlineClose />
                </div>
                {props.children}
            </motion.div>
        </div>
    );
};

export default Modal;
