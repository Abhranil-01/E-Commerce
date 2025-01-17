import React, { useState } from "react";
import AddressForm from "../AddressForm/AddressForm";
import { getToken } from "../../services/LocalStorage/LocalStorage";
import { useGetUserQuery } from "../../services/FetchData/fetchData";
import AddressCard from "../AddressCard/AddressCard";
import './style.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

function ChangeAddress({ close, onSelectAddress }) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonName, setButtonName] = useState("");
  const token = getToken();
  const { data: userData } = useGetUserQuery(token);

  const handleSelectAddress = (addressId) => {
    onSelectAddress(addressId);
  };

  return (
    <>
      {isOpen && (
        <AddressForm
          close={() => setIsOpen(false)}
          buttonName={buttonName}
          closeButton={close}
        />
      )}
      <div
        className="container-fluid w-100  vh-100 position-fixed top-0"
        style={{ background: "rgba(36, 35, 35, 0.301)", zIndex: "9999" }}
      >
        <div className="row">
          <div className="col-12 col-md-6 vh-100 position-fixed end-0 bg-white pb-5 address-box top-0 bottom-0" style={{ overflowY: "scroll" }}>
            <div className="row position-relative">
              <div className="col-12 py-3 d-flex justify-content-between align-items-center border-bottom">
                <h4>Change Address</h4>
                <span
                  className="fs-3"
                  style={{ cursor: "pointer" }}
                  onClick={close}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </div>
              <div className="col-12 mt-3">
                <button
                  className="btn border border-dark fw-bold rounded-0 py-3"
                  onClick={() => {
                    setIsOpen(true);
                    setButtonName("Add Address");
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add New Address
                </button>
              </div>
              <div>
                {userData && userData.user_addresses.map((element) => (
                  <AddressCard
                    key={element.id}
                    element={element}
                    // selectedAddressId={Number(selectedAddressId)}
                    onSelectAddress={handleSelectAddress}
                    closeButton={close}
                  />
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
