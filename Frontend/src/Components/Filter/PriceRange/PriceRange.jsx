import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { useDispatch, useSelector } from "react-redux";
import { setPrice, setPriceFilters } from "../../../services/FilterSlice/filterSlice";
import { useNavigate, useParams } from "react-router-dom";

function PriceRange({ max, min }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const price = useSelector((state) => state.filter.price);
  const { nameOne, nametwo, id } = useParams();
  const priceFilters = useSelector((state) => state.filter.priceFilters);
  console.log(priceFilters);
  const [values, setValues] = useState(0);
  useEffect(()=>{
    setValues(price)
  },[price,values,setValues])
  useEffect(()=>{
    if(priceFilters && priceFilters.length!==0){
      setValues(priceFilters)
      // console.log('ugewv8ygew8yg',priceFilters,max,min);
    }
  },[values,priceFilters])
  console.log("maxmin",price,max,min,values);
  const handleChange = (values) => {
    setValues(values);
  };

  const handleAfterChange = (values) => {
    localStorage.setItem("priceFilters", JSON.stringify(values));
    dispatch(setPriceFilters(values));
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="input-box fw-bold">
          <span>&#8377;{values[0]}</span>
          <span>-</span>
          <span>&#8377;{values[1]}</span>
        </div>
      </div>
      <ReactSlider
        className="slider"
        value={values}
        onChange={handleChange}
        onAfterChange={handleAfterChange}
        min={min}
        max={max}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        minDistance={0}
      />
    </>
  );
}

export default PriceRange;
