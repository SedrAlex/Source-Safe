import { createApi } from "@reduxjs/toolkit/query/react";
import apiService from "api/apiService";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: apiService,
  tagTypes: ['Group','Groups','Invitations', 'Invitation', 'Notification', 'Reports'],
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => "groups",
      providesTags: ['Groups'],

    }),
    getInvitations: builder.query({
      query: () => "invitations",
      providesTags: ['Invitations'],
    }),
    getGroup: builder.query({
      query: (id) => `groups/${id}`,
      providesTags: ['Group','Groups'],
    }),
    createGroup: builder.mutation({
      query: (newGroup) => ({
        url: "groups",
        method: "POST",
        body: newGroup,
      }),
      providesTags: ['Group','Groups'],
    }),
    sendInvitation: builder.mutation({
      query: (invitation) => ({
        url: "invitations",
        method: "POST",
        body: invitation,
      }),
      invalidatesTags: ['Invitation','Invitations'],
    }),
    acceptInvitation: builder.mutation({
      query: (invitationId) => ({
        url: `invitations/${invitationId}/accept`,
        method: "POST",
      }),
      invalidatesTags: ['Invitation','Invitations'],
    }),
    getUserReport: builder.query({
      query: (groupId) => ({
        url: `reports/group/${groupId}`,        
      }),
      invalidatesTags: ['Reports'],
    }),
    getUserNotifications: builder.query({
      query: () => ({
        url: "notifications",        
      }),
      providesTags: ['Notification'],
    }),
    getUnReadNotifications: builder.query({
      query: () => ({
        url: "notifications/unread",        
      }),
      providesTags: ['Notification'],
    }),
    readNotifications: builder.mutation({
      query: () => ({
        url: "notifications/set-all-read",
        method: "POST",
      }),
      invalidatesTags: ['Notification'],
    }),
    rejectInvitation: builder.mutation({
      query: (invitationId) => ({
        url: `invitations/${invitationId}/reject`,
        method: "POST",
      }),
      invalidatesTags: ['Invitation','Invitations'],
    }),
    updateGroup: builder.mutation({
      query: ({ id, formData }) => ({
        url: `groups/${id}`,
        method: "PATCH",
        body: formData,
      }),
      providesTags: ['Group','Groups'],
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `groups/${id}`,
        method: "DELETE",
      }),
      providesTags: ['Group','Groups'],
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
  useRejectInvitationMutation,
  useGetUserReportQuery,
  useGetUnReadNotificationsQuery,
  useReadNotificationsMutation
} = groupsApi;
