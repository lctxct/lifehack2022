import { useEffect, useState } from "react";
import OrganisationBox from "../components/OrganisationBox";
import SearchIcon from '@mui/icons-material/Search';

import { Button, CircularProgress, Grid, TextField, Paper } from "@mui/material";
import defaultImg from "../test-data/image.jpg";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const DEFAULT_AUTH_TOKEN = process.env.REACT_APP_DEFAULT_AUTH_TOKEN


const Home = () => {
  const [organisationData, setOrganisationData] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

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
        setIsLoading(false);
      });
    }
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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div style={{ margin: '2vw' }}>
        <Paper elevation={20} style={{ padding: "5ch", borderRadius: "30px" }}>
          <div style={{ fontWeight: "bold", fontSize: "1.5vw" }}>
            Describe the type of volunteering opportunity you're looking for!
          </div>

          <form onSubmit={onSubmit} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <TextField
              placeholder="E.g I love nature and would love to help with guiding others to learn more about Singapore's nature reserves."
              multiline
              rows={5}
              fullWidth
              style={{ width: "40vw", margin: '2vw' }}
              onChange={handleChange}
            />
            <div>
              <Button variant="contained" type="submit" sx={{ fontFamily: 'inherit' }} endIcon={<SearchIcon />}>Get Recommendations</Button>
            </div>
          </form>
        </Paper>
      </div>
      <div>
        {isLoading && <CircularProgress />}
        {!isLoading && <Grid container spacing={3} style={{ padding: "2vw" }}>

          {organisationData.map((data) => (
            <OrganisationBox
              img={defaultImg}
              eventName={data.event_name}
              {...data}
              sx={{ fontFamily: 'inherit' }}
            />
          ))}
        </Grid>}
      </div>
    </div >
  );
};

export default Home;
