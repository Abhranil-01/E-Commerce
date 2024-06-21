import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  useDeleteCartDataMutation,
  useGetSingleProductDataQuery,
  useUpdateCartMutation,
} from "../../services/FetchData/fetchData";
import { getToken } from "../../services/LocalStorage/LocalStorage";
import { useDispatch, useSelector } from "react-redux";


function CartCard({ value,refetch }) {
  console.log(value);
  console.log(value.id);
  const token = getToken();
  const { data, isError, isLoading } = useGetSingleProductDataQuery(
    value.productId
  );
  const [DeleteCartData] = useDeleteCartDataMutation();
  const [UpdateCart] = useUpdateCartMutation();


  const decrement = async () => {
    if (value.qty > 1) {
      // const newCount = count - 1;
  
      // dispatch(setPrice(parseFloat(data.data.attributes.price) * newCount));
      await UpdateCart({
        token: token,
        id: value.id,
        data: { qty:value.qty-1 },
      });
      refetch()
    }
  };

  const increment = async () => {
    if (value.qty < 10) {
      // const newCount = count + 1;
     
      // dispatch(setPrice(parseFloat(data.data.attributes.price) * newCount));
      await UpdateCart({
        token: token,
        id: value.id,
        data: { qty: value.qty+1 },
      });
    refetch()
    }
  };

  const handleDeleteItem = async () => {
    await DeleteCartData({ token: token, id: value.id });
refetch()
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    data &&
    data.data && (
      
     <div className="col-12">
       <div className="card border-0 shadow  position-relative ">
        <div className="row">
          <div className="col-md-3 col-11  d-flex justify-content-center align-items-center ">
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}${data.data.attributes.image.data[0].attributes.url}`}
              className="img-fluid"
              alt="cart image"
            />
          </div>
          <div className="col-md-9 col-11 p-0 px-4 mt-2">
            <div className="row">
              <div className="col-12 p-0 ps-3 card-title">
                <p className="mb-2 fs-5 fw-bold ">{data.data.attributes.title}</p>
                <p className="mb-2 ">{data.data.attributes.titleOne}</p>
                <p>Size: {value.size}</p>
              </div>
            </div>
            <div className="row mt-3 ps-3">
              <p className="col-md-1 col-2 p-0">Qty:</p>
              <div className="col-md-3 col-6 p-0">
                <div className=" input-group">
                  <button
                    className="fw-bold  btn btn-light rounded-0 border border-secondary   "
                    style={{
                      padding: "3px 12px",
                      fontSize: "20px",
                    }}
                    onClick={decrement}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={value.qty}
                    className="text-center form-control"
                    style={{ outline: "none", padding: "0px 10px" }}
                    min={1}
                    max={10}
                  />
                  <button
                    className="fw-bold  btn btn-light rounded-0 border border-secondary   "
                    style={{
                      padding: "3px 12px",
                      fontSize: "20px",
                    }}
                    onClick={increment}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <p className="col p-0 ps-3">
                ₹<span id="itemval">{parseFloat(data.data.attributes.price) *value.qty }</span>
              </p>
            </div>
          </div>
        </div>
        <div className="text-danger fw-bold position-absolute fs-5" style={{ bottom: "16%", right: "5%", cursor: "pointer" }}>
          <span onClick={handleDeleteItem}>
            <FontAwesomeIcon icon={faTrashCan} />
          </span>
        </div>
      </div>
     </div>
    )
  );
}

export default CartCard;
