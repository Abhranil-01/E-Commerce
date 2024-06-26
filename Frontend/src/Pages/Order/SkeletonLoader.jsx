import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './style.scss'

function SkeletonLoader() {
  return (
    <>
      <div className="container" style={{ marginTop: "120px" }}>
        <h3><Skeleton width={150}/></h3>
        <div className="row mt-4 gap-3">
          {Array(4).fill().map((_, index) => (
            <div className='order-card-skeleton' key={index}>
              <Skeleton style={{height:"100%"}}/>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SkeletonLoader
