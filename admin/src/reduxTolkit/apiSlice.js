import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    //baseUrl: "https://api-proptech.up.railway.app",
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    //Properties
    getProperties: builder.query({
      query: () => "/property",
    }),
    //Client
    getUsers: builder.query({
      query: () => "/user",
    }),
    //Broker
    getBrokers: builder.query({
      query: () => "/broker",
      providesTags: ["Brokers"],
    }),
    deleteBroker: builder.mutation({
      query: (id) => ({
        url: `/broker/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brokers"],
    }),
    createBroker: builder.mutation({
      query: (newBroker) => ({
        url: "/broker",
        method: "POST",
        body: newBroker,
      }),
      invalidatesTags: ["Brokers"],
    }),
    updateBroker: builder.mutation({
      query: (id, updateBroker) => ({
        url: `/broker/${id}`,
        method: "PUT",
        body: updateBroker,
      }),
      invalidatesTags: ["Brokers"],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useGetUsersQuery,
  useGetBrokersQuery,
  useDeleteBrokerMutation,
  useCreateBrokerMutation,
  useUpdateBrokerMutation,
} = apiSlice;
