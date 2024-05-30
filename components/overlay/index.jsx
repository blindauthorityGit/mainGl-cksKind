import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = ({ onClick }) => {
    return (
        <>
            {/* Use AnimatePresence to enable exit animations */}
            <motion.div
                className="fixed inset-0 bg-black opacity-70 z-30"
                onClick={onClick} // Call the onClick function passed as a prop
                initial={{ opacity: 0 }} // Initial state (hidden)
                animate={{ opacity: 0.7 }} // Animation state (visible)
                exit={{ opacity: 0 }} // Exit state (hidden)
            />
        </>
    );
};

export default Overlay;
