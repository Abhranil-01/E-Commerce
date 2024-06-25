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

function CartCard({ value, refetch }) {
  const [loaderDisplay, setLoaderDisplay] = useState(false);
  // console.log(value);
  // console.log(value.id);
  const token = getToken();
  const { data, isError, isLoading } = useGetSingleProductDataQuery(
    value.productId
  );
  const [DeleteCartData] = useDeleteCartDataMutation();
  const [UpdateCart] = useUpdateCartMutation();

  const updateCartQuantity = async (newQty) => {
    setLoaderDisplay(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for 1000ms
    await UpdateCart({
      token: token,
      id: value.id,
      data: { qty: newQty },
    });
  
refetch()

    setLoaderDisplay(false);
  };

  const decrement = async () => {
    if (value.qty > 1) {
      updateCartQuantity(value.qty - 1);
    }
  };

  const increment = async () => {
    if (value.qty < 10) {
      updateCartQuantity(value.qty + 1);
    }
  };

  const handleDeleteItem = async () => {
    await DeleteCartData({ token: token, id: value.id });
    refetch();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    data &&
    data.data && (
      <div className="col-12">
        <div className="card  shadow position-relative  ">
          <div className="row">
            <div className="col-md-4   col-12 d-flex align-items-center  ">
              <img
                src={`${data.data.attributes.image.data[0].attributes.url}`}
                className="img-thumbnail border-0 "
                alt="cart image"
              />
            </div>
            <div className="col-md-8 col-11 p-0 px-4 mt-2">
              <div className="row">
                <div className="col-12 p-0 ps-3 card-title">
                  <p className="mb-2 fs-5 fw-bold">
                    {data.data.attributes.title}
                  </p>
                  <p className="mb-2">{data.data.attributes.titleOne}</p>
                  <p>Size: {value.size}</p>
                </div>
              </div>
              <div className="row mt-3 ps-3">
                <p className="col-md-1 col-2 p-0">Qty:</p>
                <div className="col-md-3 col-6 p-0 position-relative">
                  <div className="input-group">
                    <button
                      className="fw-bold btn btn-light rounded-0 border border-secondary"
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
                      className="text-center form-control position-relative"
                      style={{ outline: "none", padding: "0px 10px" }}
                      min={1}
                      max={10}
                    />
                    <button
                      className="fw-bold btn btn-light rounded-0 border border-secondary"
                      style={{
                        padding: "3px 12px",
                        fontSize: "20px",
                      }}
                      onClick={increment}
                    >
                      +
                    </button>
                  </div>
                  {loaderDisplay && (
                    <div
                      className="spinner-border position-absolute bg-white text-primary"
                      role="status"
                      style={{ zIndex: "99999", left: "36%", top: "10%" }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="row mt-4">
                <p className="col p-0 ps-3">
                  ₹
                  <span id="itemval">
                    {parseFloat(data.data.attributes.price) * value.qty}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            className="text-danger fw-bold position-absolute fs-5"
            style={{ bottom: "16%", right: "5%", cursor: "pointer" }}
          >
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
