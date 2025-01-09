import { createApi } from "@reduxjs/toolkit/query/react";
import apiService from "api/apiService";

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: apiService,
  endpoints: (builder) => ({
    getFiles: builder.query({
      query: () => "/files",
    }),
    getFile: builder.query({
      query: (id) => `/files/${id}`,
    }),
    createFile: builder.mutation({
      query: (formData) => ({
        url: "/files",
        method: "POST",
        body: formData,
      }),
    }),
    lockFile: builder.mutation({
      query: (files) => ({
        url: "/files/lock",
        method: "PATCH",
        body: files,
      }),
    }),
    sendInvitation: builder.mutation({
      query: (invitation) => ({
        url: "/invitations",
        method: "POST",
        body: invitation,
      }),
    }),
    updateFile: builder.mutation({
      query: ({ id, ...updatedFile }) => ({
        url: `/files/${id}`,
        method: "PUT",
        body: updatedFile,
      }),
    }),
    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/files/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFilesQuery,
  useGetFileQuery,
  useCreateFileMutation,
  useUpdateFileMutation,
  useDeleteFileMutation,
  useLockFileMutation
} = filesApi;
