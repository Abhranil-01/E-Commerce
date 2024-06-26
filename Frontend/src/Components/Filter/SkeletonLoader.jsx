import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
function SkeletonLoader() {
  return (
    <>
       <div className="row w-100 p-0">
          <div className="col-lg-4 col-md-8 col-12 h-100 filter-box py-2">
            <div className="heading d-flex align-items-center justify-content-between px-3">
              <h2>FILTER</h2>
              <span className="fw-bold fs-4" >
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
            <div className="scroll">
              <div className="box-dropdown py-2 container">
                <div className="d-flex align-items-center justify-content-between fw-bold">
                  <span>APPLIED FILTERS</span>
                </div>
                <div className="container my-4">
                  <div className="d-flex gap-3">
                  <p>No Filter Found</p>
                  </div>
                </div>
              </div>
              <div className="box-dropdown py-2">
                <div className="d-flex align-items-center justify-content-between fw-bold px-3">
                  <span>PRICE</span>
                </div>
                <div className="price mt-3 px-3 flex-column gap-2">
                  <Skeleton/>
                </div>
              </div>
        <Skeleton height={180}/>
     
            </div>
          </div>
        </div>
    </>
  )
}

export default SkeletonLoader
