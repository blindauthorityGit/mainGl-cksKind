import React, { useState } from "react";

const FilterComponent = ({ dataEvents, setFilteredEvents }) => {
    const [activeFilter, setActiveFilter] = useState("Alle");
    const [showDropdown, setShowDropdown] = useState(false);

    // Define your filters for easier management
    const filters = [
        { name: "Alle", color: "#df3288" },
        { name: "Baby & Kleinkind", color: "#F3E584" },
        { name: "Schwangerschaft", color: "#C8C1E1" },
        { name: "Beratung & Workshops", color: "#3E55AB" },
    ];

    const handleFilterClick = (filterName) => {
        setActiveFilter(filterName);
        if (filterName === "Alle") {
            setFilteredEvents(dataEvents);
        } else {
            const filtered = dataEvents.filter((e) => e.kategorie.name === filterName);
            setFilteredEvents(filtered);
        }
        setShowDropdown(false);
    };

    const getTextClass = (name) => {
        if (name === "Alle") return "text-primaryColor-50";
        if (name === "Beratung & Workshops") return "text-blueColor-50";
        return "text-textColor";
    };

    return (
        <div className="flex flex-wrap gap-4 lg:gap-2 col-span-12 m-auto mb-8 font-sans font-semibold px-8 relative">
            {/* Mobile Dropdown */}
            <div className="lg:hidden w-full">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full px-4 py-2 text-white bg-gray-500 rounded-lg"
                >
                    Kategorie wählen
                </button>
                {showDropdown && (
                    <div className="absolute mt-1 w-full shadow-lg rounded-md z-40">
                        {filters.map((filter) => (
                            <div
                                key={filter.name}
                                className={`cursor-pointer text-xs px-4 py-2 w-full hover:bg-opacity-80 ${
                                    activeFilter === filter.name ? `bg-[${filter.color}] text-white` : "bg-white"
                                }`}
                                style={{
                                    color: activeFilter === filter.name ? "white" : getTextClass(filter.name),
                                }}
                                onClick={() => handleFilterClick(filter.name)}
                            >
                                {filter.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex flex-wrap gap-2 w-full">
                {filters.map((filter) => (
                    <div
                        key={filter.name}
                        className={`cursor-pointer text-base px-4 py-2 rounded-lg hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            activeFilter === filter.name ? "border-2 border-white" : ""
                        } ${getTextClass(filter.name)}`}
                        style={{
                            backgroundColor: filter.color,
                            borderColor: activeFilter === filter.name ? "white" : "transparent",
                        }}
                        onClick={() => handleFilterClick(filter.name)}
                    >
                        {filter.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterComponent;
