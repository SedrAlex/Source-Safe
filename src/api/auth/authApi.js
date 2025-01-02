// authApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import apiService from 'api/apiService';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: apiService,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { email, password },
      }),
      transformResponse: (response) => {
        localStorage.setItem('auth_Token', response?.data?.token);
        return response;
      },
    }),
    register: builder.mutation({
      query: ({name,user_name, email, password }) => ({
        url: 'auth/register',
        method: 'POST',
        body: { name,user_name,email, password },
      }),
      transformResponse: (response) => {
        localStorage.setItem('auth_Token', response?.data?.token);
        return response;
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem('auth_Token'); // Clear token from localStorage
        } catch (err) {
          console.error('Logout failed:', err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation,useLogoutMutation } = authApi;
