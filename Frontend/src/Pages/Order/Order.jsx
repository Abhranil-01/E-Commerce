import React, { useEffect } from "react";
import OrderCard from "../../Components/OrderCard/OrderCard";
import { useGetUserQuery } from "../../services/FetchData/fetchData";
import { getToken } from "../../services/LocalStorage/LocalStorage";
import { useSelector } from "react-redux";
import NotLogin from "../../Components/NotLogin/NotLogin";
import NoItems from "../../Components/NoItems/NoItems";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkeletonLoader from "./SkeletonLoader";

function Order() {
  const token = getToken();

  const { data: userData, refetch, isLoading } = useGetUserQuery(token);
  const orderAlert = useSelector((state) => state.userInfo.showAlert);
  const refresh = useSelector((state) => state.updateInfo.refresh);

  useEffect(() => {
    if (refresh) {
      refetch();
    }
  }, [refresh, refetch]);

  useEffect(() => {
    if (orderAlert) {
      toast.success("Order placed successfully");
    }
  }, [orderAlert]);

  return (
    <>
      {token ? (
        isLoading ? (
       <SkeletonLoader/>
        ) : (
          userData && userData.order_lists && userData.order_lists.length !== 0 ? (
            <div className="container" style={{ marginTop: "120px" }}>
              <h3>Your Orders</h3>
              <div className="row mt-4">
                {userData.order_lists.map((element) => (
                  <OrderCard key={element.id} id={element.id} element={element} />
                ))}
              </div>
            </div>
          ) : (
            <NoItems img={'/Images/cart icon/9264885.jpg'} name={"No Orders Yet"} />
          )
        )
      ) : (
        <NotLogin title={"YOUR ORDERS"} />
      )}
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
