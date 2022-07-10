import react from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from '@mui/icons-material/Info';
import { Button, createTheme, Grid, Paper, ThemeProvider, Typography } from "@mui/material/";
import { useState } from 'react'; 

const customTheme = createTheme({
  palette: {
    light: {main: '#CDBCA5', contrastText: '#FFFFFF'},
    mediumlight: {main: '#d4c4b4', contrastText: '#FFFFFF'},
    neutral: {main: '#98745C', contrastText: '#FFFFFF'},
    dark: {main: '#060606', contrastText: '#FFFFFF'},
  },
});

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
    <ThemeProvider theme={customTheme}>
    <Grid item xs={12} sm={4}>
      <Paper>
        <img src={img} alt="organisation" style={{ maxWidth: "100%",  }} />
        <div style={{padding: '1vw'}}>
          <Typography variant="h5" sx={{fontFamily:"inherit"}}>{eventName}</Typography>
          <div style={{textTransform: "capitalize", marginTop: "2ch", fontWeight: "bold"}}>{organisation}</div>
          <div style={{marginTop: "0.5ch", display: "flex", alignItems: "center"}}>
            <CalendarMonthIcon />
            {timing}
          </div>
          <div style={{marginTop: "0.5ch", textTransform: "capitalize", display: "flex", alignItems: "center"}}>
            <LocationOnIcon />
            {location_name}
          </div>
          <Button style={{marginTop: "2ch"}} sx={{fontFamily:"inherit"}} variant="outlined" endIcon={<InfoIcon/>} onClick={handleClick}>Find out more</Button>
        </div>
      </Paper>
    </Grid>
    </ThemeProvider>
  );
};

export default OrganisationCard;
