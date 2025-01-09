import { createApi } from "@reduxjs/toolkit/query/react";
import apiService from "api/apiService";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: apiService,
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => "groups",
    }),
    getInvitations: builder.query({
      query: () => "invitations",
    }),
    getGroup: builder.query({
      query: (id) => `groups/${id}`,
    }),
    createGroup: builder.mutation({
      query: (newGroup) => ({
        url: "groups",
        method: "POST",
        body: newGroup,
      }),
    }),

    sendInvitation: builder.mutation({
      query: (invitation) => ({
        url: "invitations",
        method: "POST",
        body: invitation,
      }),
    }),
    acceptInvitation: builder.mutation({
      query: (invitationId) => ({
        url: `invitations/${invitationId}/accept`,
        method: "POST",
      }),
    }),
    rejectInvitation: builder.mutation({
      query: (invitationId) => ({
        url: `invitations/${invitationId}/reject`,
        method: "POST",
      }),
    }),
    updateGroup: builder.mutation({
      query: ({ id,formData }) => ({
        url: `groups/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `groups/${id}`,
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
  useSendInvitationMutation,
  useGetInvitationsQuery,
  useAcceptInvitationMutation,
  useRejectInvitationMutation
} = groupsApi;
