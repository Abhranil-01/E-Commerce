import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  img: "",
  headTitle: "",
  navOne: "",
  title: "",
  id: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    customAction: (state, action) => {
      switch (action.payload.key) {
        case "football":
          return {
            ...state,
            img: "/Images/Untitled design.png",
            headTitle: "Football Items",
            navOne: "footballs",
          };
        case "cricket":
          return {
            ...state,
            img: "/Images/cricketTwo.png",
            headTitle: "Cricket Items",
            navOne: "crickets",
          };
        case "badminton":
          return {
            ...state,
            img: "/Images/badminton.png",
            headTitle: "Badminton Items",
            navOne: "badmintons",
          };
        case "running":
          return {
            ...state,
            img: "/Images/running.png",
            headTitle: "Running Items",
            navOne: "runnings",
          };
        default:
          return state;
      }
    },
    customStoreAction: (state, action) => {
      switch (action.payload.key) {
        case "footballs-":
          return {
            ...state,
            img: "/Images/football/Ballsjpg.avif",
            navOne: "footballs",
          };
        case "football-jerseys":
          return {
            ...state,
            img: "/Images/football/jersey.avif",
            navOne: "footballs",
          };
        case "football-shorts":
          return {
            ...state,
            img: "/Images/football/KIPSTA FOOT 11 PE20  3.avif",
            navOne: "footballs",
          };
        case "football-socks&shinguards":
          return {
            ...state,
            img: "/Images/football/socks.avif",
            navOne: "footballs",
          };
        case "football-shoes":
          return {
            ...state,
            img: "/Images/football/Shoes.avif",
            navOne: "footballs",
          };
        case "goalkeeping-gloves":
          return {
            ...state,
            img: "/Images/football/goal.avif",
            navOne: "footballs",
          };
        case "football-trainingaccessories":
          return {
            ...state,
            img: "/Images/football/Ballsjpg.avif",
            navOne: "footballs",
          };
        case "cricket-balls":
          return {
            ...state,
            img: "/Images/cricket/main banners galaxy to galaxy category banner desktop.avif",
            navOne: "crickets",
          };
        case "cricket-bats":
          return {
            ...state,
            img: "Images/cricket/main banners galaxy to galaxy category banner desktop.avif",
            navOne: "crickets",
          };
        case "cricket-jerseys":
          return {
            ...state,
            img: "/Images/cricket/Cricket FLX 1 6  cricket whites catbanner.avif",
            navOne: "crickets",
          };
        case "cricket-trackpants":
          return {
            ...state,
            img: "/Images/cricket/Cricket FLX 11  cricket trackpants catbanner.avif",
            navOne: "crickets",
          };
        case "running-clothing":
          return {
            ...state,
            img: "/Images/running/jogging shoes banner page 0001 min.avif",
            navOne: "runnings",
          };
        case "running-shoes":
          return {
            ...state,
            img: "/Images/running/jogging shoes banner page 0001 min.avif",
            navOne: "runnings",
          };
        case "badminton-clothing":
          return {
            ...state,
            img: "/Images/Badminton/badminton apparels banner 01.avif",
            navOne: "badmintons",
          };
        case "badminton-kitbags":
          return {
            ...state,
            img: "/Images/Badminton/PERFLY BR 590   Noir Vert   000     Expires on 09 12 2028 01.avif",
            navOne: "badmintons",
          };
        case "racquets":
          return {
            ...state,
            img: "/Images/Badminton/PERFLY BR 590   Noir Vert   000     Expires on 09 12 2028 01.avif",
            navOne: "badmintons",
          };
        case "shuttlecock":
          return {
            ...state,
            img: "/Images/Badminton/PERFLY BR 590   Noir Vert   000     Expires on 09 12 2028 01.avif",
            navOne: "badmintons",
          };
        case "badminton-shoes":
          return {
            ...state,
            img: "/Images/Badminton/Badminton shoe 01.avif",
            navOne: "badmintons",
          };

        default:
          return state;
      }
    },
  },
});

export const { customAction, customStoreAction, setTitle, setId } =
  dataSlice.actions;

export default dataSlice.reducer;
