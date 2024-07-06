import React, { useEffect, useState } from "react";
import CartCard from "../../Components/CartCard/CartCard";
import {
  useDeleteCartDataMutation,
  useGetCustomAddressQuery,
  useGetUserQuery,
  usePostOrderDataMutation,
} from "../../services/FetchData/fetchData";
import { getToken } from "../../services/LocalStorage/LocalStorage";
import LogoBar from "../../Components/Logo/LogoBar";
import NotLogin from "../../Components/NotLogin/NotLogin";
import NoItems from "../../Components/NoItems/NoItems";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddressForm from "../../Components/AddressForm/AddressForm";
import ChangeAddress from "../../Components/ChangeAddress/ChangeAddress";
import { useDispatch, useSelector } from "react-redux";

import { setShowAlert } from "../../services/UserauthSlice/UserauthSlice";

import SkeletonLoader from "./SkeletonLoader";
import { toast } from "react-toastify";
import LazyLoad from "react-lazy-load";

function AddtoCart() {
  const navigate = useNavigate();
  const token = getToken(); // Get token from local storage
  const [totalAmount, setTotalAmount] = useState(); // State to hold total amount
  const [buttonName, setButtonName] = useState(""); // State to hold button name
  const [existAddress, setExistAddress] = useState([]); // State to hold existing address
  const dispatch = useDispatch();
  const [id, setId] = useState(""); // State to hold address id

  const { data: userData, refetch: userRefetch, isLoading } = useGetUserQuery(token); // Query to get user data
  const { data: customDataAddress } = useGetCustomAddressQuery({
    // Query to get custom address data
    token: token,
    id: id,
  });
  const [isOpen, setIsOpen] = useState(false); // State to control address form modal
  const [isOpenTwo, setIsOpenTwo] = useState(false); // State to control change address modal
  const idAction = useSelector((state) => state.updateInfo.id); // Get address id from Redux state

  const [PostOrderData] = usePostOrderDataMutation(); // Mutation to post order data
  const [DeleteCartData] = useDeleteCartDataMutation(); // Mutation to delete cart data

  // Fetch user data on initial load and when user data changes
  useEffect(() => {
    userRefetch();
  }, [userData]);

  // Set address id and existing address based on Redux state
  useEffect(() => {
    if (idAction !== null) {
      setId(idAction);

      if (
        customDataAddress &&
        customDataAddress.data &&
        customDataAddress.data.attributes
      ) {
        setExistAddress(customDataAddress.data.attributes);
      }
    } else {
      if (userData) {
        if (userData && userData.user_addresses) {
          const latestValue = userData.user_addresses.slice(-1)[0];
          setExistAddress(latestValue);
        }
      }
    }
  });

  // Calculate total amount when user data changes
  useEffect(() => {
    if (userData && userData.add_to_carts) {
      const total = userData.add_to_carts.reduce(
        (total, item) => total + item.qty * item.price,
        0
      );
      setTotalAmount(total);
    }
  }, [userData]);

  // Function to handle placing orders
  const handleOrder = async () => {
    try {
      if (userData && userData.add_to_carts && existAddress) {
        const orderPromises = await userData.add_to_carts.map((element) => (
          PostOrderData({
            data: {
              productId: element.productId.toString(),
              size: element.size,
              qty: element.qty,
              price: element.price * element.qty,
              cancel: false,
              user_addresses: {
                connect: [existAddress.id],
              },
              users_permissions_users: {
                connect: [userData.id],
              },
            },
            token: token,
          })
        ));
        console.log('orderprimise', orderPromises);
        const res = await Promise.all(orderPromises);

        if (res) {
          console.log("Orders placed successfully:", res);
          userData.add_to_carts.map((element) => {
            DeleteCartData({ id: element.id, token: token });
          });
          userRefetch();
          dispatch(setShowAlert(true));
          navigate("/orders");
        }
      }
    } catch (error) {
      toast.error('Order Not Placed');
    }
  };

  const handleSelectAddress = (addressId) => {
    localStorage.setItem("selectedAddressId", addressId);
    setId(addressId);
  };

  return (
    <>
      <LogoBar />
      {/* Address form modal */}
      {isOpen && (
        <AddressForm close={() => setIsOpen(false)} buttonName={buttonName} />
      )}
      {/* Change address modal */}
      {isOpenTwo && (
        <ChangeAddress close={() => setIsOpenTwo(false)} onSelectAddress={handleSelectAddress} />
      )}

      {/* Render based on user authentication */}
      {token ? (
        isLoading ? (
          <SkeletonLoader />
        ) : (
          userData &&
          userData.add_to_carts &&
          userData.add_to_carts.length > 0 ? (
            <div className="container-fluid mb-5 " style={{ marginTop: "80px" }}>
              <div className="row">
                <div className="col-md-10 col-11 mx-auto">
                  <div className="row mt-5 gx-3">
                    {/* Left side */}
                    <div className="col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5  p-0">
                      <div className="shadow col p-3">
                        <h4 className=" border-bottom ">Delivery Address</h4>

                        <div>
                          {/* Display existing address or prompt to add a new address */}
                          {existAddress && (
                            <div className="py-3 border-bottom">
                              <div className="fw-bold">
                                {existAddress.name}
                              </div>
                              <div>{existAddress.address}</div>
                              <div>
                                {existAddress.state}, {existAddress.city},{" "}
                                {existAddress.zipcode}
                              </div>
                              <div>Phone Number : {existAddress.phone}</div>
                            </div>
                          )}
                          {!existAddress && (
                            <div className="py-3 border-bottom">
                              <button
                                className="btn border border-dark fw-bold rounded-0 py-2"
                                onClick={() => {
                                  setIsOpen(true);
                                  setButtonName("Add Address");
                                }}
                              >
                                <FontAwesomeIcon icon={faPlus} /> Add Address
                              </button>
                            </div>
                          )}

                          <button
                            className="btn border border-dark fw-bold rounded-0 py-2"
                            onClick={() => {
                              setIsOpenTwo(true);
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} /> Change Address
                          </button>
                        </div>
                      </div>

                      {/* Display cart items */}
                      <div className="shadow col p-3 mt-3">
                        {userData.add_to_carts.map((element) => (
                          <CartCard
                            key={element.id}
                            value={element}
                            token={token}
                            userRefetch={userRefetch}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right side */}
                    <div className="col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5">
                      <div className="shadow p-3">
                        <h4 className=" border-bottom  ">
                          Price Details
                        </h4>
                        {/* Price details */}
                        <div className="pt-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="fw-bold">Price</p>
                            <p>{totalAmount}</p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="fw-bold">Delivery Charges</p>
                            <p>Free</p>
                          </div>
                        </div>

                        {/* Total amount */}
                        <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                          <p className="fw-bold">Total Amount</p>
                          <p>{totalAmount}</p>
                        </div>

                        {/* Place order button */}
                        <button
                          className="btn w-100 btn-dark rounded-0 my-3"
                          onClick={handleOrder}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <NoItems img={'/Images/cart icon/9264885.jpg'} name={"No Items In Your Cart"} />
          )
        )
      ) : (
        <NotLogin />
      )}
    </>
  );
}

export default AddtoCart;
