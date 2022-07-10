import { useEffect, useState } from "react";

import  OrganisationCardV2 from "../components/OrganisationEvent";
import { Grid, TextField } from "@mui/material";
import defaultImg from "../test-data/image.jpg";
import Stack from '@mui/material/Stack';
import OrgProfile from  '../components/OrganisationProfile';


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const DEFAULT_AUTH_TOKEN = process.env.REACT_APP_DEFAULT_AUTH_TOKEN

const OrganisationPage = () => {
    const [organisationData, setOrganisationData] = useState([]);
    const [query, setQuery] = useState('');
    const [currentlyFiltered, setCurrentlyFiltered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [ modal, setModal ] = useState(true); 
  
    const handleChange = (event) => {
      setQuery(event.target.value);
    };
  
    const handleClick = () =>  {
      setModal(!modal); 
    }
  
    const onSubmit = (event) => {
      event.preventDefault();
      if (query.length > 0) {
        setIsLoading(true);
        fetch(BACKEND_URL + '/search_volunteer_opportunity', {
          // how can i specify which org i want to take the data from? 
          method: 'post',
          headers: {
            authorization: DEFAULT_AUTH_TOKEN,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "query": query
          })
        }).then(res => {
          return res.json()
        }).then(data => {
          opps = data.filteredOpportunities.filter(r => r.organisation == "the organisation u want");
          setOrganisationData(opps);
        

          setCurrentlyFiltered(true)
          setIsLoading(false);
        });
      }
    }
  
    const getOrganisationData = async () => {
      const response = await fetch(
        BACKEND_URL + "/display_volunteer_opportunity",
        {
          method: "GET",
          headers: {
            authorization: DEFAULT_AUTH_TOKEN,
          },
        }
      );
  
      const data = await response.json();
      setOrganisationData(data.opportunities);
      setIsLoading(false);
    };

  
    const handleClearFilter = () => {
      setIsLoading(true);
      setQuery("")
      setCurrentlyFiltered(false)
      getOrganisationData()
    }
  
    useEffect(() => {
      getOrganisationData();
    }, []);
  
  return (
    <Stack direction="row" alignItems="stretch" spacing={0}>
      <item>
        <OrgProfile />
      </item>

      <item>
         <Grid container spacing={3} style={{ padding: "2vw" }}>

            {organisationData.map((data) => (
              <OrganisationCardV2
                img={defaultImg}
                eventName={data.event_name}
                // handleClick={handleClick}
                {...data}
                sx={{ fontFamily: 'inherit' }}
              />
            ))}
        </Grid>
      </item>
    </Stack>
  );
}

export default OrganisationPage 