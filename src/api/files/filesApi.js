import { createApi } from "@reduxjs/toolkit/query/react";
import apiService from "api/apiService";

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: apiService,
  tagTypes: ['File','Files', 'Version','Report', 'Invitation'],
  endpoints: (builder) => ({
    getFiles: builder.query({
      query: () => "/files",
      invalidatesTags: ['File','Files'],

    }),
    getFile: builder.query({
      query: (id) => `/files/${id}`,
      invalidatesTags: ['File','Files'],
    }),
    getVersions: builder.query({
      query: (id) => `/files/${id}/versions`,
      invalidatesTags: ['File','Version'],
    }),
    createFile: builder.mutation({
      query: (formData) => ({
        url: "/files",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ['File','Files'],
    }),
    lockFile: builder.mutation({
      query: (files) => ({
        url: "/files/lock",
        method: "PATCH",
        body: files,
      }),
      invalidatesTags: ['File','Files'],
    }),
    unLockFile: builder.mutation({
      query: (files) => ({
        url: "/files/unlock",
        method: "PATCH",
        body: files,
      }),
      invalidatesTags: ['File','Files'],
    }),
    sendInvitation: builder.mutation({
      query: (invitation) => ({
        url: "/invitations",
        method: "POST",
        body: invitation,
      }),
      invalidatesTags: ['Invitation'],
    }),
    createVersion: builder.mutation({
      query: (fileId) => ({
        url: `/files/${fileId}/versions`,        
        method: "POST",
      }),
      invalidatesTags: ['File','Version'],
    }),
    getFileReport: builder.query({
      query: (fileId) => ({
        url: `reports/file/${fileId}`,        
      }),
      invalidatesTags: ['File','Report'],
    }),
    updateFile: builder.mutation({
      query: ({ id, file }) => ({
        url: `/files/${id}`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: ['File','Files'],
    }),
    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/files/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['File','Files'],
    }),
  }),
});

export const {
  useGetFilesQuery,
  useGetFileQuery,
  useCreateFileMutation,
  useUpdateFileMutation,
  useDeleteFileMutation,
  useLockFileMutation,
  useUnLockFileMutation,
  useGetVersionsQuery,
  useCreateVersionMutation,
  useGetFileReportQuery
} = filesApi;
