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

    getPropertysFilter: builder.query<property[], string>({
      query: (query) => {
        console.log(query);

        return `/property${query}`;
      },
    }),
    getPropertyById: builder.query<property, number>({
      query: (id) => `/property/${id}`,
    }),

    getPropertyByType: builder.query<property[], string>({
      query: (type) => {
        console.log(type);

        return `/property/${type}`;
      },
    }),
    createProperty: builder.mutation<property, createPropertyRequest>({
      query: (property) => ({
        url: "/property",
        method: "POST",
        body: property,
      }),
    }),

    deletPropertyByID: builder.mutation<property, number>({
      query: (id) => ({
        url: `/property/${id}`,
        method: "delete",
        body: id,
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
      query: (createUserRequest) => ({
        url: "/user/google",
        method: "POST",
        body: createUserRequest,
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
  useGetPropertysFilterQuery,
  useGetPropertyByIdQuery,
  useGetPropertyByTypeQuery,
  useCreatePropertyMutation,
  useDeletPropertyByIDMutation,
  useCreateUserMutation,
} = apiSlice;
