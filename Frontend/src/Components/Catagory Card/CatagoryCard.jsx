import React from "react";
import { useNavigate } from "react-router-dom";

function CatagoryCard({id,title,image}) {
  const navigate=useNavigate()
  const nav=title.toLowerCase()
 
   const handleClick=()=>{
   navigate(`/items/${nav}/${id}`)
   }
  return (
    <>
  <div className="col">
        <div class="card  rounded-0  " style={{ cursor: "pointer" }}>
          <img
            src={image}
            class="card-img-top rounded-0 position-relative "
            alt="..."
          />
          <div
            className="d-flex align-items-center justify-content-center position-absolute  text-white w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.220)" }}
            onClick={handleClick}
          >
            <h1>{title}</h1>
          </div>
        </div>
      </div>
     
    </>
  );
}

export default CatagoryCard;
