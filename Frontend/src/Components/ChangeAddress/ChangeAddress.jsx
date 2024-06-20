import {
  faPenToSquare,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AddressForm from "../AddressForm/AddressForm";
import {
  useGetAddressQuery,
  useGetCustomAddressQuery,
  useGetUserQuery,
} from "../../services/FetchData/fetchData";
import { getToken } from "../../services/LocalStorage/LocalStorage";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "../AddressCard/AddressCard";
import './style.scss'
function ChangeAddress({ close }) {
  const [isOpen, setIsOpen] = useState(false);
  const [addClass, setAddClass] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [id, setId] = useState("");
  const token = getToken();
  const { data: userData,refetch } = useGetUserQuery(token);

  const dispatch = useDispatch();

  // const refresh = useSelector((state) => state.updateInfo.refresh);
  // useEffect(() => {
  //   if (refresh) {
  //     console.log(refresh);
  //     refetch();
  //   }
  // }, [refresh]);


    

  return (
    <>
      {isOpen && (
        <AddressForm
          close={() => setIsOpen(false)}
    
          buttonName={buttonName}
        />
      )}

      <div
        className="container-fluid w-100 h-100  position-fixed top-0  "
        style={{ background: "rgba(36, 35, 35, 0.301)" ,zIndex:"9999"}}
      >
        <div className="row ">
          <div className="col-12 col-md-6 h-100  position-fixed  end-0 bg-white pb-5 address-box  " style={{overflowY:"scroll" }}>
            <div className=" row  position-relative ">
              <div className="col-12  py-3 d-flex justify-content-between align-items-center border-bottom  ">
                <h4>Change Address</h4>
                <span
                  className="fs-3"
                  style={{ cursor: "pointer" }}
                  onClick={close}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </div>
              <div className="col-12 mt-3 ">
                <button
                  className="btn  border border border-dark fw-bold rounded-0 py-3"
                  onClick={() => {
                    setIsOpen(true);
                
                    setButtonName("Add Address");
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add New Address
                </button>
              </div>
              <div  >
              {userData && userData.user_addresses.map((element, index) => (
                <AddressCard element={element} />
              ))}
              </div>
            
            </div>
         
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeAddress;
