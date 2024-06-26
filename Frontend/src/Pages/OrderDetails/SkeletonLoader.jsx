import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import './style.scss';
function SkeletonLoader() {
  return (
   <>
    <div className="col-12">
                    <div className="card my-3 border-0">
                      <div className="row g-0">
                        <div className="col-md-4 col-6 m-auto order-details-card-image " >
                          {/* <img
                            src={`${singleProduct.data.attributes.image.data[0].attributes.url}`}
                            alt={singleProduct.data.attributes.titleOne}
                            className="img-fluid rounded-start"
                          /> */}
                          <Skeleton style={{height:"100%"}}/>
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                            
                            </h5>
                            <p className="card-text">
                            <Skeleton/>
                            </p>
                            <p className="card-text">
                            <Skeleton/>
                            </p>
                            <p className="card-text">
                            <Skeleton/>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                   
                        <div className="card border-0 mb-3">
                          <div className="card-body">
                            <h4 className="card-title">     <Skeleton/></h4>
                            <p className="card-text">
                            <Skeleton/>
                            </p>
                            <p className="card-text">
                            <Skeleton/> 
                            <Skeleton/>
                            <Skeleton/>
                            <Skeleton/>
                            </p>
                          </div>
                        </div>
                    
                  </div>
                  
                    <div className="col-12" style={{ marginTop: "80px" }}>
                      <div className="row">
                        <div className="col-6">
                        <Skeleton/>
                        </div>
                        <div className="col-6">
                        <Skeleton/>
                        </div>
                      </div>
                    </div>
                   
                  </>
  )
}

export default SkeletonLoader
