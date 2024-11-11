// authApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import apiService from 'api/apiService';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: apiService,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/signin',
        method: 'POST',
        body: { email, password },
      }),
      transformResponse: (response) => {
        localStorage.setItem('auth_Token', response.token);
        return response;
      },
    }),
    register: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/signup',
        method: 'POST',
        body: { email, password },
      }),
      transformResponse: (response) => {
        localStorage.setItem('auth_Token', response.token);
        return response;
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
