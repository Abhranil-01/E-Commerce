import React, { useEffect, useReducer, useState } from "react";
// import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetCartDataQuery,
  useGetSingleProductDataQuery,
  useGetUserQuery,
  useUpdateCartMutation,
} from "../../services/FetchData/fetchData";
import SizeBox from "../../Components/SizeBox/SizeBox";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ProductPageReview from "../../Components/ProductPageReview/ProductPageReview";

function ProductImageSlider() {
  const { id } = useParams();
  const { data, isError, isLoading, refetch } =
    useGetSingleProductDataQuery(id);
  const [addToCart] = useAddToCartMutation();
  const [UpdateCart] = useUpdateCartMutation();
  const [imgs, setImgs] = useState([]);
  const [wordData, setWordData] = useState(null);
  const [val, setVal] = useState(0);
  const [size, setSize] = useState("");
  const [ratings, setRatings] = useState([]);
  const [totalRating, setTotalRating] = useState(0);
  const [avg, setAvg] = useState(0);
  const [reviewsLength, setReviewsLength] = useState(0)
  const token = localStorage.getItem("access_token");

  const { data: userData, refetch: userfetch } = useGetUserQuery(token);
  const dispatch = useDispatch();

  // Image slider effect
  console.log(data);
  const navigate = useNavigate();
  useEffect(() => {
    if (data && data.data.attributes) {
      refetch();
      setImgs(data.data.attributes.image.data);
      setSize(data.data.attributes.size);
    }
  }, [data]);

  useEffect(() => {
    if (imgs && imgs.length > 0) {
      setWordData(imgs[val]);
    }
  }, [imgs, val]);

  useEffect(() => {
    if (
      data &&
      data.data &&
      data.data.attributes &&
      data.data.attributes.reviews &&
      data.data.attributes.reviews.data
    ) {
      setReviewsLength( data.data.attributes.reviews.data.length)
      const fiveStarRating = data.data.attributes.reviews.data.filter(
        (product) => product.attributes.rating === 5
      );
      const fourStarRating = data.data.attributes.reviews.data.filter(
        (product) => product.attributes.rating === 4
      );
      const threeStarRating = data.data.attributes.reviews.data.filter(
        (product) => product.attributes.rating === 3
      );
      const twoStarRating = data.data.attributes.reviews.data.filter(
        (product) => product.attributes.rating === 2
      );
      const oneStarRating = data.data.attributes.reviews.data.filter(
        (product) => product.attributes.rating === 1
      );
      setRatings([
        {
          star: 5,
          count: fiveStarRating.length,
          totalStar: 5 * fiveStarRating.length,
        },
        {
          star: 4,
          count: fourStarRating.length,
          totalStar: 4 * fourStarRating.length,
        },
        {
          star: 3,
          count: threeStarRating.length,
          totalStar: 3 * threeStarRating.length,
        },
        {
          star: 2,
          count: twoStarRating.length,
          totalStar: 2 * twoStarRating.length,
        },
        {
          star: 1,
          count: oneStarRating.length,
          totalStar: 2 * oneStarRating.length,
        },
      ]);
    }
  }, [data]);
  useEffect(() => {
    const total = ratings.reduce((sum, rating) => sum + rating.count, 0);
    const totalStar = ratings.reduce(
      (sum, rating) => sum + rating.totalStar,
      0
    );
    setAvg((totalStar / total).toFixed(1));
    setTotalRating(total);
  }, [ratings, setTotalRating, setAvg, avg]);

  const handleClick = (index) => {
    setVal(index);
  };

  const handleSubmit = async () => {
    if (token) {
      try {
        if (size.length > 0) {
          setSize(size);
        }
        if (userData) {
          const existingCartItem = userData.add_to_carts.find(
            (item) => item.productId === parseInt(id) && item.size === size
          );
          console.log("jj", existingCartItem);
          if (existingCartItem) {
            const updatedQty = existingCartItem.qty + 1;
            const res = await UpdateCart({
              token: token,
              id: existingCartItem.id,
              data: { qty: updatedQty },
            });
            if (res.data) {
              userfetch();
              toast.success("Product added to cart");
              console.log("res", res.data);
            }

            // console.log("wedf", res);
          } else {
            const addData = {
              productId: parseInt(id),
              qty: 1,
              size: size,
              price: data.data.attributes.price,
              users_permissions_users: {
                connect: [userData.id],
              },
            };
            const res = await addToCart({ token: token, data: addData });
            if (res.data) {
              console.log("uhuh", res);

              userfetch();
              toast.success("Product added to cart");
            }

            // Optimistic update
          }
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        // Handle errors and potentially revert optimistic update
      }
    } else {
      toast.error("Please Login To Add The Data");
    }
  };

  return (
    <>
      {data ? (
        <div className=" container-fluid  " style={{ marginTop: "130px" }}>
          <div className="row align-items-center justify-content-center    ">
            <div className="col-12 col-md-5  p-md-0 ">
              <div className="row d-flex flex-column-reverse flex-md-row    align-items-center   ">
                <div className="col-12 col-md-2   mt-2 mt-md-0  ">
                  <div className="row d-flex align-items-end justify-content-center  ">
                    {imgs &&
                      imgs.map((element, i) => (
                        <div
                          className="col-md-12 col-2"
                          key={element.id}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            className="img-fluid border border-dark  "
                            src={`http://localhost:1337${element.attributes.url}`}
                            onClick={() => handleClick(i)}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="col-md-9 col-10  p-md-0 ">
                  {wordData && (
                    <img
                      src={`http://localhost:1337${wordData.attributes.url}`}
                      className="img-fluid  border border-dark "
                    />
                  )}
                </div>
              </div>
            </div>
            <div className=" col-xl-6 col-lg-6 d-flex flex-column justify-content-center gap-3 px-3  ">
              <div>
                <p className="fw-bolder">{data.data.attributes.title}</p>
                <h4>{data.data.attributes.titleOne}</h4>
                {
                  reviewsLength !==0 && 
                  <p
                  className=" d-flex align-items-center "
                  style={{ height: "28px" }}
                >
                  <span className="fs-5 text-warning">&#9733;</span>
                  {totalRating !== 0 ? avg : (0).toFixed(1)} | {reviewsLength} Reviews
                </p>
                }
             
                <p style={{ fontWeight: "500" }}>
                  ₹{data.data.attributes.price}
                </p>
              </div>
              <div>
                <p className="fw-bold">Description</p>
                <p style={{ fontWeight: "500" }}>
                  {data.data.attributes.description}
                </p>
              </div>
              {data.data.attributes.SizeOne && (
                <div>
                  <p className="fw-bold">Select Size</p>
                  <div className="conatiner">
                    <div className="row row-cols-4 g-4">
                      {data.data.attributes.SizeOne && (
                        <SizeBox
                          value={data.data.attributes.SizeOne}
                          onClick={(value) => setSize(value)}
                        />
                      )}
                      {data.data.attributes.SizeTwo && (
                        <SizeBox
                          value={data.data.attributes.SizeTwo}
                          onClick={(value) => setSize(value)}
                        />
                      )}
                      {data.data.attributes.SizeThree && (
                        <SizeBox
                          value={data.data.attributes.SizeThree}
                          onClick={(value) => setSize(value)}
                        />
                      )}
                      {data.data.attributes.SizeFour && (
                        <SizeBox
                          value={data.data.attributes.SizeFour}
                          onClick={(value) => setSize(value)}
                        />
                      )}
                      {data.data.attributes.SizeFive && (
                        <SizeBox
                          value={data.data.attributes.SizeFive}
                          onClick={(value) => setSize(value)}
                        />
                      )}
                      {data.data.attributes.SizeSix && (
                        <SizeBox
                          value={data.data.attributes.SizeSix}
                          onClick={(value) => setSize(value)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className="row  my-5">
            {data.data &&
              data.data.attributes &&
              data.data.attributes.reviews &&
              data.data.attributes.reviews.data.length !== 0 && (
                <ProductPageReview
                  reviews={data.data.attributes.reviews}
                  totalRating={totalRating}
                  avg={avg}
                  ratings={ratings}
                />
              )}
          </div>
        </div>
      ) : (
        <p>No Data Is Available</p>
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

export default ProductImageSlider;
