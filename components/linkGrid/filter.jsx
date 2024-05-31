import React, { useState } from "react";

//ASSETS
import Down from "../../assets/Down.svg";

const FilterComponent = ({ dataEvents, setFilteredEvents }) => {
    const [activeFilter, setActiveFilter] = useState("Alle");
    const [showDropdown, setShowDropdown] = useState(false);

    const filters = [
        { name: "Alle", color: "#df3288" },
        { name: "Baby & Kleinkind", color: "#F3E584" },
        { name: "Erwachsene", color: "#C8C1E1" },
        { name: "Beratung & Coachings", color: "#3E55AB" },
    ];

    const handleFilterClick = (filterName) => {
        setActiveFilter(filterName);
        setFilteredEvents(
            filterName === "Alle" ? dataEvents : dataEvents.filter((e) => e.kategorie.name === filterName)
        );
        setShowDropdown(false);
    };

    const getTextColorClass = (filterName) => {
        console.log(filterName);
        return filterName === "Erwachsene" || filterName === "Baby & Kleinkind" ? "text-textColor" : "text-white";
    };

    // Get the color and name of the active filter
    const activeFilterObj = filters.find((filter) => filter.name === activeFilter);
    const activeFilterColor = activeFilterObj.color;
    const activeFilterTextColor = getTextColorClass(activeFilter);

    return (
        <div className="flex flex-wrap gap-4 lg:gap-2 col-span-12  mb-8 font-sans font-semibold relative">
            {/* Mobile Dropdown */}
            <div className="lg:hidden w-full">
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`w-full px-4 py-2 rounded-lg flex items-center justify-between ${activeFilterTextColor}`}
                    style={{ backgroundColor: activeFilterColor }}
                >
                    <span>{activeFilter}</span>
                    <img src={Down.src} alt="" />
                </button>
                {showDropdown && (
                    <div className="absolute mt-1 w-full shadow-lg rounded-md z-40">
                        {filters.map((filter) => {
                            const isActive = activeFilter === filter.name;
                            const textColorClass = getTextColorClass(filter.name);
                            const backgroundColor = filter.color;
                            return (
                                <div
                                    key={filter.name}
                                    className={`cursor-pointer text-xs px-4 py-2 w-full hover:bg-opacity-80 ${textColorClass}`}
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
                {filters.map((filter) => {
                    const isActive = activeFilter === filter.name;
                    const textColorClass = getTextColorClass(filter.name);
                    return (
                        <div
                            key={filter.name}
                            className={`cursor-pointer flex items-center justify-center text-base px-4 py-2 rounded-lg hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 ${textColorClass} ${
                                isActive ? "border-4 border-white rounded-lg" : ""
                            }`}
                            style={{ backgroundColor: filter.color }}
                            onClick={() => handleFilterClick(filter.name)}
                        >
                            {filter.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FilterComponent;
