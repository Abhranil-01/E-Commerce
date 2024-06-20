import {configureStore}from '@reduxjs/toolkit'
import { fetchDataApi } from '../services/FetchData/fetchData'
import dataReducer from '../services/Data/DataSlice'
import userReducer from '../services/UserauthSlice/UserauthSlice'
import updateReducer from '../services/UpdateSlice/UpdateSlice'
import filterReducer from '../services/FilterSlice/filterSlice'
export const store=configureStore({
    reducer:{
        [fetchDataApi.reducerPath]: fetchDataApi.reducer,
        data:dataReducer,
        userInfo:userReducer,
        updateInfo:updateReducer,
        filter:filterReducer
    },
    middleware: (getDefaultMiddleware) =>
getDefaultMiddleware().concat(fetchDataApi.middleware),

})