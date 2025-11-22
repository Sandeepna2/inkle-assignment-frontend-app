import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function CountryDropdown({ countries, selectedId, onSelect }) {
  const [open, setOpen] = useState(false);

  const selectedCountry = countries.find((c) => c.id === selectedId);

  return (
    <div className="dropdown-container">
      <div
        className={`dropdown-box ${open ? "dropdown-box-open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span className={selectedCountry ? "" : "dropdown-placeholder"}>
          {selectedCountry ? selectedCountry.name : "Select country"}
        </span>
        <ChevronDown size={18} />
      </div>

      {open && (
        <div className="dropdown-menu">
          {countries.map((c) => (
            <div
              key={c.id}
              className="dropdown-item"
              onClick={() => {
                onSelect(c);
                setOpen(false);
              }}
            >
              <span>{c.name}</span>
              {selectedId === c.id && <Check size={16} className="check-icon" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
