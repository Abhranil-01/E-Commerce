import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./style.scss";
function SkeletonLoader() {
  return (
    <>
      <div className=" container-fluid  " style={{ marginTop: "130px" }}>
        <div className="row align-items-center justify-content-center    ">
          <div className="col-12 col-md-5  p-md-0 ">
            <div className="row d-flex flex-column-reverse flex-md-row    align-items-center   ">
              <div className="col-12 col-md-2   mt-2 mt-md-0  ">
                <div className="row d-flex align-items-end justify-content-center gap-1  ">
                  {/* {imgs &&
                      imgs.map((element, i) => (
                        <div
                          className="col-md-12 col-2"
                          key={element.id}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            className="img-fluid border border-dark  "
                            src={`${element.attributes.url}`}
                            onClick={() => handleClick(i)}
                          />
                        </div>
                      ))} */}
                  <div className="col-md-12 col-2 sideImage">
                    <Skeleton style={{ height: "100%" }} duration={50} />
                  </div>
                  <div className="col-md-12 col-2 sideImage">
                    <Skeleton style={{ height: "100%" }} />
                  </div>
                  <div className="col-md-12 col-2 sideImage">
                    <Skeleton style={{ height: "100%" }} />
                  </div>
                  <div className="col-md-12 col-2 sideImage">
                    <Skeleton style={{ height: "100%" }} />
                  </div>
                  <div className="col-md-12 col-2 sideImage">
                    <Skeleton style={{ height: "100%" }} />
                  </div>
                </div>
              </div>

              <div className="col-md-9 col-10  p-md-0 bigImageskeleton ">
                {/* {wordData && (
                    <img
                      src={`${wordData.attributes.url}`}
                      className="img-fluid  border border-dark "
                    />
                  )} */}
                <Skeleton style={{ height: "100%" }} />
              </div>
            </div>
          </div>
          <div className=" col-xl-6 col-lg-6 d-flex flex-column justify-content-center gap-3 px-3 mt-2 ">
            <div>
              <p className="fw-bolder">
                {" "}
                <Skeleton  width={70} />{" "}
              </p>
              <h4>
                {" "}
                <Skeleton />{" "}
              </h4>

              <p
             
                
              >
            <Skeleton width={150}/>
              
              </p>

              <p >
                <Skeleton width={80}/>
              </p>
            </div>
            <div>
              <p className="fw-bold">
                {" "}
                <Skeleton width={130}/>{" "}
              </p>
              <p style={{ fontWeight: "500" }}>
                <Skeleton height={60}/>
              </p>
            </div>

            <div>
              <p className="fw-bold">
                {" "}
                <Skeleton width={100} />{" "}
              </p>
              <div className="conatiner">
                <div className="row row-cols-4 g-4">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              </div>
            </div>

            <div>
              {/* <button className="btn btn-primary" >
               
                </button> */}
              <Skeleton width={100} height={30}/>
            </div>
          </div>
        </div>
        <div className="row  my-5">
          {/* {data.data &&
              data.data.attributes &&
              data.data.attributes.reviews &&
              data.data.attributes.reviews.data.length !== 0 && (
                <ProductPageReview
                  reviews={data.data.attributes.reviews}
                  totalRating={totalRating}
                  avg={avg}
                  ratings={ratings}
                />
              )} */}
                <div className="col-12">
        <h4>Reviews</h4>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-12 col-md-5 border border-secondary ">
            <div className="row ">
              <div className="col-md-12 col-6 d-flex flex-column align-items-center ">
                <h1><Skeleton/></h1>
                <div className="outer-star position-relative fs-1 ">
              <Skeleton/>
                </div>

                <p><Skeleton/></p>
              </div>

              <div className="col-md-12 col-6 mt-md-4 ">
                <div className="row gap-1">
               <Skeleton/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-12 border border-dark">
            <div className="row ">
          <Skeleton/>
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
