import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-container grid grid-cols-12 gap-8 p-16 bg-primaryColor-100 fixed z-50 w-[60%] min-h-[80%]  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5 } }}
                    exit={{ opacity: 0 }}
                >
                    <div
                        className="closer absolute top-6 right-6 text-4xl cursor-pointer transition hover:opacity-50 z-50"
                        onClick={onClose}
                    >
                        <MdOutlineClose></MdOutlineClose>
                    </div>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
