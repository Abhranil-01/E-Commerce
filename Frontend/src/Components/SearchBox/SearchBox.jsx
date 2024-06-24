import React from "react";
import { useGetCategoriesQuery } from "../../services/FetchData/fetchData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsOpen, setSearchInput, setSmallSearchInput } from "../../services/FilterSlice/filterSlice";
import { setLoader } from "../../services/Data/DataSlice";

function SearchBox({ input }) {
  const searchInput = input.toUpperCase();
  const { data } = useGetCategoriesQuery({
    params: `populate[footballs][filters][title][$contains]=${searchInput}&populate[crickets][filters][title][$contains]=${searchInput}&populate[badmintons][filters][title][$contains]=${searchInput}&populate[runnings][filters][title][$contains]=${searchInput}`,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(data);

  const handleNavigateToStore = (element, item) => {
    if (element && element.attributes && item && item.attributes) {
      const id = element.id;
      const navOne = item.attributes.title.toLowerCase();
      const navTwo = element.attributes.navigation;
      dispatch(setIsOpen(false));
      dispatch(setSearchInput(""));
      dispatch(setSmallSearchInput(false));
      dispatch(setLoader(true)); // Set loading state to true
      navigate(`/${navOne}/${navTwo}/${id}/populate[products][populate][0]=image`);
    }
  };

  // Check if all data items are empty
  const allDataEmpty =
    data &&
    data.data &&
    data.data.every((item) =>
      Object.keys(item.attributes).every(
        (key) => !item.attributes[key].data || item.attributes[key].data.length === 0
      )
    );

  return (
    <>
      <div
        className="py-2 position-absolute z-3 rounded-1 bg-white d-flex flex-column align-items-center gap-2"
        style={{
          top: "105%",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          width: "97%",
        }}
      >
        <ul className="list-group w-100 rounded-0">
          {allDataEmpty ? (
            <li className="list-group-item border-0 border-bottom">Item Not Found</li>
          ) : (
            data &&
            data.data &&
            data.data.map((item, index) => (
              <div key={index}>
                {Object.keys(item.attributes).map((key) => {
                  const category = item.attributes[key];
                  if (category && category.data && category.data.length > 0) {
                    return category.data.map((element) => (
                      <li
                        className="list-group-item border-0 border-bottom"
                        style={{ cursor: "pointer" }}
                        key={element.id}
                        onClick={() => handleNavigateToStore(element, item)}
                      >
                        {element.attributes.title}
                      </li>
                    ));
                  }
                  return null;
                })}
              </div>
            ))
          )}
        </ul>
      </div>
    </>
  );
}

export default SearchBox;
