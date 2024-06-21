import React from "react";
import { useGetCategoriesQuery } from "../../services/FetchData/fetchData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsOpen, setSearchInput, setSmallSearchInput } from "../../services/FilterSlice/filterSlice";

function SearchBox({ input }) {
  console.log(input);
  const { data } = useGetCategoriesQuery({
    params: `populate[footballs][populate][0]=image&populate[footballs][filters][title][$startsWith]=${input}&populate[crickets][populate][0]=image&populate[crickets][filters][title][$startsWith]=${input}&populate[badmintons][populate][0]=image&populate[badmintons][filters][title][$startsWith]=${input}&populate[runnings][populate][0]=image&populate[runnings][filters][title][$startsWith]=${input}`,
  });
  console.log(data);
  const navigate = useNavigate();
const dispatch = useDispatch()
  const handleNavigateToStore = (element, item) => {
    
    if (element && element.attributes && item && item.attributes) {
      const id = element.id;
      const navOne = item.attributes.title.toLowerCase();
      const navTwo = element.attributes.navigation;
      dispatch(setIsOpen(false))
      dispatch(setSearchInput(""))
      dispatch(setSmallSearchInput(false))
      navigate(`/${navOne}/${navTwo}/${id}/populate[products][populate][0]=image`);
    }
  };

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
          {data &&
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
                })}
              </div>
            ))}
        </ul>
      </div>
    </>
  );
}

export default SearchBox;
