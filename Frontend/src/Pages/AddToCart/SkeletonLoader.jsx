import React from "react";
import "./style.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonLoader() {
  return (
    <>
      <div className="container-fluid mb-5  " style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-md-10 col-11 mx-auto">
            <div className="row mt-5 gx-3">
              {/* Left side */}
              <div className="col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5  p-0">
                <div className="shadow col p-3">
                  <h4 className=" border-bottom "><Skeleton/></h4>

                  <div>
                    {/* Display existing address or prompt to add address */}

                    <div class="card border-0">
                      <Skeleton height={120} />
                    </div>
                  </div>
                </div>

                {/* Cart items */}
                <div className=" shadow mt-5 container-fluid p-md-2 p-0">
                  <div className="p-3">
                    <h3 className="border-bottom">
                      <Skeleton />
                    </h3>
                  </div>

                  <div className="row gap-3 ">
                    <div className="col-12">
                      <div className="card  shadow position-relative  ">
                        <div className="row">
                          <div className="col-md-4   col-12 pb-2 cart-image-skeleton  ">
                          <Skeleton style={{height:"100%"}}/>
                           
                          </div>
                          <div className="col-md-8 col-11 p-0 px-4 mt-2">
                            <div className="row">
                              <div className="col-12 p-0 ps-3 card-title">
                                <p className="mb-2 fs-5 fw-bold">
                                  <Skeleton />
                                </p>
                                <p className="mb-2">
                                  <Skeleton />
                                </p>
                                <p>
                                  <Skeleton />
                                </p>
                              </div>
                            </div>
                            <div className="row mt-3 ps-3">
                              <p className="col-md-1 col-2 p-0">
                                <Skeleton />
                              </p>
                              <div className="col-md-3 col-6 p-0 position-relative">
                                <div className="input-group">
                                  <Skeleton />
                                </div>
                              </div>
                            </div>
                            <div className="row mt-4">
                              <p className="col p-0 ps-3">
                                <Skeleton />
                                <span id="itemval">
                                  <Skeleton />
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className=" fw-bold position-absolute fs-5"
                          style={{
                            bottom: "16%",
                            right: "5%",
                            cursor: "pointer",
                          }}
                        >
                          <span>
                            <Skeleton />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className="col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5">
                <div className="right_side p-3 shadow bg-white">
                  <h2 className="product_name ">
                    <Skeleton />
                  </h2>
                  <div className="price_indiv d-flex justify-content-between">
                    <p>
                      <Skeleton />
                    </p>
                    <p>
                      <Skeleton />
                    </p>
                  </div>
                  <div>
                    <p>
                      <Skeleton />
                    </p>
                    <p>
                      <Skeleton />
                    </p>
                  </div>

                  <Skeleton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonLoader;
