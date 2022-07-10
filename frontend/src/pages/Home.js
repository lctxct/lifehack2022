import { useEffect, useState } from "react";
import OrganisationCard from "../components/OrganisationCard";
import OrganisationModal from "../components/OrganisationModal";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import { Button, CircularProgress, Grid, TextField, Paper, Fade, createTheme, ThemeProvider } from "@mui/material";
import defaultImg from "../test-data/image.jpg";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const DEFAULT_AUTH_TOKEN = process.env.REACT_APP_DEFAULT_AUTH_TOKEN

const customTheme = createTheme({
  palette: {
    light: {
      main: '#CDBCA5',
      contrastText: '#FFFFFF'
    },
    neutral: {
      main: '#98745C',
      contrastText: '#FFFFFF'
    },
  },
});


const Home = () => {
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
    <ThemeProvider theme={customTheme}>
    <Fade in={true}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ margin: '2vw' }}>
          <Paper elevation={20} style={{ padding: "5ch", borderRadius: "30px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold", fontSize: "1.5vw" }}>
              Describe the type of volunteering opportunity you're looking for!
            </span>
            <span style={{marginTop: "0.8ch"}}>We will use our NLP model to find you the perfect volunteering opportunity!</span>

            <form onSubmit={onSubmit} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <TextField
                placeholder="E.g I love nature and would love to help with guiding others to learn more about Singapore's nature reserves."
                multiline
                rows={5}
                fullWidth
                value={query}
                style={{ width: "40vw", margin: '2vw' }}
                onChange={handleChange}
              />
              <div>
                <Button color="neutral" variant="contained" type="submit" sx={{ fontFamily: 'inherit' }} endIcon={<SearchIcon />}>Get Recommendations</Button>
              </div>
            </form>

            {currentlyFiltered && (
              <div>
                <Button variant="contained" sx={{ fontFamily: 'inherit', marginTop: "3ch" }} color="error" endIcon={<DeleteIcon />} onClick={() => { handleClearFilter() }}>Clear Filter</Button>
              </div>
            )}
          </Paper>
        </div>
        <div>
          {isLoading && <CircularProgress color="light"/>}
          {!isLoading && <Grid container spacing={3} style={{ padding: "2vw" }}>

            {organisationData.map((data) => (
              <OrganisationCard
                img={defaultImg}
                eventName={data.event_name}
                handleClick={handleClick}
                {...data}
                sx={{ fontFamily: 'inherit' }}
              />
            ))}
          </Grid>}
        </div>
        <OrganisationModal open={modal} handleClose={handleClick} />
      </div >
    </Fade>
    </ThemeProvider>
  );
};

export default Home;
