import React, { useState } from "react";
import "./style.scss"
function SizeBox({ value, onClick }) {
  const [addColor,setAddColor]=useState("")
  const handleClick = () => {
    setAddColor("")
    onClick(value); // Pass the size value to the parent component
    setAddColor("border-black");
  };

  return (
    <div className="col">
      <div
        className={`size-box text-center fw-bold ${addColor} `}
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        {value}
      </div>
    </div>
  );
}

export default SizeBox;
