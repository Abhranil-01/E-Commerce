import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useGetCategoriesQuery } from "../../services/FetchData/fetchData";

function Footer() {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useGetCategoriesQuery({
    params: "?populate=*",
  });
  // console.log(data);
  return (
    <>
      {/* <!-- footer --> */}
      <footer className="bg-dark text-white pt-5 pb-4">
        <div className="container text-center text-md-left">
          <div className="row text-center text-md-left">
            <div className="col-md-3 col-lg-3 col-xl-4 mx-auto mt-3">
            <img src="\public\Images\Logo\Logo.png" alt="" className="img-fluid  " style={{filter:'invert(200%)'}} />
              <p className="text-white text-wrap ">
                Dsport is a dynamic sports e-commerce store, offering a wide
                range of sports gear and apparel. With a focus on quality
                products and customer satisfaction, D-Sport aims to cater to
                sports enthusiasts of all levels, providing them with the gear
                they need to excel in their favorite sports.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold ">
                Services
              </h5>
              {data &&
                data.data &&
                data.data.map((element) => (
                  <p
                    key={element.id}
                    onClick={() =>
                      navigate(
                        `items/${element.attributes.title.toLowerCase()}/${
                          element.id
                        }`
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <span
                      className="text-white"
                      style={{ textDecoration: "none" }}
                    >
                      {element.attributes.title}
                    </span>
                  </p>
                ))}
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold ">
                Contact
              </h5>
              <p className="text-white">
                <FontAwesomeIcon className="me-1" icon={faEnvelope} />{" "}
                dsport@gmail.com
              </p>
              <p className="text-white">
                <FontAwesomeIcon icon={faPhone} /> +91 1234567890
              </p>
            </div>
          </div>

          <hr className="mb-4" />

          <div className="row align-items-center">
            <div className="col-md-7 col-lg-8">
              <p className="text-white">
                Copyright @2024 All rights reserved by:
                <span style={{ textDecoration: "none" }}>
                  <strong className="text-warning">Dsport</strong>
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- footer --> */}
    </>
  );
}

export default Footer;
