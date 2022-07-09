import { useEffect, useState } from "react";
import  EventCard from "../components/OrganisationEvent";
import { Grid, TextField } from "@mui/material";
import defaultImg from "../test-data/image.jpg";
import Stack from '@mui/material/Stack';
import OrgProfile from  '../components/OrganisationProfile';


export default function OrganisationPage() {
    return (
        <Stack
  direction="row"
  alignItems="stretch"
  spacing={0}
>
    <item>
        <OrgProfile/>
    </item>

<item>
        <Grid container spacing={3} style={{ padding: "2vw" }}>
        
          <EventCard
          title="test1" 
          subheader="test1"
          takeaways="test1"
          desc="test1" 
          img={defaultImg}
            
          />

        <EventCard
          title="test1" 
          subheader="test1"
          takeaways="test1"
          desc="test1" 
          img={defaultImg}
            
          />
          <EventCard
          title="test1" 
          subheader="test1"
          takeaways="test1"
          desc="test1" 
          img={defaultImg}
            
          />
       
      </Grid>
      </item>
      </Stack>
    )
}