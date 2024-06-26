import React from 'react'
import LazyLoad from 'react-lazy-load'
function NoItems({name,img}) {
  return (
    <div className=" container-fluid vh-100 ">
    <div className="row h-100  justify-content-center align-items-center">
      <div className="col-md-3 col-8 p-0">
        <div class="card border-0 text-center">
          <LazyLoad>
          <img
            src={img}
            class="card-img-top"
            alt="..."
          />
          </LazyLoad>
          <div class="card-body text-center ">
            <h5 class="card-text fw-bold">
           {name}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default NoItems
