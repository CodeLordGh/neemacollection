import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


// export const api = createApi({
//   baseQuery,
//   endpoints: (builder) => {
//       login: builder.mutation({
//         query: (credentials) => ({
//           url: "/auth/login",
//           method: "POST",
//           body: credentials,
//         })
//       }),
//       productsData: builder.mutation({
//         query: () => ({
//           url: "/products",
//           method: "GET",
//         })
//       })
//     }
//   // transformResponse: (response, meta, arg) => response.token,
// }
// )

// export const {
//   useLoginMutation,
//   useProductsDataMutation
// } = api



export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      // eslint-disable-next-line no-unused-vars
      transformResponse: (response, meta, arg) => response.token,
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      // eslint-disable-next-line no-unused-vars
      transformResponse: (response, meta, arg) => response.token,
    }),
    addToCart: builder.mutation({
      query: (productData) => ({
        url: "/add-to-cart",
        method: "POST",
        body: productData,
      }),
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      cachePolicy: "cacheFirst",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAddToCartMutation,
  useGetProductQuery,
} = api;
