import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const fetchDataApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "auth/local/register",
          method: "POST",
          body: user,
        };
      },
      onSuccess: (data) => {
        console.log("Registration successful:", data);
      },
      onError: (error) => {
        console.error("Error during registration:", error);
      },
    }),
    LoggedUser: builder.mutation({
      query: (user) => {
        return {
          url: "auth/local",
          method: "POST",
          body: user,
        };
      },
      onSuccess: (data) => {
        console.log("login successful:", data);
      },
      onError: (error) => {
        console.error("Error during login:", error);
      },
    }),
    getUser: builder.query({
      query: (token) => {
        return {
          url: "users/me?populate=*",
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getCategories: builder.query({
      query: ({ params }) => {
        return {
          url: "categories",
          method: "GET",
          params,
        };
      },
    }),
    getCustomData: builder.query({
      query: (name) => {
        return {
          url: `${name}?populate=*`,
          method: "GET",
        };
      },
    }),
    getStoreData: builder.query({
      query: ({ name, id, params }) => {
        return {
          url: `${name}/${id}?populate[products][populate][image][populate][0]=image&populate[products][populate][reviews][populate][0]=reviews`,
          method: "GET",
          params,
        };
      },
    }),
    getSingleProductData: builder.query({
      query: (id) => {
        return {
          url: `products/${id}`,
          params:`populate[image][populate][0]=image&populate[reviews][populate][0]=order_lists&populate[reviews][populate][order_lists][populate][0]=user_addresses`,
          method: "GET",
        };
      },
    }),
    addToCart: builder.mutation({
      query: ({ token, data }) => {
        console.log("aewf", data);
        return {
          url: "add-to-carts?populate=*",
          method: "POST",
          body: { data: data },
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getCartData: builder.query({
      query: ({ token }) => {
        return {
          url: "add-to-carts",
          method: "GET",

          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    UpdateCart: builder.mutation({
      query: ({ token, data, id }) => {
        console.log("qewdwe", data);
        return {
          url: `add-to-carts/${id}`,
          method: "PUT",
          body: { data: data },
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    DeleteCartData: builder.mutation({
      query: ({ token, id }) => {
        return {
          url: `add-to-carts/${id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    PostOrderData: builder.mutation({
      query: ({ token, data }) => {
  
        return {
          url: `order-lists?populate=*`,
          method: "POST",
          body:{data:data},
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    UpdateOrderData: builder.mutation({
      query: ({ token, data, id }) => {

        return {
          url: `order-lists/${id}`,
          method: "PUT",
          body: { data: data },
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getOrderData: builder.query({
      query: ({ token, params }) => {
        return {
          url: "order-lists?populate[products][populate][0]=image",
          method: "GET",
          params,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getCustomOrderData: builder.query({
      query: ({ token, id }) => {
        return {
          url: `order-lists/${id}/?populate=*`,
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    PostAddress: builder.mutation({
      query: ({ token, data }) => {
        console.log(data);
        return {
          url: `user-addresses`,
          method: "POST",
          body: { data: data },
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    UpdateAddress: builder.mutation({
      query: ({ token, data, id }) => {
        return {
          url: `user-addresses/${id}`,
          method: "PUT",
          body: { data: data },
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getAddress: builder.query({
      query: (token) => {
        return {
          url: `user-addresses`,
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getCustomAddress: builder.query({
      query: ({ token, id }) => {
        return {
          url: `user-addresses/${id}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    PostReview: builder.mutation({
      query: ({ token, data }) => {
        return {
          url: `reviews`,
          method: "POST",
          body: { data: data },
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    UpdateReview: builder.mutation({
      query: ({ token, id, data }) => {
        return {
          url: `reviews/${id}`,
          method: "PUT",
          body: { data: data },
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    GetReview: builder.query({
      query: ({ token, params }) => {
        return {
          url: `reviews`,
          method: "GET",
          params,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCustomDataQuery,
  useGetStoreDataQuery,
  useGetSingleProductDataQuery,
  useRegisterUserMutation,
  useLoggedUserMutation,
  useAddToCartMutation,
  useGetCartDataQuery,
  useUpdateCartMutation,
  useDeleteCartDataMutation,
  usePostOrderDataMutation,
  useGetOrderDataQuery,
  useUpdateOrderDataMutation,
  usePostAddressMutation,
  useUpdateAddressMutation,
  useGetAddressQuery,
  useGetUserQuery,
  useGetCustomAddressQuery,
  useGetCustomOrderDataQuery,
  usePostReviewMutation,
  useUpdateReviewMutation,
} = fetchDataApi;
