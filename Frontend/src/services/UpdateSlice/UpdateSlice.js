import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  refresh:false,
  id:null
};

const UpdateSlice = createSlice({
  name: "updateInfo",
  initialState,
  reducers: {

        setRefresh: (state, action) => {
   
          state.refresh=action.payload;
          },
          setIdAction: (state, action) => {
    
            state.id=action.payload;
            },
  },
});

export const { setRefresh ,setIdAction} = UpdateSlice.actions;

export default UpdateSlice.reducer;
