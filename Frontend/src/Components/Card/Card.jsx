import React from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { setId, setTitle } from "../../services/Data/DataSlice";
function Card({ title, img, id ,navName,name,categoryId}) {
  console.log('jiji',title);
 const navigate=useNavigate()
const dispatch=useDispatch()
  const handleClick=()=>{
  navigate(`/${name}/${navName}/${id}/${'populate[products][populate][0]=image'}`)
  dispatch(setTitle(title))
  dispatch(setId(categoryId))
  }
  return (
    <>
      <div className="col">
        <div class="card  rounded-0  " style={{ cursor: "pointer" }}>
          <img
            src={`http://localhost:1337${img}`}
            class="card-img-top rounded-0 position-relative "
            alt="..."
          />
          <div
            className="d-flex align-items-center justify-content-center position-absolute  text-white w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.123)" }}
            onClick={handleClick}
          >
            <h4>{title}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
