import React, { useEffect, useState } from "react";
import Input from "../FormControl/Input";
import PasswordInput from "../FormControl/PasswordInput";
import Button from "../FormControl/Button";
import InputBoxTwo from "../FormControlTwo/InputBoxTwo";
import TextArea from "../FormControlTwo/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import {
  useGetAddressQuery,
  useGetCustomAddressQuery,
  useGetUserQuery,
  usePostAddressMutation,
  useUpdateAddressMutation,
} from "../../services/FetchData/fetchData";
import { getToken } from "../../services/LocalStorage/LocalStorage";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../services/UpdateSlice/UpdateSlice";
import axios from 'axios';
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddressForm({ close, id, buttonName }) {
  const [existAddress, setExistAddress] = useState({
    address: "",
    city: "",
    name: "",
    phone: "",
    phoneTwo: "",
    pincode: "",
    state: "",
  });
  const dispatch=useDispatch()
  const token = getToken();
  const [PostAddress] = usePostAddressMutation();
  const [UpdateAddress] = useUpdateAddressMutation();
  const { data: addressData,refetch } = useGetCustomAddressQuery({
    token: token,
    id: id,
  });
  const { data: userData,refetch:userFetch } = useGetUserQuery(token);

  console.log(addressData);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    if (addressData && addressData.data && addressData.data.attributes) {
      const { address, city, name, phone, phoneTwo, pincode, state } =
        addressData.data.attributes;
      setExistAddress({
        address: address || "",
        city: city || "",
        name: name || "",
        phone: parseInt(phone) || "",
        phoneTwo: parseInt(phoneTwo) || "", // Assuming you want phoneTwo to have the same value as phone
        pincode: pincode || "",
        state: state || "",
      });
    }
  }, [addressData]);
  console.log(addressData);
  const getUniqueData = (data, property) => {
    let newVal = data.map((element) => {
      return element[property];
    });
    return [...new Set(newVal)];
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pincode = watch("pincode");
        if (pincode!==undefined && pincode.length === 6) {
          const response = await axios.get(`${import.meta.env.VITE_LOCATION_URL}${pincode}`);
       
          if(response && response.data && response.data[0].PostOffice){
            console.log(response.data[0].PostOffice);
            const district=getUniqueData(response.data[0].PostOffice,"District")
           const state= getUniqueData(response.data[0].PostOffice,"State")
           setExistAddress({
            city: district,
            state: state
           })
            
          }
          
          // Handle the response data here
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [watch("pincode")]);
  

  const addInfo = async (data) => {
    if (buttonName === "Add Address") {
      if (data.phoneTwo.length === 0) {
        data.phoneTwo = data.phone;
      }

      const r = { ...register("users_permissions_users") };
      data.users_permissions_users = {
        connect: [userData.id]
      };
      const res = await PostAddress({ data: data, token: token });
      if (res.data) {
        console.log(res.data);

        refetch()
        userFetch()
        toast.success("Addresses added successfully")
      } else {
        console.log(res.error);
      }
    }else {
      if (data.phoneTwo.length === 0) {
        data.phoneTwo = data.phone;
      }

    
      const res = await UpdateAddress({ data: data, token: token ,id:id});
      if (res.data) {
        console.log("uhuh",res.data);
        dispatch(setRefresh(true))
        refetch()
        userFetch()
        toast.success("Addresses added successfully")
      } else {
        console.log(res.error);
      }
    }
  };
  return (
    <>
      <div
      className="container-fluid w-100 h-100  position-fixed top-0 "
      style={{ background: "rgba(36, 35, 35, 0.301)", zIndex: "99999" }}
    >
      <div className="row ">
        <div className="col-12 col-md-6 h-100  position-fixed  end-0 bg-white  ">
          <div className=" row">
            <div className="col-12 px-4 py-3 d-flex justify-content-between align-items-center border-bottom  ">
              <h4>Add Your Address</h4>
              <span
                className="fs-3"
                style={{ cursor: "pointer" }}
                onClick={close}
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
            <div className="col-12 mt-5  ">
              <div className="row  ">
                <form onSubmit={handleSubmit(addInfo)}>
                  <div className="col-12  ">
                    <div className="row justify-content-around  ">
                      <InputBoxTwo
                        className={"col-10 col-md-5"}
                        value={existAddress.name}
                        label={"Enter Name"}
                        register={register("name", { required: true })}
                      />
                      <InputBoxTwo
                        type={"number"}
                        value={existAddress.phone}
                        className={"col-10 col-md-5"}
                        label={"Enter Phone No"}
                        register={register("phone", { required: true })}
                      />
                    </div>
                    <div className="row justify-content-around  ">
                      <InputBoxTwo
                        type={"number"}
                        value={existAddress.phoneTwo}
                        className={"col-10 col-md-5"}
                        label={"Enter Other Phone No(Optional)"}
                        register={register("phoneTwo", { required: false })}
                      />
                      <InputBoxTwo
                        className={"col-10 col-md-5"}
                        value={existAddress.pincode}
                        label={"Enter Pincode"}
                        register={register("pincode", { required: true, maxLength:6 })}
                      />
                    </div>
                    <div className="row justify-content-center ">
                      <TextArea
                        className={"col-10 col-md-11 p-0 "}
                        value={existAddress.address}
                        label={"Enter Street/Address"}
                        style={{ height: "150px" }}
                        register={register("address", { required: true })}
                      />
                    </div>
                    <div className="row justify-content-around  ">
                      <InputBoxTwo
                        value={existAddress.city}
                        className={"col-10 col-md-5"}
                        label={"Enter City/District/Town"}
                        register={register("city", { required: true })}
                      />
                      <InputBoxTwo
                        className={"col-10 col-md-5"}
                        value={existAddress.state}
                        label={"Enter State"}
                        register={register("state", { required: true })}
                      />
                    </div>
                  </div>

                  <Button type="submit" text={buttonName} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <ToastContainer
        position="top-center"
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
      />
    </>
  
  );
}

export default AddressForm;
