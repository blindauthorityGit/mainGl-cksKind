import React, { useState } from "react";

const FilterComponent = ({ dataEvents, setFilteredEvents }) => {
    const [activeFilter, setActiveFilter] = useState("Alle");
    const [showDropdown, setShowDropdown] = useState(false);

    const filters = [
        { name: "Alle", color: "#df3288" },
        { name: "Baby & Kleinkind", color: "#F3E584" },
        { name: "Schwangerschaft", color: "#C8C1E1" },
        { name: "Beratung & Workshops", color: "#3E55AB" },
    ];

    const handleFilterClick = (filterName) => {
        setActiveFilter(filterName);
        setFilteredEvents(
            filterName === "Alle" ? dataEvents : dataEvents.filter((e) => e.kategorie.name === filterName)
        );
        setShowDropdown(false);
    };

    // Mobile-specific text color logic, ensuring background colors are also correctly applied
    const getMobileStyles = (filterName, isActive) => {
        let textColor = "text-textColor"; // Default text color
        let backgroundColor = "white"; // Default background color for non-active buttons

        if (isActive) {
            backgroundColor = filters.find((filter) => filter.name === filterName).color; // Apply specific background color for active button
            textColor =
                filterName === "Alle"
                    ? "text-primaryColor-50"
                    : filterName === "Beratung & Workshops"
                    ? "text-blueColor-50"
                    : "text-white"; // Special text color for active "Alle" and "Beratung & Workshops"
        }

        return { backgroundColor, textColor };
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
                        {filters.map((filter) => {
                            const { textColor, backgroundColor } = getMobileStyles(
                                filter.name,
                                activeFilter === filter.name
                            );
                            return (
                                <div
                                    key={filter.name}
                                    className={`cursor-pointer text-xs px-4 py-2 w-full hover:bg-opacity-80 ${textColor}`}
                                    style={{ backgroundColor }}
                                    onClick={() => handleFilterClick(filter.name)}
                                >
                                    {filter.name}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex flex-wrap gap-2 w-full">
                {filters.map((filter) => (
                    <div
                        key={filter.name}
                        className={`cursor-pointer flex items-center justify-center text-base px-4 py-2 rounded-lg hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            filter.name === "Alle"
                                ? "text-primaryColor-50"
                                : filter.name === "Beratung & Workshops"
                                ? "text-blueColor-50"
                                : "text-textColor"
                        } ${activeFilter === filter.name ? "border-4 border-white rounded-lg" : ""}`}
                        style={{ backgroundColor: filter.color }}
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
