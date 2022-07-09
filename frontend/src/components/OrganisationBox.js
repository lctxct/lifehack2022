import react from "react";
import { Grid, Paper } from "@mui/material/";

const OrganisationBox = ({ title }) => {
  return (
    <Grid item xs={12} sm={4}>
      <Paper>{title}</Paper>
    </Grid>
  );
};

export default OrganisationBox;
