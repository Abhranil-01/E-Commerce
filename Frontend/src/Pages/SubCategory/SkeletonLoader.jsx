import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss'
const SkeletonLoader = () => {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <div className="col" key={index}>
          <div className="card ">
            <div className="sub-card">
            <Skeleton style={{height:"100%",width:"100%"}}  duration={50}/>
            </div>
       
          
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
