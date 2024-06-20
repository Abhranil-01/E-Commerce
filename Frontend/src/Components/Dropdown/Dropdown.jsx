import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { removeToken } from "../../services/LocalStorage/LocalStorage";
import { useDispatch } from "react-redux";
import { setAlert, setLogout, unSetUserToken } from "../../services/UserauthSlice/UserauthSlice";
function Dropdown({token}) {
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(unSetUserToken(null));

        removeToken();
        dispatch(setLogout(true))
        navigate("/");
      };
  return (
    <>
 
      <div
        className=" position-absolute bg-white  "
        style={{  width:"100%",cursor: "pointer" }}
      >
        <ul class="list-group rounded-0  "> 
        <li class="list-group-item hoverClass"><NavLink to="/orders" className="text-dark text-decoration-none  "><span><FontAwesomeIcon icon={faBagShopping} /></span>  Orders </NavLink></li>
          <li class="list-group-item hoverClass " >{token ?(<span  className="text-dark text-decoration-none " onClick={handleLogout}><span><FontAwesomeIcon icon={faRightFromBracket} /></span>Logout </span>):(<NavLink to="/login" className="text-dark text-decoration-none  "><span><FontAwesomeIcon icon={faRightToBracket} /></span> Login </NavLink>) }</li>
         
        </ul>
      </div>
    </>
  );
}

export default Dropdown;
