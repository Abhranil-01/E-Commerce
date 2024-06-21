import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.scss"
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function AutoSlider() {
  const [imgs,setImgs]=useState([
    '/Images/Untitled design.png',
    '/Images/cricketTwo.png',
    '/Images/badminton.png',
    '/Images/running.png',
  ])
  console.log(imgs);
  
  return (
    <>
      <div className="row auto-slider" >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper col-12 p-0"
        >
          {
            imgs.map((url,index)=>(
              <SwiperSlide key={index} className="position-relative ">
              <img
                src={url}
                alt=""
                className="img-fluid"
              />
              <div className="position-absolute w-100 h-100 top-0 d-flex flex-column justify-content-center  text-white ps-md-5 ps-2  " style={{ backgroundColor: "rgba(0, 0, 0, 0.220)" }}>
                <h1>Welcome To Dsport</h1> 
                <p className="fst-italic">Gear up for greatness with D-Sport, where passion meets performance!</p>
              </div>
            </SwiperSlide>
            ))
          }
       
        </Swiper>
      </div>
    </>
  );
}

export default AutoSlider;
