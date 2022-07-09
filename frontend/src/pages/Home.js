import { useEffect, useState } from "react";
import OrganisationBox from "../components/OrganisationBox";
import { Grid, TextField } from "@mui/material";
import defaultImg from "../test-data/image.jpg";

const SearchBar = () => {
  return (
    <div style={{margin: '2vw'}}>
      <div style={{ fontWeight: "bold", fontSize: "1.5vw" }}>
        Describe the type of volunteering opportunity you're looking for!
      </div>
      <TextField
        placeholder="Start typing..."
        multiline
        rows={10}
        fullWidth
        style={{ width: "40vw", margin: '2vw' }}
      />
    </div>
  );
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const DEFAULT_AUTH_TOKEN = process.env.REACT_APP_DEFAULT_AUTH_TOKEN;

const Home = () => {
  const [organisationData, setOrganisationData] = useState([]);

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
  };

  useEffect(() => {
    getOrganisationData();
  }, []);

  return (
    <>
      <SearchBar /> 
      <Grid container spacing={3} style={{ padding: "2vw" }}>
        {organisationData.map((data) => (
          <OrganisationBox
            img={defaultImg}
            eventName={data.event_name}
            {...data}
          />
        ))}
      </Grid>
    </>
  );
};

export default Home;
