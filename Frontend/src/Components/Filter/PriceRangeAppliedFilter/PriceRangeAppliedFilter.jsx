import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { setPriceFilters } from '../../../services/FilterSlice/filterSlice';
import { useDispatch } from 'react-redux';

function PriceRangeAppliedFilter({min,max}) {
  console.log(min,max);
  const navigate = useNavigate();
  const { nameOne, nametwo, id } = useParams();
  const dispatch = useDispatch();
  const handleRemove=()=>{
    localStorage.removeItem("priceFilters")
    const price=localStorage.getItem("priceFilters")
    dispatch(setPriceFilters(price))
  }
  return (
    <>
          <div className="col-4 p-0 ">
      <button className='btn w-100 border border-black rounded-0  '>
      <small className='me-2'>{min}-{max}</small>
          <span onClick={handleRemove} >
            <FontAwesomeIcon icon={faXmark} />
          </span>
      </button>
     
       
      </div>

    </>
  )
}

export default PriceRangeAppliedFilter
