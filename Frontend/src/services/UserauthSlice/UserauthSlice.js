import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access_token: null,
  name:"",
  email: "",
  phone: "",
  loginAlert:false,
  logOutAlert:false,
  showAlert:false
}

export const UserauthSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
    
      state.access_token = action.payload
    },
    unSetUserToken: (state, action) => {
     
      state.access_token = action.payload
    },
    setUserInfo: (state, action) => {
 
        state.name = action.payload.name
        state.email = action.payload.email
        state.phone = action.payload.phone
      },
      unsetUserInfo: (state, action) => {
  
        state.name = action.payload.name
        state.email = action.payload.email
        state.phone = action.payload.phone
      },
      setAlert:(state, action) => {
        state.loginAlert = action.payload
      },
      setLogout:(state, action) => {
        state.logOutAlert = action.payload
      },
      setShowAlert:(state, action) => {
        state.showAlert = action.payload
      },

  },
})

export const { setUserToken, unSetUserToken,setUserInfo,unsetUserInfo,setAlert,setLogout,setShowAlert} = UserauthSlice.actions

export default UserauthSlice.reducer