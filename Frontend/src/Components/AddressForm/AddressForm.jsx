import React, { useEffect, useState } from "react";
import InputBoxTwo from "../FormControlTwo/InputBoxTwo";
import TextArea from "../FormControlTwo/TextArea";
import Button from "../FormControl/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import {
  useGetCustomAddressQuery,
  useGetUserQuery,
  usePostAddressMutation,
  useUpdateAddressMutation,
} from "../../services/FetchData/fetchData";
import { getToken } from "../../services/LocalStorage/LocalStorage";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../services/UpdateSlice/UpdateSlice";
import axios from 'axios';
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddressForm({ close, id, buttonName, closeButton }) {
  const [defaultValues, setDefaultValues] = useState({
    address: "",
    city: "",
    name: "",
    phone: "",
    phoneTwo: "",
    pincode: "",
    state: "",
  });
  const dispatch = useDispatch();
  const token = getToken();
  const [PostAddress] = usePostAddressMutation();
  const [UpdateAddress] = useUpdateAddressMutation();
  const { data: addressData, refetch } = useGetCustomAddressQuery({
    token: token,
    id: id,
  });
  const { data: userData, refetch: userFetch } = useGetUserQuery(token);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (addressData && addressData.data && addressData.data.attributes) {
      const { address, city, name, phone, phoneTwo, pincode, state } =
        addressData.data.attributes;
      setDefaultValues({
        address: address || "",
        city: city || "",
        name: name || "",
        phone: parseInt(phone) || "",
        phoneTwo: parseInt(phoneTwo) || "",
        pincode: pincode || "",
        state: state || "",
      });

      setValue("address", address || "");
      setValue("city", city || "");
      setValue("name", name || "");
      setValue("phone", parseInt(phone) || "");
      setValue("phoneTwo", parseInt(phoneTwo) || "");
      setValue("pincode", pincode || "");
      setValue("state", state || "");
    }
  }, [addressData]);

  const getUniqueData = (data, property) => {
    const uniqueData = data.map((element) => element[property]);
    return uniqueData[0] || ""; // Return the first unique value or an empty string
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pincode = watch("pincode");
        if (pincode !== undefined && pincode.length === 6) {
          const response = await axios.get(`${import.meta.env.VITE_LOCATION_URL}${pincode}`);
  
          if (response && response.data && response.data[0].PostOffice) {
            const district = getUniqueData(response.data[0].PostOffice, "District");
            const state = getUniqueData(response.data[0].PostOffice, "State");
            setValue("city", district);
            setValue("state", state);
          }
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

      data.users_permissions_users = {
        connect: [userData.id]
      };
      const res = await PostAddress({ data: data, token: token });
      if (res.data) {
        refetch();
        userFetch();
        close();
        closeButton();
      } else {
        console.log(res.error);
      }
    } else {
      if (data.phoneTwo.length === 0) {
        data.phoneTwo = data.phone;
      }

      const res = await UpdateAddress({ data: data, token: token, id: id });
      if (res.data) {
        dispatch(setRefresh(true));
        refetch();
        userFetch();
        toast.success("Address updated successfully");
        close();
        closeButton();
      } else {
        console.log(res.error);
      }
    }
  };

  return (
    <>
      <div
        className="container-fluid w-100 vh-100 position-fixed top-0"
        style={{ background: "rgba(36, 35, 35, 0.301)", zIndex: "99999" }}
      >
        <div className="row">
          <div className="col-12 col-md-6 vh-100 top-0 bottom-0 position-fixed end-0 bg-white border border-danger">
            <div className="row">
              <div className="col-12 px-4 py-2 py-md-3 d-flex justify-content-between align-items-center border-bottom">
                <h4>Add Your Address</h4>
                <span
                  className="fs-3"
                  style={{ cursor: "pointer" }}
                  onClick={close}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </div>
              <div className="col-12 mt-2 mt-md-5">
                <div className="row">
                  <form onSubmit={handleSubmit(addInfo)}>
                    <div className="col-12">
                      <div className="row justify-content-around">
                        <InputBoxTwo
                          className={"col-10 col-md-5"}
                          label={"Enter Name"}
                          register={register("name", { required: false })}
                        />
                        <InputBoxTwo
                          type={"number"}
                          className={"col-10 col-md-5"}
                          label={"Enter Phone No"}
                          register={register("phone", { required: false })}
                        />
                      </div>
                      <div className="row justify-content-around">
                        <InputBoxTwo
                          type={"number"}
                          className={"col-10 col-md-5"}
                          label={"Enter Other Phone No (Optional)"}
                          register={register("phoneTwo", { required: false })}
                        />
                        <InputBoxTwo
                          className={"col-10 col-md-5"}
                          label={"Enter Pincode"}
                          register={register("pincode", { required: false, maxLength: 6 })}
                        />
                      </div>
                      <div className="row justify-content-center">
                        <TextArea
                          className={"col-10 col-md-11 p-0"}
                          label={"Enter Street/Address"}
                          style={{ height: "150px" }}
                          register={register("address", { required: false })}
                        />
                      </div>
                      <div className="row justify-content-around">
                        <InputBoxTwo
                          className={"col-10 col-md-5"}
                          label={"Enter City/District/Town"}
                          register={register("city", { required: false })}
                          readOnly={true}
                        />
                        <InputBoxTwo
                          className={"col-10 col-md-5"}
                          label={"Enter State"}
                          register={register("state", { required: false })}
                          readOnly={true}
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
          transition={Flip}
        />
      </div>
    </>
  );
}

export default AddressForm;
