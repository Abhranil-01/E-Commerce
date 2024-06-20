import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function RatingProgressBar({rating,totalRating}) {

  const progress = totalRating !== 0 ? (rating.count / totalRating) * 100 : 0;
  return (
    <>
      <div className="col-12  ">
       
        <div className="d-flex align-items-center justify-content-center fs-5  p-0 ">
          {" "}
          {rating.star} <span>&#9733;</span>
          <div className="border border-dark rounded-2 w-50  " style={{height:"8px"}}>
          <div className="h-100 bg-dark rounded-2" style={{ width: `${progress}%` }}></div>

          </div>
          <small>{rating.count}</small>
        </div>
        
       
   
      </div>
    </>
  );
}

export default RatingProgressBar;
