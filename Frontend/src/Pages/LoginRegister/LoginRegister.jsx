import React, { useState } from "react";
import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "./style.scss";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
function LoginRegister() {
  const [addClass, setAddClass] = useState("");
  const showRegister = () => {
    setAddClass("active");
  };
  const showLogin = () => {
    setAddClass("");
  };
  return (
    <div
      className="container-fluid vh-100 position-relative "
      style={{ overflow: "hidden" }}
    >         
      <div className="row">
        <div className="col-md-6 p-0 position-absolute  ">
          <div class="card text-bg-dark rounded-0 border-0 vh-100 ">
            <img
              src="\src\Images\poster.png"
              className="card-img-top rounded-0 position-relative h-100  "
              alt="..."
            />
            <div
              class="card-img-overlay d-flex "
              style={{ backgroundColor: "rgba(0, 0, 0, 0.280)" }}
            >
                <span className="fs-4" style={{cursor:'pointer'}}><NavLink className='text-white' to='/'><FontAwesomeIcon icon={faHome}/></NavLink></span>
                <div className="text-center  align-self-center w-100 ">
                {/* <h1 class="card-title fw-bold align-self-center">D-Sport</h1> */}
                <img src="\src\Images\Logo\Logo.png" alt="" className="img-fluid" style={{filter:'invert(100%)'}} />

                </div>
            </div>
          </div>
        </div>
        {/* Login */}
        <div
          className={`login-box ${addClass} h-100  col-md-6 p-0 position-absolute`}
        >

          <div className="w-100  logo d-flex justify-content-between px-3 pt-2">
          <span className="fs-4" style={{cursor:'pointer'}}><NavLink className='text-dark' to='/'><FontAwesomeIcon icon={faHome}/></NavLink></span>
            <h1 className="text-center fw-bolder ">D-sport</h1>
          </div>
          <div
            className=" container  d-flex flex-column align-items-center justify-content-center gap-3 "
            style={{ height: "100vh" }}
          >
            <h1>Welcome Again</h1>
            <span>
              Don't have any account?{" "}
              <span
                className="text-primary fw-bold fs-5"
                style={{ cursor: "pointer" }}
                onClick={showRegister}
              >
                Register
              </span>
            </span>
            <Login />
          </div>
        </div>
        {/* Login End */}
        {/* Register */}
        <div
          className={`register-box ${addClass} h-100  col-md-6 p-0 position-absolute`}
        >
          <div className="w-100  logo">
            <h1 className="text-center fw-bolder ">D-sport</h1>
          </div>
          <div
            className=" container  d-flex flex-column align-items-center justify-content-center gap-3 "
            style={{ height: "90vh" }}
          >
            <h1>Welcome</h1>
            <span>
              Already have an account?{" "}
              <span
                className="text-primary fw-bold fs-5"
                style={{ cursor: "pointer" }}
                onClick={showLogin}
              >
                Login
              </span>
            </span>
            <Register />
          </div>
        </div>
        {/* Register End */}
      </div>
    </div>
  );
}

export default LoginRegister;
