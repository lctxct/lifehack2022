import { useEffect, useState } from "react";
import OrganisationBox from "../components/OrganisationBox";
import { Button, CircularProgress, createTheme, Grid, TextField, ThemeProvider } from "@mui/material";
import defaultImg from "../test-data/image.jpg";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const DEFAULT_AUTH_TOKEN = process.env.REACT_APP_DEFAULT_AUTH_TOKEN

const customTheme = createTheme({
  palette: {
    neutral: {
      main: '#060606'
    },
  },
});


const Home = () => {
  const [organisationData, setOrganisationData] = useState([]);
  const [query, setQuery] = useState(''); 
  const [isLoading, setIsLoading] = useState(true); 

  const handleChange = (event) => {
    setQuery(event.target.value); 
  };

  const onSubmit = (event) => {
    event.preventDefault(); 
    setIsLoading(true); 
    fetch(BACKEND_URL + '/search_volunteer_opportunity', {
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
      setOrganisationData(data.filteredOpportunities);
      setIsLoading(false); 
    });
  }

  useEffect(() => {
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

    getOrganisationData();
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
    <>      
      <div style={{margin: '2vw'}}>
      <div style={{ fontWeight: "bold", fontSize: "1.5vw" }}>
        Describe the type of volunteering opportunity you're looking for!
      </div>
      <form onSubmit={onSubmit}>
      <TextField
        placeholder="Start typing..."
        multiline
        rows={5}
        fullWidth
        style={{ width: "40vw", margin: '2vw' }}
        onChange={handleChange}
      />
      <div>
      <Button color="neutral" variant="outlined" type="submit" sx={{fontFamily: 'inherit'}}>Get Recommendations</Button>
      </div>
      
      </form>
    </div>
    {isLoading && <CircularProgress />}
    {!isLoading && <Grid container spacing={3} style={{ padding: "2vw" }}>
        
         {organisationData.map((data) => (
          <OrganisationBox
            img={defaultImg}
            eventName={data.event_name}
            {...data}
            sx={{fontFamily: 'inherit'}}
          />
        ))}
      </Grid>}
    </>
    </ThemeProvider>
  );
};

export default Home;
