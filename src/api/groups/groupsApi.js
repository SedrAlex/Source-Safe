import { createApi } from "@reduxjs/toolkit/query/react";
import apiService from "api/apiService";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: apiService,
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => "/groups",
    }),
    getGroup: builder.query({
      query: (id) => `/groups/${id}`,
    }),
    createGroup: builder.mutation({
      query: (newGroup) => ({
        url: "/groups",
        method: "POST",
        body: newGroup,
      }),
    }),

    sendInvitation: builder.mutation({
      query: (invitation) => ({
        url: "/invitations",
        method: "POST",
        body: invitation,
      }),
    }),
    updateGroup: builder.mutation({
      query: ({ id, ...updatedGroup }) => ({
        url: `/groups/${id}`,
        method: "PUT",
        body: updatedGroup,
      }),
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useSendInvitationMutation
} = groupsApi;
