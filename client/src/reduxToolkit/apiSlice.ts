import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { property, createPropertyRequest } from "./propertyinterfaces";
import { createFormRequest } from "./forminterfaces";
import { createSignalRequest, modifySignal } from "./signalInterface";
import { Broker, CreateBrokerRequest } from "./brokerInterfaces";
import { createUserRequest } from "./authentication";
import { User, UserByEmail } from "./userInterface";
import { createConsultRequest, emailMessage } from "./consultInterface";
import { form } from "./forminterfaces";
import { favorite, createFavoriteRequest } from "./favoritesInterface";
import { review } from "./review";

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
        return `/property?${query}`;
      },
    }),
    getPropertyById: builder.query<property, string>({
      query: (id) => `/property/${id}`,
    }),

    getPropertyByType: builder.query<property[], string>({
      query: (type) => {
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

    updateProperty: builder.mutation<property, { id: number; updatedProperty: property }>({
      query: ({ id, updatedProperty }) => ({
        url: `/property/${id}`,
        method: "PUT",
        body: updatedProperty,
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
    getBrokerByEmail: builder.query<Broker, number>({
      query: (email) => `/broker/${email}`,
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
        url: "/user",
        method: "POST",
        body: createUserRequest,
      }),
    }),

    createUserGoogle: builder.mutation<createUserRequest, createUserRequest>({
      query: (createUserRequest) => ({
        url: "/user/google",
        method: "POST",
        body: createUserRequest,
      }),
    }),

    //Encontrar usuario por nombre

    getUserByName: builder.query<User[] | undefined, string | null | undefined>({
      query: (displayName) => `/user?name=${displayName}`,
    }),

    getUser: builder.query<User[], void>({
      query: () => "/user",
    }),

    //Econtrar Usuario por email
    getUserByEmail: builder.query<UserByEmail, string | null | undefined>({
      query: (email) => `/user?email=${email}`,
    }),
    //metodos para enviar y recibr data de la ruta form

    createForm: builder.mutation<createFormRequest, createFormRequest>({
      query: (createFormRequest) => ({
        url: "/form",
        method: "POST",
        body: createFormRequest,
      }),
    }),

    getfrom: builder.query<form[], void>({
      query: () => `/form`,
    }),

    //señas

    createSignal: builder.mutation<createSignalRequest, createSignalRequest>({
      query: (createSignalRequest) => ({
        url: "/signal",
        method: "POST",
        body: createSignalRequest,
      }),
    }),
    getSignal: builder.query<createSignalRequest[], void>({
      query: () => `/signal`,
    }),

    getSignalByid: builder.query<createSignalRequest, string>({
      query: (id) => `/signal/${id}`,
    }),

    putSignal: builder.mutation<modifySignal, modifySignal>({
      query: ({ id, situation }) => ({
        url: `/signal/${id}`,
        method: "PUT",
        body: { situation },
      }),
    }),
    //consultas

    getconsultas: builder.query<createConsultRequest, void>({
      query: () => `/consult`,
    }),

    //correo del broker, correo de usuario, mensaje

    createConsult: builder.mutation<createConsultRequest, createConsultRequest>({
      query: (createConsultRequest) => ({
        url: "/consult",
        method: "POST",
        body: createConsultRequest,
      }),
    }),

    sendEmail: builder.mutation<void, emailMessage>({
      query: (emailForm) => ({
        url: "/send-email",
        method: "POST",
        body: emailForm,
      }),
    }),

    // FAVORITES
    getFavorites: builder.query<favorite[], void>({
      query: () => "/favorites",
      providesTags: ["Favorites"],
    }),

    getFavoriteById: builder.query<favorite, string>({
      query: (id) => `/favorites/${id}`,
    }),

    createFavorite: builder.mutation<createFavoriteRequest, createFavoriteRequest>({
      query: (createFavoriteRequest) => ({
        url: "/favorites",
        method: "POST",
        body: createFavoriteRequest,
      }),
      invalidatesTags: ["Favorites"],
    }),

    deletFavoriteByID: builder.mutation<favorite, number>({
      query: (id) => ({
        url: `/favorites/${id}`,
        method: "delete",
        body: id,
      }),
      invalidatesTags: ["Favorites"],
    }),

    createReview: builder.mutation<review, review>({
      query: (review) => ({
        url: "/review",
        method: "POST",
        body: review,
      }),
    }),

    getReview: builder.query<review[], void>({
      query: () => "/review",
    }),
  }),
});

export const {
  useGetBrokersQuery,
  useGetBrokerByEmailQuery,
  useCreateBrokerMutation,
  useDeleteBrokerMutation,
  useGetPropertiesQuery,
  useGetPropertysFilterQuery,
  useGetPropertyByIdQuery,
  useGetPropertyByTypeQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletPropertyByIDMutation,
  useGetUserQuery,
  useGetUserByEmailQuery,
  useCreateUserMutation,
  useCreateUserGoogleMutation,
  useGetUserByNameQuery,
  useGetfromQuery,
  useCreateFormMutation,
  useGetSignalQuery,
  useCreateSignalMutation,
  useGetSignalByidQuery,
  usePutSignalMutation,
  useGetconsultasQuery,
  useCreateConsultMutation,
  useSendEmailMutation,
  useGetFavoritesQuery,
  useGetFavoriteByIdQuery,
  useCreateFavoriteMutation,
  useDeletFavoriteByIDMutation,
  useCreateReviewMutation,
  useGetReviewQuery,
} = apiSlice;
