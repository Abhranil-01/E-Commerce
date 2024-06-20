import React from "react";

function SearchCard() {
  return (
    <>
      <div
        class="card border-2 w-100 rounded-0 "
        style={{ height: "4rem", cursor: "pointer" }}
      >
        <div class="row g-0 h-100">
          <div class="col-3 col-lg-2 col-xl-2 h-100 ">
            <img
              src="\src\Images\Category Poster\badminton.png"
              class="img-thumbnail rounded-start h-100 border-0 "
              alt="..."
            />
          </div>
          <div class="col h-100 ">
            <div class="card-body  h-100">
              <p className=" card-text mt-1">Football</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchCard;
