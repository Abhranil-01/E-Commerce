
import React, { useEffect, useState } from "react";
import OrderCard from "../../Components/OrderCard/OrderCard";
import { useGetOrderDataQuery, useGetUserQuery } from "../../services/FetchData/fetchData";
import { getToken } from "../../services/LocalStorage/LocalStorage";
import { useSelector } from "react-redux";
import NotLogin from "../../Components/NotLogin/NotLogin";
import NoItems from "../../Components/NoItems/NoItems";
import Review from "../../Components/Review/Review";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Order() {
  const token=getToken()

  const {data:userData,refetch}=useGetUserQuery(token)
const orderAlert=useSelector((state)=>state.userInfo.showAlert)
  const refresh=useSelector((state)=>state.updateInfo.refresh)
  useEffect(()=>{
    if(refresh){
      refetch()
    }
  },[refresh])
console.log(userData);
useEffect(()=>{
  if(orderAlert){
    toast.success("Order placed successfully")
  }
},[orderAlert])
  return (
    <>
        {
      token ?(userData && userData.order_lists && userData.order_lists.length!==0 ?(
        <div className="container  " style={{ marginTop: "120px" }}>
        <h3>Your Orders</h3>
        <div className="row mt-4">
          {
            userData && userData.order_lists.map((element)=>(
              <OrderCard key={element.id} id={element.id} element={element}/>
            ))
          }
       
        </div>
      </div>
      ) :(<NoItems img={'/src/Images/cart icon/9264885.jpg'}
      name={"No Orders Yet"}/>) 
    ) :(<NotLogin title={"YOUR ORDERS"}/>) 
    }
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

export default Order;
