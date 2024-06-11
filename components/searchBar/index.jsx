import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa"; // Assuming you are using react-icons for icons

const SearchBar = ({ data, onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Implement the search logic here
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setSearchTerm("");
            onSearch(""); // Reset search when closing
        }
    };

    return (
        <>
            <div className="absolute right-0 top-[-0.35rem] flex items-center z-20 ">
                <button onClick={handleToggle} className="p-2">
                    {isOpen ? <FaTimes size={24} /> : <FaSearch size={24} />}
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.input
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Suchen..."
                        className="absolute font-sans right-0 top-[-0.35rem] w-full lg:w-2/4 p-2 border rounded shadow"
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default SearchBar;
