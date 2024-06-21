import React, { useEffect, useState } from "react";
import CartCard from "../../Components/CartCard/CartCard";
import {
  useDeleteCartDataMutation,
  useGetAddressQuery,
  useGetCartDataQuery,
  useGetCustomAddressQuery,
  useGetUserQuery,
  usePostAddressMutation,
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
function AddtoCart() {
  const navigate = useNavigate()
  const token = getToken(); // Get token from local storage
  const [totalAmount, setTotalAmount] = useState(); // State to hold total amount
  const [buttonName, setButtonName] = useState(""); // State to hold button name
  const [existAddress, setExistAddress] = useState([]); // State to hold existing address
const dispatch=useDispatch()
  const [id, setId] = useState(""); // State to hold address id

  const { data: userData, refetch: userRefetch } = useGetUserQuery(token); // Query to get user data
  const { data: customDataAddress } = useGetCustomAddressQuery({ // Query to get custom address data
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
      console.log("QHWFUGWFIYGEW");
      if (userData && userData.add_to_carts && existAddress) {
        console.log("QHWFUGWFIYGEW");
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
        console.log('orderprimise',orderPromises);
        const res = await Promise.all(orderPromises);
     
        if(res) {
          console.log("Orders placed successfully:", res);
          userData.add_to_carts.map((element)=>{
            DeleteCartData({id: element.id,token:token})
          })
          userRefetch();
          dispatch(setShowAlert(true))
          navigate("/orders")
        }
        else{
          console.log("Error:", res);
        } 
      }
    } catch (error) {
      console.error("Error while placing orders:", error);
    }
  };

  return (
    <>
      <LogoBar />
      {/* Address form modal */}
      {isOpen && (
        <AddressForm close={() => setIsOpen(false)} buttonName={buttonName} />
      )}
      {/* Change address modal */}
      {isOpenTwo && <ChangeAddress close={() => setIsOpenTwo(false)} />}

      {/* Render based on user authentication */}
      {token ? (
        userData &&
        userData.add_to_carts &&
        userData.add_to_carts.length !== 0 ? (
          <div className="container-fluid mb-5 " style={{marginTop:"80px"}}>
            <div className="row">
              <div className="col-md-10 col-11 mx-auto">
                <div className="row mt-5 gx-3">
                  {/* Left side */}
                  <div className="col-md-12 col-lg-8 col-11 mx-auto main_cart mb-lg-0 mb-5  p-0">
                    <div className="shadow col p-3">
                      <h4 className=" border-bottom ">Delivery Address</h4>

                      <div >
                        {/* Display existing address or prompt to add address */}
                        {existAddress ? (
                          <div class="card border-0">
                            <div class="card-body">
                              <h5 class="card-title">{existAddress.name}</h5>
                              <p class="card-text">
                                {existAddress.phone}, {existAddress.phoneTwo}
                              </p>
                              <p class="card-text">
                                {existAddress.address}, {existAddress.pincode},
                                {existAddress.city}, {existAddress.state}
                              </p>
                              <button
                                class="btn btn-primary"
                                onClick={() => setIsOpenTwo(true)}
                              >
                                Change
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className=" d-flex flex-column align-items-center  ">
                            <img
                              src="\src\Images\cart icon\3133337_37296.jpg"
                              className="col-2 "
                              alt=""
                            />
                            <button
                              className="btn border-black fw-bold my-3 "
                              onClick={() => {
                                setIsOpen(true);
                                setButtonName("Add Address");
                              }}
                            >
                              Add Address
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Cart items */}
                    <div className=" shadow mt-5 container-fluid p-md-2 p-0">
                      <div className="p-3" >
                      <h3 className="border-bottom">Cart Items</h3>
                      </div>
                    
                      <div className="row gap-3 px-md-2 p-0">
                      {userData &&
                        userData.add_to_carts.map((element) => (
                          <CartCard
                            key={element.id}
                            value={element}
                            refetch={userRefetch}
                          />
                        ))}
                      </div>
                      
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="col-md-12 col-lg-4 col-11 mx-auto mt-lg-0 mt-md-5">
                    <div className="right_side p-3 shadow bg-white">
                      <h2 className="product_name mb-5">Total Amount</h2>
                      <div className="price_indiv d-flex justify-content-between">
                        <p>Total Product</p>
                        <p>
                          {userData ? (
                            userData.add_to_carts.reduce(
                              (acc, element) => acc + element.qty,
                              0
                            )
                          ) : (
                            <span>0</span>
                          )}
                        </p>
                      </div>
                      <div className="price_indiv d-flex justify-content-between">
                        <p>Total Price</p>
                        <p>{totalAmount}</p>
                      </div>

                      <button
                        className="btn btn-primary text-uppercase"
                        onClick={handleOrder}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NoItems
            name={"No Items In The Cart"}
            img={"/Images/cart icon/cart-empty.a0a3f3f6aa4cd1e5.svg"}
          />
        )
      ) : (
        <NotLogin title={"CART ITEMS"} />
      )}
     
    </>
  );
}

export default AddtoCart;
