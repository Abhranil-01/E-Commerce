import React from "react";

function CheckBox({ id, label, isChecked, onClick }) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        id={id}
        value={label}
        checked={isChecked}
        onChange={onClick}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
