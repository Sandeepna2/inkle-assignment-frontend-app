import React, { useState } from "react";
import { Filter } from "lucide-react";

function TableFilter({ options, onFilterChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggle = () => setOpen(!open);

  const handleSelect = (value) => {
    let updated;

    if (selected.includes(value)) {
      updated = selected.filter((v) => v !== value);
    } else {
      updated = [...selected, value];
    }

    setSelected(updated);
    onFilterChange(updated);
  };

  return (
    <div className="filter-container">
      <Filter size={16} onClick={toggle} className="filter-icon" />

      {open && (
        <div className="filter-dropdown fade-in">
          {options.map((country, idx) => (
            <div
              key={idx}
              className="filter-item"
              onClick={() => handleSelect(country)}
            >
              <span>{country}</span>

              <input
                type="checkbox"
                checked={selected.includes(country)}
                readOnly
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TableFilter;
