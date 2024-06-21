import { faXmark, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getToken } from "../../services/LocalStorage/LocalStorage";
import {
  useGetCustomOrderDataQuery,
  useGetSingleProductDataQuery,
  usePostReviewMutation,
  useUpdateReviewMutation,
} from "../../services/FetchData/fetchData";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Review({ close, productId, orderId }) {
  // State variables for rating counter and review text
  const token = getToken();
  const [ratingCounter, setRatingCounter] = useState(0);
  const [review, setReview] = useState("");
  const [ratingStatus, setRatingStatus] = useState(false);
  const [starHover, setStarHover] = useState(0);
  const [addColor, setAddColor] = useState("");
  const [addText, setAddText] = useState("");

  // Fetching single product and order data
  const { data: singleProduct } = useGetSingleProductDataQuery(productId);
  const { data: orderData, refetch: OrderRefetch } = useGetCustomOrderDataQuery(
    {
      token: token,
      id: orderId,
    }
  );

  // Mutation hooks for posting and updating reviews
  const [PostReview] = usePostReviewMutation();
  const [UpdateReview] = useUpdateReviewMutation();
  console.log(orderData);
  // Effect hook to set rating and review if they exist in the fetched order data
  useEffect(() => {
    if (
      orderData &&
      orderData.data &&
      orderData.data.attributes &&
      orderData.data.attributes.reviews &&
      orderData.data.attributes.reviews.data &&
      orderData.data.attributes.reviews.data[0] &&
      orderData.data.attributes.reviews.data[0].attributes
    ) {
      setRatingCounter(
        orderData.data.attributes.reviews.data[0].attributes.rating
      );
      setReview(orderData.data.attributes.reviews.data[0].attributes.review);
      switch (orderData.data.attributes.reviews.data[0].attributes.rating) {
        case 1:
          setAddText("Very Bad");
          setAddColor("text-danger");
          break;
        case 2:
          setAddText("Bad");
          setAddColor("text-danger");
          break;
        case 3:
          setAddText("Good");
          setAddColor("text-success");
          break;
        case 4:
          setAddText("Very Good");
          setAddColor("text-success");
          break;
        case 5:
          setAddText("Excellent");
          setAddColor("text-success");
          break;

        default:
          break;
      }
    }
  }, [orderData]);

  // Handler for rating click

  const handleRating = async (index) => {
    setRatingCounter(index + 1);

    if (orderData?.data?.attributes?.reviews?.data) {
      if (orderData.data.attributes.reviews.data.length === 0) {
        // Post new review
        const res = await PostReview({
          token: token,
          data: {
            rating: index + 1,
            order_lists: { connect: [orderData.data.id] },
            products: { connect: [orderData.data.attributes.productId] },
          },
        });
        if (res.data) {
          OrderRefetch();
          setRatingStatus(true);
        }
      } else if (orderData.data.attributes.reviews.data[0]) {
        // Update existing review
        const res = await UpdateReview({
          token: token,
          id: orderData.data.attributes.reviews.data[0].id,
          data: {
            rating: index + 1,
          },
        });
        if (res.data) {
          OrderRefetch();
          setRatingStatus(true);
        }
      }
    }
  };

  // Handler for submitting the review
  const handleReviewSubmit = async () => {
    if (orderData?.data?.attributes?.reviews?.data) {
      if (orderData.data.attributes.reviews.data.length === 0) {
        // Post new review
        const res = await PostReview({
          token: token,
          data: {
            review: review,
            order_lists: { connect: [orderData.data.id] },
            products: { connect: [orderData.data.attributes.productId] },
          },
        });
        if (res.data) {
          OrderRefetch();
          toast.success("Your review has been Submitted");
          close
        } else {
          console.log(res.error);
        }
      } else if (orderData.data.attributes.reviews.data[0]) {
        // Update existing review
        const res = await UpdateReview({
          token: token,
          id: orderData.data.attributes.reviews.data[0].id,
          data: {
            review: review,
          },
        });
        if (res.data) {
          OrderRefetch();
          toast.success("Your review has been Submitted");
          close
        }
      }
    }
  };

  return (
    <>
      <div
        className="border border-danger container-fluid position-fixed top-0 start-0 vh-100 w-100"
        style={{ background: "rgba(36, 35, 35, 0.301)", zIndex: 999 }}
      >
        <div className="row">
          <div className="col-12 col-md-5 position-fixed end-0 bg-white h-100">
            <div className="row gap-md-3 gap-5">
              {/* Header with close button */}
              <div
                className="col-12 border-bottom d-flex justify-content-between align-items-center"
                style={{ height: "60px" }}
              >
                <h3>Rate & Review</h3>
                <span
                  className="fs-4"
                  onClick={close}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </div>

              {/* Product information */}
              <div className="col-12">
                {singleProduct?.data?.attributes && (
                  <div className="row align-items-center">
                    <div className="col-md-2 col-2">
                      {singleProduct.data.attributes.image?.data?.[0]
                        ?.attributes && (
                        <img
                          src={`${singleProduct.data.attributes.image.data[0].attributes.url}`}
                          alt=""
                          className="img-thumbnail"
                        />
                      )}
                    </div>
                    <div className="col-8">
                      <h6>
                        {singleProduct.data.attributes.titleOne.slice(0, 28)}...
                      </h6>
                    </div>
                  </div>
                )}
              </div>

              {/* Rating section */}
              <div
                className="col-12 border-top border-bottom py-2"
                style={{ height: "145px" }}
              >
                <div className="row gap-2">
                  <div className="col-12 d-flex justify-content-between ">
                    <h5>Rate This Product</h5>
                  </div>
                  <div className="col-12 d-flex justify-content-between   ">
                    <div className="d-flex align-items-center gap-2 ">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`${
                            index + 1 <= ratingCounter
                              ? "text-warning fs-1"
                              : "fs-1"
                          } ${
                            index + 1 <= starHover
                              ? "text-warning fs-1"
                              : "fs-1"
                          }`}
                          onClick={() => handleRating(index)}
                          onMouseOver={() => setStarHover(index + 1)}
                          onMouseOut={() => setStarHover(0)}
                          role="button"
                          style={{ color: "rgb(189, 189, 191)" }}
                          aria-label={`Rate ${index + 1} stars`}
                        >
                            &#9733;
                        </span>
                      ))}
                      {<small className={`${addColor}`}>{addText}</small>}
                    </div>
                  </div>
                  <div className="col-12 text-end ">
                    {ratingStatus && (
                      <small style={{ color: "rgb(154, 151, 156)" }}>
                        Your rating has been saved
                      </small>
                    )}
                  </div>
                </div>
              </div>

              {/* Review text area */}
              <div className="col-12">
                <div className="row gap-3">
                  <div className="col-12">
                    <h5>Write a review</h5>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control border-secondary"
                        placeholder="Leave a comment here"
                        id="floatingTextarea"
                        style={{ resize: "none", height: "180px" }}
                        aria-label="Write your comments"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                      ></textarea>
                      <label htmlFor="floatingTextarea">Comments</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="col-12 mt-4">
                <button
                  type="submit"
                  className="w-100 btn btn-success fs-5"
                  onClick={handleReviewSubmit}
                >
                  SUBMIT
                </button>
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
        theme="colored"
        transition={Flip}
      />
    </>
  );
}

export default Review;
