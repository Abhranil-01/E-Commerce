import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

function LogoBar() {
  return (
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid ">
      <img src="\src\Images\Logo\Logo.png" alt="" className="img-fluid" />
        <li class="list-group-item hoverClass">
          <NavLink to="/orders" className="text-dark text-decoration-none  ">
            <span>
              <FontAwesomeIcon icon={faBagShopping} />
            </span>{" "}
           Your Orders{" "}
          </NavLink>
        </li>
      </div>
    </nav>
  );
}

export default LogoBar;
