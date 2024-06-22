import React, { useEffect, useState } from "react";
import "./navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faMagnifyingGlass,
  faXmark,
  faChevronDown,
  faCircleUser,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  getToken,
  removeToken,
} from "../../services/LocalStorage/LocalStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlert,
  setLogout,
  unSetUserToken,
  unsetUserInfo,
} from "../../services/UserauthSlice/UserauthSlice";
import SearchBox from "../SearchBox/SearchBox";
import {
  useGetCategoriesQuery,
  useGetUserQuery,
} from "../../services/FetchData/fetchData";
import SearchCard from "../SearchCard/SearchCard";
import Dropdown from "../Dropdown/Dropdown";
import { setIsOpen, setSearchInput, setSmallSearchInput } from "../../services/FilterSlice/filterSlice";

function Navbar() {
  const [cartLength, setCartLength] = useState();
  const [dropDownOpen, setDropDownOpen] = useState(false);
 
 
  // const [searchInput, setSearchInput] = useState("");
  const [params, setParams] = useState();
  const { data } = useGetCategoriesQuery({ params: params });
  const dispatch = useDispatch();
  const navigate = useNavigate();
const isOpen=useSelector((state)=>state.filter.isOpen)
const searchValue=useSelector((state)=>state.filter.searchInput)
const smallSearchInput=useSelector((state)=>state.filter.smallSearchInput)
  useEffect(() => {
    if (searchValue.length === 0) {
  
      dispatch(setIsOpen(false))
    }
  }, [searchValue]);

  const token = getToken();
  const { data: userData } = useGetUserQuery(token);
  const handleSearch = (e) => {
    
    dispatch(setSearchInput(e.target.value))
    //setParams(`populate[footballs][populate][0]=image&populate[footballs][filters][title][$startsWith]=${e.target.value}&populate[crickets][populate][0]=image&populate[crickets][filters][title][$startsWith]=${e.target.value}&populate[badmintons][populate][0]=image&populate[badmintons][filters][title][$startsWith]=${e.target.value}&populate[runnings][populate][0]=image&populate[runnings][filters][title][$startsWith]=${e.target.value}`);
   
    dispatch( setIsOpen(true))
  };

  useEffect(() => {
    if (userData && userData.add_to_carts) {
      setCartLength(userData.add_to_carts.length);
    }
  }, [userData]);

  return (
    <>
      <div className="container-fluid   bg-white position-fixed z-3 top-0 ">
        <nav className="row  align-items-center ">
          <div className="col-4 col-md-2">
           
            <img src="\Images\Logo\Logo.png" alt="" className="img-fluid" />
          </div>

          {/* search input start */}
          <div className="d-none  col-md-7 d-md-block   ">
            <div className="row">
              <div className="d-none d-md-block position-relative  col-10 ">
                <input
                  type="search"
                  className="form-control py-2 bg-transparent"
                  placeholder="Search Products"
                  value={searchValue}
                  onChange={handleSearch}
                />
                {isOpen && <SearchBox input={searchValue} />}
              </div>
              {isOpen && (
                <div
                  className="col-2 fs-3"
                  onClick={() => {
                    dispatch(setIsOpen(false));
                    dispatch(setSearchInput(""));
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              )}
            </div>
          </div>
          {/* search input end */}

          <div className=" col-7 col-md-3  ">
            <div className="row gap-md-4">
              {token ? (
                <div className="col-6 col-md-5 p-0   position-relative ">
                  <button
                    className="btn w-100 h-100  rounded-0 border "
                    onClick={() => setDropDownOpen(!dropDownOpen)}
                  >
                    <span className="mx-2">
                      D-Sport
                    </span>
                    <span>
                      <FontAwesomeIcon
                        icon={dropDownOpen ? faChevronUp : faChevronDown}
                      />
                    </span>
                  </button>
                  {dropDownOpen && <Dropdown token={token} />}
                </div>
              ) : (
                <div className="col-6 col-md-5 p-0   position-relative ">
                  <button
                    className="btn w-100 h-100  rounded-0 border "
                    onClick={() => setDropDownOpen(!dropDownOpen)}
                  >
                    <span className="mx-2">Login</span>
                    <span>
                      <FontAwesomeIcon
                        icon={dropDownOpen ? faChevronUp : faChevronDown}
                      />
                    </span>
                  </button>
                  {dropDownOpen && <Dropdown token={token} />}
                </div>
              )}

              <div
                className=" col-3  d-md-none d-sm-block "
                onClick={() => dispatch(setSmallSearchInput(true))}
              >
                <button className="btn fs-5 w-100">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
              <div className=" col-3 p-0 col-md-3  ">
                <button
                  className="btn fs-3 w-100 border-0 position-relative "
                  onClick={() => navigate("addtocart")}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  {
                    token &&  <small
                    className="position-absolute bg-success text-white "
                    style={{
                      fontSize: "15px",
                      borderRadius: "50%",
                      width: "22px",
                      height: "22px",
                      bottom: "62%",
                      right: "20%",
                    }}
                  >
                    {cartLength}
                  </small>
                  }
                 
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* Search box for small devices */}
      {smallSearchInput && (
        <div
          className="container-fluid p-0 d-md-none position-fixed vh-100 w-100 z-3 top-0"
          style={{ background: "rgba(36, 35, 35, 0.301)" }}
        >
          <div
            className="d-flex justify-content-center z-3 d-md-none gap-2 w-100 bg-white align-items-center"
            style={{ height: "12vh" }}
          >
            <div className="position-relative" style={{ width: "70%" }}>
              <input
                type="search"
                className="form-control bg-transparent"
                placeholder="Search Product"
                value={searchValue}
                onChange={handleSearch}
              />
              {isOpen && <SearchBox input={searchValue} />}
            </div>
            <span
              className="fw-bolder fs-3"
              onClick={() => dispatch(setSmallSearchInput(false))}
            >
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
