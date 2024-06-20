import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AddressForm from "../AddressForm/AddressForm";
import { useDispatch } from "react-redux"; // Import useDispatch if using Redux
import { setIdAction } from "../../services/UpdateSlice/UpdateSlice";
import "./AddressCard.scss"
import {Bounce, ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function AddressCard({ element }) {
  const dispatch = useDispatch(); // Define dispatch if using Redux
  const [select,setSelected] = useState(null); // Define dispatch
  const [addClass, setAddClass] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [buttonName, setButtonName] = useState("");
  const [id, setId] = useState("");
  

  const addAddress=()=>{
    dispatch(setIdAction(element.id)) 
    toast.success("Address Add Successfully")
  }
  
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
          className={`card card-hover position-relative`}
          style={{ cursor: "pointer" }}
        >
          <div className="card-body"  onClick={addAddress}>
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
            onClick={() => {
              setId(element.id);
              setIsOpen(true);
              setButtonName("Save Address");
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </span>
        </div>
      </div>
      <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
containerId={"containerB"}
/>
    </>
  );
}

export default AddressCard;
