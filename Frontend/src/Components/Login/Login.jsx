import React from "react";
import { useForm } from "react-hook-form";
import Input from "../FormControl/Input";
import Button from "../FormControl/Button";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import PasswordInput from "../FormControl/PasswordInput";
import { useLoggedUserMutation } from "../../services/FetchData/fetchData";
import { storeToken } from "../../services/LocalStorage/LocalStorage";
import { useNavigate } from "react-router-dom";
import {
  setAlert,
  setUserInfo,
  setUserToken,
} from "../../services/UserauthSlice/UserauthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [LoggedUser] = useLoggedUserMutation();
  const onLogin = async (data) => {
    const res = await LoggedUser(data);
    if (res.data) {
      const token = res.data.jwt;
      storeToken(token);
      dispatch(setUserToken(token));
      console.log(res.data);
      dispatch(
        setUserInfo({
          name: res.data.user.name,
          email: res.data.user.email,
          phone: res.data.user.phone,
        })
      );
      dispatch(setAlert(true));
      navigate("/");

      console.log("Token stored successfully:", token);
    }
    if (res.error) {
      console.log(res);
      toast.error(res.error.data.error.message)
    }
  };

  return (
    <>
      {" "}
      <div className="w-75">
        <form onSubmit={handleSubmit(onLogin)}>
          <Input
            placeholderText="Enter Username/Email"
            register={register("identifier", { required: true })}
            icon={faUser}
          />
          <PasswordInput
            type="password"
            placeholderText="Enter Password"
            register={register("password", { required: true })}
            icon={faLock}
          />
          <Button type="submit" text="Login" />
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

export default Login;
