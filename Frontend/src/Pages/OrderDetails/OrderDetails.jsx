import React, { useEffect, useState } from "react";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useGetCustomOrderDataQuery,
  useGetSingleProductDataQuery,
  useUpdateOrderDataMutation,
} from "../../services/FetchData/fetchData";
import { getToken } from "../../services/LocalStorage/LocalStorage";
import { useDispatch } from "react-redux";
import { setRefresh } from "../../services/UpdateSlice/UpdateSlice";
import Review from "../../Components/Review/Review";
import SkeletonLoader from "./SkeletonLoader";

function OrderDetails({ close, id }) {
  const [productId, setProductId] = useState("");
  const [review, setReview] = useState(false);
  const dispatch = useDispatch();
  const token = getToken();
  const { data: orderData, refetch } = useGetCustomOrderDataQuery({
    token: token,
    id: id,
  });
  const [UpdateOrderData] = useUpdateOrderDataMutation();

  const cancelOrder = async (id) => {
    const res = await UpdateOrderData({
      token: token,
      data: { cancel: true },
      id: id,
    });
    if (res.data) {
      refetch();
      dispatch(setRefresh(true));
    }
  };

  useEffect(() => {
    if (orderData && orderData.data && orderData.data.attributes) {
      setProductId(orderData.data.attributes.productId);
    }
  }, [orderData]);

  const { data: singleProduct } = useGetSingleProductDataQuery(productId);

  return (
    <>
      {review && orderData && orderData.data && orderData.data.attributes && (
        <Review
          close={() => setReview(false)}
          productId={orderData.data.attributes.productId}
          orderId={orderData.data.id}
        />
      )}

      <div
        className="container-fluid w-100 vh-100 position-fixed top-0 start-0 z-3 "
        style={{ background: "rgba(36, 35, 35, 0.301)" }}
      >
        <div className="row ">
          <div className="col-12 col-md-5 vh-100 position-fixed end-0 bg-white bottom-0 ">
            <div className="row">
              <div className="col-12 px-4 py-3 d-flex justify-content-between align-items-center border-bottom">
                <h4>Order Details</h4>
                <span className="fs-3" style={{ cursor: "pointer" }} onClick={close}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </div>
              {orderData &&
              orderData.data &&
              orderData.data.attributes &&
              singleProduct &&
              singleProduct.data &&
              singleProduct.data.attributes ? (
                <>
                  <div className="col-12">
                    <div className="card my-3 border-0">
                      <div className="row g-0">
                        <div className="col-md-4 col-6 m-auto">
                          <img
                            src={`${singleProduct.data.attributes.image.data[0].attributes.url}`}
                            alt={singleProduct.data.attributes.titleOne}
                            className="img-fluid rounded-start"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              {singleProduct.data.attributes.title}
                            </h5>
                            <p className="card-text">
                              {singleProduct.data.attributes.titleOne}
                            </p>
                            <p className="card-text">
                              Size: {orderData.data.attributes.size}, Qty: {orderData.data.attributes.qty}, Price: ₹{orderData.data.attributes.price}
                            </p>
                            <p className="card-text">
                              {orderData.data.attributes.reviews &&
                              orderData.data.attributes.reviews.data &&
                              orderData.data.attributes.reviews.data[0] &&
                              orderData.data.attributes.reviews.data[0].attributes &&
                              [...Array(5)].map((_, index) => (
                                <span
                                  key={index}
                                  className={`${
                                    index + 1 <= orderData.data.attributes.reviews.data[0].attributes.rating
                                      ? "text-warning fs-1"
                                      : "fs-1"
                                  }`}
                                  role="button"
                                  style={{ color: "rgb(189, 189, 191)" }}
                                  aria-label={`Rate ${index + 1} stars`}
                                >
                                  &#9733;
                                </span>
                              ))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    {orderData.data.attributes.user_addresses &&
                      orderData.data.attributes.user_addresses.data &&
                      orderData.data.attributes.user_addresses.data[0] &&
                      orderData.data.attributes.user_addresses.data[0].attributes && (
                        <div className="card border-0 mb-3">
                          <div className="card-body">
                            <h4 className="card-title">Delivery Address</h4>
                            <p className="card-text">
                              {orderData.data.attributes.user_addresses.data[0].attributes.name}
                            </p>
                            <p className="card-text">
                              {orderData.data.attributes.user_addresses.data[0].attributes.address}, 
                              {orderData.data.attributes.user_addresses.data[0].attributes.pincode}, 
                              {orderData.data.attributes.user_addresses.data[0].attributes.city}, 
                              {orderData.data.attributes.user_addresses.data[0].attributes.state}
                            </p>
                          </div>
                        </div>
                      )}
                  </div>
                  {!orderData.data.attributes.cancel ? (
                    <div className="col-12" style={{ marginTop: "50px" }}>
                      <div className="row">
                        <div className="col-6">
                          <button
                            className="btn btn-primary w-100"
                            onClick={() => setReview(true)}
                          >
                            Rate The Product
                          </button>
                        </div>
                        <div className="col-6">
                          <button
                            className="btn btn-danger w-100"
                            onClick={() => cancelOrder(id)}
                          >
                            Cancel Order
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-12 text-center text-danger fw-bold">
                      Your Order Is Cancelled & Money Refund Completed
                    </div>
                  )}
                </>
              ) : (
                <SkeletonLoader/>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
