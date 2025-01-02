// dynamicBaseQuery.js
import { API_BASE_URL } from '@constants/config';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiService = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('auth_Token');        if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export default apiService;
