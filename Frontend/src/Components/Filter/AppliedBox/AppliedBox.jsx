// AppliedBox.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFilters } from "../../../services/FilterSlice/filterSlice";
import { useNavigate, useParams } from "react-router-dom";

function AppliedBox({ name }) {
  const selectedFilters = useSelector((state) => state.filter.selectedFilters);
  const storedFilters = JSON.parse(localStorage.getItem("selectedFilters"));
  const size = useSelector((state) => state.filter.size);
  const gender = useSelector((state) => state.filter.gender);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nameOne, nametwo, id } = useParams();
console.log('giugu',storedFilters);
const handleRemove=(selectedCategory)=>{
  let updatedFilters;
  if (selectedFilters.includes(selectedCategory)) {
    updatedFilters = selectedFilters.filter((el) => el !== selectedCategory);
  } else {
    updatedFilters = [...selectedFilters, selectedCategory];
  }

  dispatch(setSelectedFilters(updatedFilters));
  localStorage.setItem("selectedFilters", JSON.stringify(updatedFilters));
}

  return (
    <div>

        <button className="btn border border-black w-100  rounded-0 d-flex justify-content-around align-items-center ">
          <span className="me-4">{name}</span>
          <span onClick={()=>handleRemove(name)}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </button>

    </div>
  );
}

export default AppliedBox;
