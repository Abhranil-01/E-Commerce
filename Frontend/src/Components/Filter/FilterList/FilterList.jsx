import React from "react";
import CheckBox from "../CheckBox/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFilters } from "../../../services/FilterSlice/filterSlice";

function FilterList({ value, name }) {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state) => state.filter.selectedFilters);

  const handleFilterItems = (selectedCategory) => {
    let updatedFilters;
    if (selectedFilters.includes(selectedCategory)) {
      updatedFilters = selectedFilters.filter((el) => el !== selectedCategory);
    } else {
      updatedFilters = [...selectedFilters, selectedCategory];
    }

    dispatch(setSelectedFilters(updatedFilters));
    localStorage.setItem("selectedFilters", JSON.stringify(updatedFilters)); // Save to local storage
  };

  return (
    <>
      {value[0] !== null && (
        <div className="box-dropdown py-2">
          <div className="d-flex align-items-center justify-content-between fw-bold px-3">
            <span>{name}</span>
          </div>
          <div className={`chart d-flex flex-column gap-2 py-3 px-4`}>
            {value.map((element, index) => (
              <CheckBox
                key={index}
                id={`${name}-${index}`}
                label={`${element}`}
                isChecked={selectedFilters.includes(element)}
                onClick={() => handleFilterItems(element)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default FilterList;
