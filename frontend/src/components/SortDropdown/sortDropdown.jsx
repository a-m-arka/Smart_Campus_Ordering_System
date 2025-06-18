import React from "react";
import "./sortDropdown.scss";

const SortDropdown = ({ options, onSort }) => {
  const handleChange = (e) => {
    const selectedIndex = e.target.value
    const selectedOption = options[selectedIndex]
    onSort(selectedOption)
  };

  return (
    <select className="sort-dropdown__select" onChange={handleChange} defaultValue="">
      <option value="" disabled>
        Sort ↓↑
      </option>
      {options.map((option, index) => (
        <option key={index} value={index}>
          <div className="title">
            {option.label}
          </div>
          <div className="icon">
            {option.order === 'asc' ? (
              " ↑"
            ) : (
              " ↓"
            )}
          </div>
        </option>
      ))}
    </select>
  );
};

export default SortDropdown;
