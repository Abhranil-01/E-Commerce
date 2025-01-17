import React, { useEffect, useState, useCallback } from "react";
import "./filter.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PriceRange from "./PriceRange/PriceRange";
import AppliedBox from "./AppliedBox/AppliedBox";
import FilterList from "./FilterList/FilterList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStoreDataQuery } from "../../services/FetchData/fetchData";
import { setGender, setSize, setSelectedFilters, setPriceFilters, clearFilters } from "../../services/FilterSlice/filterSlice";
import PriceRangeAppliedFilter from "./PriceRangeAppliedFilter/PriceRangeAppliedFilter";
import LazyLoad from "react-lazy-load";
import SkeletonLoader from "./SkeletonLoader";

function Filter({ close }) {
  const { nameOne, nametwo, id } = useParams();
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [data, setData] = useState([]);
  const [size, setSizeState] = useState([]);
  const [gender, setGenderState] = useState([]);
  const nav = useSelector((state) => state.data.navOne);
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state) => state.filter.selectedFilters);
  const priceFilters = useSelector((state) => state.filter.priceFilters);
  const navigate = useNavigate();

  const { data: items, refetch, isLoading } = useGetStoreDataQuery({
    name: nav,
    id: id,
  });

  useEffect(() => {
    if (items && items.data && items.data.attributes && items.data.attributes.products && items.data.attributes.products.data) {
      const products = items.data.attributes.products.data;
      setData(products);

      const priceArray = products.map((item) => item.attributes.price);
      setMaxPrice(Math.max(...priceArray));
      setMinPrice(Math.min(...priceArray));

      refetch();
      setSizeState(getUniqueData(products, "size"));
      setGenderState(getUniqueData(products, "Gender"));
    }
  }, [items]);

  useEffect(() => {
    const prevId = localStorage.getItem("prevId");
    if (prevId && prevId !== id) {
      localStorage.removeItem("selectedFilters");
      localStorage.removeItem("priceFilters");
      dispatch(clearFilters());
      refetch();
    }
    localStorage.setItem("prevId", id);
  }, [id, dispatch]);

  useEffect(() => {
    const storedFilters = JSON.parse(localStorage.getItem("selectedFilters"));
    const storedPriceRange = JSON.parse(localStorage.getItem("priceFilters"));

    if (storedFilters) {
      dispatch(setSelectedFilters(storedFilters));
    }

    if (storedPriceRange) {
      dispatch(setPriceFilters(storedPriceRange));
    }
  }, [dispatch, id]);

  const handleCloseFilter = () => {
    close();
  };

  const getUniqueData = useCallback((data, property) => {
    return [...new Set(data.map((element) => element.attributes[property]))];
  }, []);

  useEffect(() => {
    updateURLParams();
  }, [selectedFilters, priceFilters, size, gender]);

  const updateURLParams = () => {
    let priceQuery;
    const sizeFilters = selectedFilters.filter((item) => size.includes(item));
    const genderFilters = selectedFilters.filter((item) => gender.includes(item));

    const sizeQuery = sizeFilters.length !== 0 ? sizeFilters.map((item) => `&populate[products][filters][size][$eq]=${item}`).join("&") : "";
    const genderQuery = genderFilters.length !== 0 ? genderFilters.map((item) => `&populate[products][filters][Gender][$eq]=${item}`).join("&") : "";
    if (priceFilters && priceFilters.length !== 0) {
      priceQuery = `&populate[products][filters][price][$gte]=${priceFilters[0]}&populate[products][filters][price][$lte]=${priceFilters[1]}`;
    }

    const queryString = [sizeQuery, genderQuery, priceQuery].filter((query) => query).join("&");

    navigate(`/${nameOne}/${nametwo}/${id}/populate[products][populate][0]=image${queryString}`);
  };

  return (
    <div className="filter-background container-fluid p-0 vw-100 vh-100">
      {isLoading ? (
     <SkeletonLoader/> // You can customize this spinner as per your design
      ) : (
        <div className="row w-100 p-0">
          <div className="col-lg-4 col-md-8 col-12 h-100 filter-box py-2">
            <div className="heading d-flex align-items-center justify-content-between px-3">
              <h2>FILTER</h2>
              <span className="fw-bold fs-4" onClick={handleCloseFilter}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
            <div className="scroll">
              <div className="box-dropdown py-2 container">
                <div className="d-flex align-items-center justify-content-between fw-bold">
                  <span>APPLIED FILTERS</span>
                </div>
                <div className="container my-4">
                  <div className="d-flex gap-3">
                    {selectedFilters.length !== 0 || priceFilters && priceFilters.length !== 0 ? (
                      <>
                        {selectedFilters.map((element, index) => (
                          <LazyLoad key={index}>
                            <AppliedBox name={element} />
                          </LazyLoad>
                        ))}
                        {priceFilters && priceFilters.length !== 0 && <PriceRangeAppliedFilter min={priceFilters[0]} max={priceFilters[1]} />}
                      </>
                    ) : (
                      <p>No Filter Found</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="box-dropdown py-2">
                <div className="d-flex align-items-center justify-content-between fw-bold px-3">
                  <span>PRICE</span>
                </div>
                <div className="price mt-3 px-3 flex-column gap-2">
                  <LazyLoad>
                    <PriceRange max={maxPrice} min={minPrice} />
                  </LazyLoad>
                </div>
              </div>
              <LazyLoad>
                <FilterList value={gender} name={"GENDER"} />
              </LazyLoad>
              <LazyLoad>
                <FilterList value={size} name={"SIZE"} />
              </LazyLoad>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
