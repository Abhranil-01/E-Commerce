import React, { useEffect, useState } from "react";
import "./shopCard.scss";
import { useNavigate } from "react-router-dom";

function ShopCard({ values }) {
  console.log(values.attributes.image.data[0].attributes.url);
  const words = values.attributes.titleOne.slice(0, 22);

  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);
  const [totalRating, setTotalRating] = useState(0);
  const [avg, setAvg] = useState(0);
  const [reviewsLength, setReviewsLength] = useState(0);

  useEffect(() => {
    if (
      values &&
      values.attributes &&
      values.attributes.reviews &&
      values.attributes.reviews.data
    ) {
      setReviewsLength(values.attributes.reviews.data.length);
      const fiveStarRating = values.attributes.reviews.data.filter(
        (product) => product.attributes.rating === 5
      );
      const fourStarRating = values.attributes.reviews.data.filter(
        (product) => product.attributes.rating === 4
      );
      const threeStarRating = values.attributes.reviews.data.filter(
        (product) => product.attributes.rating === 3
      );
      const twoStarRating = values.attributes.reviews.data.filter(
        (product) => product.attributes.rating === 2
      );
      const oneStarRating = values.attributes.reviews.data.filter(
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
  }, [values, setRatings, setReviewsLength]);
  useEffect(() => {
    const total = ratings.reduce((sum, rating) => sum + rating.count, 0);
    const totalStar = ratings.reduce(
      (sum, rating) => sum + rating.totalStar,
      0
    );
    setAvg((totalStar / total).toFixed(1));
    setTotalRating(total);
  }, [ratings, setTotalRating, setAvg, avg]);

  const handleClick = () => {
    const navTitleOne = values.attributes.titleOne
      .replace(/ /g, "-")
      .replace("/", "-")
      .replace("/", "-");
    navigate(`/${values.attributes.title}-${navTitleOne}/${values.id}`);
  };
  return (
    <div className="col p-0 p-md-2   ">
      <div class="card shop-card rounded-0 p-0 " onClick={handleClick}>
        <div className="position-relative "          >
          <img
            src={`${values.attributes.image.data[0].attributes.url}`}
            class="card-img-top rounded-0   "
            alt="..."
           
   
          />
          {reviewsLength !== 0 && (
            <p
              className=" d-flex align-items-center position-absolute border px-1  "
              style={{
                height: "28px",
                bottom: "0%",
                background: "rgb(230, 232, 235)",
              }}
            >
              <span className="fs-5 text-warning">&#9733;</span>
              {totalRating !== 0 ? avg : (0).toFixed(1)} | {reviewsLength}
            </p>
          )}
        </div>

        <div class="card-body">
          <h5 class="card-title">{values.attributes.title}</h5>
          <p class="card-text text-capitalize">{words}...</p>
          <p class="card-text fw-bold ">₹{values.attributes.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ShopCard;
