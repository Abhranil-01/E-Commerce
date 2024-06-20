import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredItems: [],
  selectedFilters: [],
  priceFilters: [],
  size: [],
  gender: [],
  price: [],
  isOpen: false,
  searchInput: "",
  smallSearchInput: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
    setSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
    setPriceFilters: (state, action) => {
      state.priceFilters = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    clearFilters: (state) => {
      state.selectedFilters = [];
      state.priceFilters = [];
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setSmallSearchInput: (state, action) => {
      state.smallSearchInput = action.payload;
    },
  },
});

export const {
  setFilteredItems,
  setSelectedFilters,
  setPriceFilters,
  setSize,
  setGender,
  setPrice,
  clearFilters,
  setIsOpen,
  setSearchInput,
  setSmallSearchInput,
} = filterSlice.actions;

export default filterSlice.reducer;
