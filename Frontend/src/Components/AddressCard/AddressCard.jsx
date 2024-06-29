import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AddressForm from "../AddressForm/AddressForm";
import { useDispatch } from "react-redux";
import { setIdAction } from "../../services/UpdateSlice/UpdateSlice";
import "./AddressCard.scss";

function AddressCard({ element, selectedAddressId, onSelectAddress ,closeButton}) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [buttonName, setButtonName] = useState("");
  const [id, setId] = useState("");

  const addAddress = () => {
    onSelectAddress(element.id);
    dispatch(setIdAction(element.id));
    closeButton()
  };
  
useEffect(()=>{

  if(element.id === 4){
    console.log(selectedAddressId,"lksdfjf")
     
  }
  
},[selectedAddressId,element])
  return (
    <>
      {isOpen && (
        <AddressForm
          close={() => setIsOpen(false)}
          id={id}
          buttonName={buttonName}
        />
      )}
      <div key={element.id} className="col-12 mt-3">
        <div
          className={`card position-relative ${element.id === selectedAddressId ? 'card-hover' : ''}`}
          style={{ cursor: "pointer" }}
          onClick={addAddress}
        >
          <input
            type="radio"
            name="address"
            checked={selectedAddressId === element.id}
            onChange={addAddress}
            className="position-absolute"
            style={{top:"45%",left:"2%"}}
          />
          <div className="card-body px-5">
            <p className="card-title">{element.name}</p>
            <p className="card-text">
              <span>{element.address}</span>,
              <span>
                {element.city}-{element.pincode}
              </span>
              ,<span>{element.state}</span>
            </p>
          </div>
          <span
            className="position-absolute z-3"
            style={{ right: "2%", top: "35%" }}
            onClick={(e) => {
              e.stopPropagation();
              setId(element.id);
              setIsOpen(true);
              setButtonName("Save Address");
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </span>
        </div>
      </div>
    </>
  );
}

export default AddressCard;
