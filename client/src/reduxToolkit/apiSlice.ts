import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { property, createPropertyRequest } from "./propertyinterfaces";
import { Broker, CreateBrokerRequest } from "./brokerInterfaces";
import { createUserRequest } from "./authentication";

const API_URL = "http://localhost:3001";

export const apiSlice = createApi({
  //metodos para enviar y recibr data de la ruta property
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProperties: builder.query<property[], void>({
      query: () => "/property",
    }),
    createProperty: builder.mutation<property, createPropertyRequest>({
      query: (property) => ({
        url: "/property",
        method: "POST",
        body: property,
      }),
    }),
    //metodos para enviar y recibr data de la ruta broker
    getBrokers: builder.query<Broker[], void>({
      query: () => "/broker",
    }),
    getBrokerById: builder.query<Broker, number>({
      query: (id) => `/broker/${id}`,
    }),
    createBroker: builder.mutation<Broker, CreateBrokerRequest>({
      query: (broker) => ({
        url: "/broker",
        method: "POST",
        body: broker,
      }),
    }),
    deleteBroker: builder.mutation<void, number>({
      query: (id) => ({
        url: `/broker/${id}`,
        method: "DELETE",
      }),
    }),
    //metodos para enviar y recibr data de la ruta authentication
    createUser: builder.mutation<createUserRequest, createUserRequest>({
      query: (userAuth) => ({
        url: "/user/google",
        method: "POST",
        body: userAuth,
      }),
    }),
  }),
});

export const {
  useGetBrokersQuery,
  useGetBrokerByIdQuery,
  useCreateBrokerMutation,
  useDeleteBrokerMutation,
  useGetPropertiesQuery,
  useCreatePropertyMutation,
  useCreateUserMutation,
} = apiSlice;
