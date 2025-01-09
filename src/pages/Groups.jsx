import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import PageHeader from "@layout/PageHeader";
import Group from "@widgets/Group";
import { useGetGroupsQuery } from "api/groups/groupsApi";
import { Divider } from "@mui/material";

const Groups = () => {
  const { data: groups, isLoading, isError, error, refetch } = useGetGroupsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <PageHeader title="Groups" />
      
      {/* Public Groups Section */}
      <h2>Public Groups</h2>
      <Grid container spacing={2}>
        {groups?.data?.["public-groups"]?.length > 0 ? (
          groups.data["public-groups"].map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <Group clubData={group} owner={false} />
            </Grid>
          ))
        ) : (
          <div>No public groups available.</div>
        )}
      </Grid>
      <Divider orientation="horizontal" color="#000" />

      {/* Personal Groups Section */}
      {groups?.data?.["personal-groups"]?.length > 0 && (
        <>
          <h2>Your Groups</h2>
          <Grid container spacing={2}>
            {groups.data["personal-groups"].map((group) => (
              <Grid item xs={12} sm={6} md={4} key={group.id}>
                <Group clubData={group} owner={true} />
              </Grid>
            ))}
          </Grid>
          <Divider orientation="horizontal" color="#000" />
        </>
      )}

      {/* Shared Groups Section */}
      <h2>The Groups You Are a Member Of</h2>
      <Grid container spacing={2}>
        {groups?.data?.["shared-groups"]?.length > 0 ? (
          groups.data["shared-groups"].map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <Group clubData={group} />
            </Grid>
          ))
        ) : (
          <div>You are not a member of any groups.</div>
        )}
      </Grid>
    </>
  );
};

export default Groups;
