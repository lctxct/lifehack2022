import react from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from '@mui/icons-material/Info';
import { Button, Grid, Paper, Typography } from "@mui/material/";
import { useState } from 'react'; 

const OrganisationCard = ({
  img,
  organisation,
  eventName,
  timing,
  location_name,
  handleClick,
  ...props
}) => {
  return (
    <Grid item xs={12} sm={4}>
      <Paper>
        <img src={img} alt="organisation" style={{ maxWidth: "100%",  }} />
        <div style={{padding: '1vw'}}>
          <Typography variant="h5">{eventName}</Typography>
          <div style={{textTransform: "capitalize", marginTop: "2ch", fontWeight: "bold"}}>{organisation}</div>
          <div style={{marginTop: "0.5ch", display: "flex", alignItems: "center"}}>
            <CalendarMonthIcon />
            {timing}
          </div>
          <div style={{marginTop: "0.5ch", textTransform: "capitalize", display: "flex", alignItems: "center"}}>
            <LocationOnIcon />
            {location_name}
          </div>
          <Button style={{marginTop: "2ch"}} variant="outlined" endIcon={<InfoIcon/>} onClick={handleClick}>Find out more</Button>
        </div>
      </Paper>
    </Grid>
  );
};

export default OrganisationCard;
