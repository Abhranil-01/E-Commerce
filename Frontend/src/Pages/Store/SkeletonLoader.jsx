import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './style.scss';

function SkeletonLoader() {
  const renderSkeletonCards = (numCards) => {
    return Array.from({ length: numCards }).map((_, index) => (
      <div key={index} className="col p-0 p-md-2 ">
        <div className="card rounded-0 p-0 skeleton-shopcard">
          <div className="image-part">
            <Skeleton style={{ height: "100%" }} />
          </div>
          <div className="card-body ">
            <h5 className="card-title">
              <Skeleton width={120} />
            </h5>
            <p className="card-text text-capitalize">
              <Skeleton  width={160}/>
            </p>
            <p className="card-text fw-bold">
              <Skeleton width={100} />
            </p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="container mt-5 filter-button ">
        <div className="row d-flex justify-content-end">
          <div
            className="col-4 col-md-2 p-0  me-3 filter  "
           
          >
              <Skeleton style={{height:"100%"}}/>
          </div>
        
        </div>
      </div>
      <div className="container my-3">
        <div className="my-4 row row-cols-2 row-cols-lg-4 row-cols-md-2 ">
          {renderSkeletonCards(8)}
        </div>
      </div>
    </>
  );
}

export default SkeletonLoader;
