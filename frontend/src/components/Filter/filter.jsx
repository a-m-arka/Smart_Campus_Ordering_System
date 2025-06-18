import React from "react";
import "./filter.scss";

const Filter = ({ filters, onFilterChange }) => {
    const handleChange = (e, filterName) => {
        onFilterChange(filterName, e.target.value);
    };

    return (
        <div className="filter-container">
            {filters.map((filter) => (
                <div className="filter-group" key={filter.name}>
                    <div className="filter-label">
                        {filter.name}
                    </div>
                    <select
                        className="filter-select"
                        onChange={(e) => handleChange(e, filter.name)}
                    >
                        <option value="">All</option>
                        {filter.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};

export default Filter;
