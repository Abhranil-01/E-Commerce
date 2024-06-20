import React, { useEffect, useState } from "react";
import ReviewCard from "../ReviewCard/ReviewCard";
import RatingProgressBar from "../RatingProgressBar/RatingProgressBar";
import "./style.scss";
import { getToken } from "../../services/LocalStorage/LocalStorage";
function ProductPageReview({ reviews, totalRating, avg, ratings }) {
  console.log('jhugo[tggfuv',reviews);

  return (
    <>
      <div className="col-12">
        <h4>Reviews</h4>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-12 col-md-5 border border-secondary ">
            <div className="row ">
              <div className="col-md-12 col-6 d-flex flex-column align-items-center ">
                <h1>{totalRating !== 0 ? avg : (0).toFixed(1)}</h1>
                <div className="outer-star position-relative fs-1 ">
                  <div
                    className="inner-star position-absolute top-0 start-0 fs-1 "
                    style={{ width: `${(avg / 5) * 100}%` }}
                  ></div>
                </div>

                <p>{reviews.data.length} Reviews</p>
              </div>

              <div className="col-md-12 col-6 mt-md-4 ">
                <div className="row gap-1">
                  {ratings.map((element, index) => (
                    <RatingProgressBar
                      key={index}
                      rating={element}
                      totalRating={totalRating}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-12 border border-dark">
            <div className="row ">
              {reviews.data.map((element) => (
                <ReviewCard key={element.id} element={element.attributes} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPageReview;
