import React from "react";
import Input from "../FormControl/Input";
import Button from "../FormControl/Button";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import PasswordInput from "../FormControl/PasswordInput";
import { useRegisterUserMutation } from "../../services/FetchData/fetchData";
import { storeToken } from "../../services/LocalStorage/LocalStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAlert,
  setUserInfo,
  setUserToken,
} from "../../services/UserauthSlice/UserauthSlice";
function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onRegister = async (data) => {
    //  Email or Username are already taken
    const res = await registerUser(data);
    if (res.error) {
      toast.error(res.error.data.error.message)
    }
    if (res.data) {
      const token = res.data.jwt;
      storeToken(token);
      dispatch(setUserToken(token));
      dispatch(
        setUserInfo({
          name: res.data.user.name,
          email: res.data.user.email,
          phone: res.data.user.phone,
        })
      );
      dispatch(setAlert(true));
      navigate("/");
    }
  };

  return (
    <>
      {" "}
      <div className="w-75">
        <form onSubmit={handleSubmit(onRegister)}>
          <Input
            placeholderText="Enter Full Name"
            register={register("name", { required: true })}
            icon={faUser}
          />
          <Input
            placeholderText="Enter Username"
            register={register("username", { required: true })}
            icon={faUser}
          />
          <Input
            type="Email"
            placeholderText="Enter Email"
            register={register("email", { required: true })}
            icon={faEnvelope}
          />
          <Input
            type="tel"
            placeholderText="Enter Phone No"
            register={register("phone", { required: true })}
            icon={faPhone}
          />
          <PasswordInput
            type="password"
            placeholderText="Enter Password"
            register={register("password", { required: true })}
            icon={faLock}
          />
          <Button type="submit" text="Register" />
        </form>
      </div>{" "}
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
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default Register;
