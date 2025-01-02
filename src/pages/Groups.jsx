import React from "react";
import Grid from "@mui/material/Grid";
import PageHeader from "@layout/PageHeader";
import Group from "@widgets/Group";
import { useGetGroupsQuery } from "api/groups/groupsApi";

const Groups = () => {
  const { data: groups, isLoading, isError, error } = useGetGroupsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <PageHeader title="Groups" />
      <Grid container spacing={2}>
      {groups?.data?.['public-groups']?.map((group) => (          <Grid item xs={12} sm={6} md={4} key={group.id}>
            <Group clubData={group} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Groups;
