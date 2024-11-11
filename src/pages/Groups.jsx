import React from "react";
import Grid from "@mui/material/Grid";
import PageHeader from "@layout/PageHeader";
import Group from "@widgets/Group";
import TrainingPaceChart from "@widgets/TrainingPaceChart";
import PlayerHighlight from "@widgets/PlayerHighlight";

const Groups = () => {
  return (
    <>
      <PageHeader title="Groups" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Group id={1} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Group id={2} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Group id={3} />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <Group id={4} />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <Group id={5} />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <Group id={6} />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <Group id={7} />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={4}>
          <Group id={8} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Group id={9} />
        </Grid>
        {/* Add more widgets as needed */}
      </Grid>
    </>
  );
};

export default Groups;
