import react from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Grid, Paper, Typography } from "@mui/material/";

const OrganisationBox = ({
  img,
  organisation,
  eventName,
  timing,
  location_name,
  ...props
}) => {
  return (
    <Grid item xs={12} sm={4}>
      <Paper>
        <img src={img} alt="organisation" style={{ maxWidth: "100%" }} />
        <div style={{padding: '1vw'}}>
          <Typography variant="h6">{eventName}</Typography>
          <div>{organisation}</div>
          <div>
            <CalendarMonthIcon />
            {timing}
          </div>
          <div>
            <LocationOnIcon />
            {location_name}
          </div>
          <Button variant="outlined">Find out more</Button>
        </div>
      </Paper>
    </Grid>
  );
};

export default OrganisationBox;
