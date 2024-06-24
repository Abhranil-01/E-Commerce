import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customAction } from "../../services/Data/DataSlice";
import { NavLink, useParams } from "react-router-dom";
import { useGetCustomDataQuery } from "../../services/FetchData/fetchData";
import Card from "../../Components/Card/Card";
import SkeletonLoader from './SkeletonLoader';
import './style.scss'
function SubCategory() {
  const { name, id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(customAction({ key: name }));
  }, [dispatch, name]);

  const img = useSelector((state) => state.data.img);
  const headTitle = useSelector((state) => state.data.headTitle);

  const { data, isError, isLoading } = useGetCustomDataQuery(name+'s');

  return (
    <>
      <div className="card rounded-0 border-0" style={{ marginTop: "50px" }}>
        <img
          src={img}
          className="card-img-top rounded-0 position-relative"
          alt="..."
        />
        <div
          className="d-flex align-items-center ps-5 position-absolute text-white w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.220)" }}
        >
          <h1 className="fw-bold fst-italic">{headTitle}</h1>
        </div>
      </div>
      <div className="container-fluid mt-3">
        <h4>
          <NavLink to="/" className="text-decoration-none text-secondary">
            Home
          </NavLink>
          <span> | </span>
          <NavLink
            to={`/items/${name}/${id}`}
            className="text-capitalize text-decoration-none text-dark"
          >
            {name}
          </NavLink>
        </h4>
      </div>
      <div className="container my-5">
        <div className="row row-cols-2 row-cols-md-4 g-4">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            data &&
            data.data.map((element) => (
              <Card
                key={element.id}
                title={element.attributes.title}
                img={element.attributes.image.data.attributes.url}
                id={element.id}
                navName={element.attributes.navigation}
                name={name}
                categoryId={id}
              />
            ))
          )}
        </div>
        {isError && <div>Error loading data...</div>}
      </div>
    </>
  );
}

export default SubCategory;
