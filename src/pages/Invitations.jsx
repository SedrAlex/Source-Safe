import React from "react";
import Grid from "@mui/material/Grid";
import PageHeader from "@layout/PageHeader";
import { useGetInvitationsQuery } from "api/groups/groupsApi";
import InvitationCard from "@widgets/InvitationCard";

const Invitations = () => {
  const { data: invitations, isLoading, isError, error } = useGetInvitationsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Filter invitations with status 'accepted' or 'rejected'
  const filteredInvitations = invitations?.data?.["received-invitations"]?.filter(
    (invitation) => invitation.status === "unread"
  );

  return (
    <>
      <PageHeader title="Invitations" />
      <h2>You are invited to be part of the following groups, accept or reject the invitation</h2>

      {filteredInvitations && filteredInvitations.length > 0 ? (
        <Grid container spacing={2}>
          {filteredInvitations.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <InvitationCard clubData={group} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>There are no invitations.</div>
      )}
    </>
  );
};

export default Invitations;
