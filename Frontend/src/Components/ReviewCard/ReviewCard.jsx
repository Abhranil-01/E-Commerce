import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ReviewCard({ element }) {
  return (
    <>
      <div className="col-md-12 border-bottom border-dark d-flex flex-column justify-content-center py-4 ">
        <div className="row">
          <div>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`${
                  index + 1 <= element.rating ? "text-warning fs-2" : "fs-2"
                }`}
                role="button"
                style={{ color: "rgb(189, 189, 191)" }}
                aria-label={`Rate ${index + 1} stars`}
              >
                &#9733;
              </span>
            ))}
          </div>
          <div className="col-md-7 col-12">
            <p>{element.review}</p>
          </div>
          {element.order_lists && element.order_lists.data && element.order_lists.data[0] &&
            element.order_lists.data[0].attributes &&
            element.order_lists.data[0].attributes.user_addresses &&
            element.order_lists.data[0].attributes.user_addresses.data[0]
              .attributes && (
              <small>
                {
                  element.order_lists.data[0].attributes.user_addresses.data[0]
                    .attributes.name
                }{" "}
                |{" "}
                {
                  element.order_lists.data[0].attributes.user_addresses.data[0]
                    .attributes.state
                }
              </small>
            )}
        </div>
      </div>
    </>
  );
}

export default ReviewCard;
