import React, { useState, useEffect } from "react";
import ShopCard from "../../Components/ShopCard/ShopCard";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Filter from "../../Components/Filter/Filter";
import { NavLink, useParams } from "react-router-dom";
import { customStoreAction, setLoader } from "../../services/Data/DataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetStoreDataQuery } from "../../services/FetchData/fetchData";
import { setFilteredItems, setPrice, setSearchInput } from "../../services/FilterSlice/filterSlice";
import NoItems from "../../Components/NoItems/NoItems";
import Loader from "../../Components/Loader/Loader";
import SkeletonLoader from "./SkeletonLoader";

function Store() {
  const [isOpen, setIsOpen] = useState(false);
  const { nameOne, nametwo, id, filter } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(customStoreAction({ key: nametwo }));
  }, [dispatch, nametwo]);

  const img = useSelector((state) => state.data.img);
  const nav = useSelector((state) => state.data.navOne);
  const subCategoryId = useSelector((state) => state.data.id);
  const loader = useSelector((state) => state.data.loader); // Get the loader state

  const { data, isError, isLoading, refetch } = useGetStoreDataQuery({
    name: nav,
    id: id,
    params: filter,
  });

  useEffect(() => {
    if (data && data.data && data.data.attributes && data.data.attributes.products && data.data.attributes.products.data) {
      const priceArray = data.data.attributes.products.data.map((item) => item.attributes.price);
      dispatch(setPrice([Math.min(...priceArray), Math.max(...priceArray)]));
      refetch();
    }
    dispatch(setLoader(false)); // Set loader state to false once data is fetched
  }, [data, dispatch]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const renderContent = () => {
    if (isLoading || loader) {
      return <SkeletonLoader />;
    }

    if (isError || !data || !data.data || !data.data.attributes || !data.data.attributes.products || data.data.attributes.products.data.length === 0) {
      return <NoItems name="Sorry, No Products Available" img="/Images/cart icon/9264885.jpg" />;
    }

    return (
      <>
        <div className="container mt-5 filter-button">
          <div className="row d-flex justify-content-end">
            <div className="col-4 col-md-2 p-0 border border-dark d-flex align-items-center justify-content-center me-3 gap-1" onClick={handleOpen} style={{ height: "3rem", cursor: "pointer" }}>
              <span>
                <FontAwesomeIcon icon={faFilter} />
              </span>
              <span>Filter</span>
            </div>
          </div>
        </div>
        <div className="container my-3">
          <div className="my-4 row row-cols-2 row-cols-lg-4 row-cols-md-2">
            {data.data.attributes.products.data.map((element) => (
              <ShopCard key={element.id} values={element} />
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="card rounded-0 border-0 image-bar" style={{ marginTop: "80px" }}>
        <img src={img} className="card-img-top rounded-0 position-relative " alt="..." />
        <div className="d-flex align-items-center ps-md-5 ps-3 position-absolute text-white w-100 h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.220)" }}>
          <h2 className="fw-bold fst-italic text-capitalize ">{nametwo.replace("-", " ")}</h2>
        </div>
      </div>
      <div className="container-fluid mt-3 navigation">
        <h5>
          <NavLink to="/" className="text-decoration-none text-secondary">Home</NavLink>
          <span> | </span>
          <NavLink to={`/items/${nameOne}/${subCategoryId}`} className="text-capitalize text-decoration-none text-secondary ">{nameOne}</NavLink>
          <span> | </span>
          <NavLink to={`/${nameOne}/${nametwo}/${id}`} className="text-capitalize text-decoration-none text-dark">{nametwo.replace("-", " ")}</NavLink>
        </h5>
      </div>
      {isOpen && data && <Filter close={() => setIsOpen(false)} />}
      {renderContent()}
    </>
  );
}

export default Store;
