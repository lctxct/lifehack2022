import { categories, locations } from "../types/Organisations";
import MultiSelect from "../components/MultiSelect";
import { useSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Paper
} from "@mui/material";
import { useState } from "react";

const defaultValues = {
  name: "",
  age: 0,
  gender: "",
  os: "",
  favoriteNumber: 0,
};

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const DEFAULT_AUTH_TOKEN = process.env.REACT_APP_DEFAULT_AUTH_TOKEN;

const NewVolunteerOpportunity = () => {
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [loadingTraining, setLoadingTraining] = useState(false)
  const [description, setDescription] = useState("");
  const [eventName, setEventName] = useState("");
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [hasRetrievedCourses, setHasRetrievedCourses] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleCategoryFilterChange = (e) => {
    const {
      target: { value },
    } = e;

    setCategoryFilter(typeof value === "string" ? value.split(",") : value);
  };

  const handleLocationFilterChange = (e) => {
    const value = e.target.value;

    setLocationFilter(typeof value === "string" ? value.split(",") : value);
  };

  const getRecommendedCourses = async (e) => {
    e.preventDefault();
    if (description.length > 0 && eventName.length > 0) {
      setLoadingTraining(true)
      await fetch(BACKEND_URL + "/generate_training", {
        method: "post",
        headers: {
          authorization: DEFAULT_AUTH_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          event_name: eventName,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setSuggestedCourses(data.generatedTrainings);
          setHasRetrievedCourses(true);
        });
      setLoadingTraining(false)
    }
    else {
      enqueueSnackbar("Description and title should not be blank.", {
        variant: 'error',
        autoHideDuration: 2500
      })
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <Typography variant="h3" style={{ marginTop: "3vh" }}>Create New Volunteering Opportunity</Typography>

      <Paper elevation={20} style={{ padding: "5ch", marginTop: "2ch" }}>
        <form onSubmit={getRecommendedCourses}>
          <Grid container alignItems="center" justify="center" direction="column">
            <Grid item>
              <TextField
                label="Event Title"
                variant="standard"
                value={eventName}
                onChange={(event) => setEventName(event.target.value)}
                sx={{ m: 1, width: 300 }}
              />
            </Grid>
            <Grid item>
              <MultiSelect
                label="Categories"
                items={categories}
                itemFilter={categoryFilter}
                handleChange={handleCategoryFilterChange}
              />
            </Grid>
            <Grid item>
              <MultiSelect
                label="Locations"
                items={locations}
                itemFilter={locationFilter}
                handleChange={handleLocationFilterChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                multiline
                rows={4}
                defaultValue=""
                variant="outlined"
                sx={{ m: 1, width: 300 }}
              />
            </Grid>

            <div style={{marginTop: "2ch", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
              <LoadingButton loading={loadingTraining} variant="outlined" color="primary" type="submit">
                Get suggested courses
              </LoadingButton>
              <div style={{marginTop: "2ch"}}>
              <span >Volunteers are more likely to join if they know what's in it for them! Generate a list of training programs that fit your needs. </span>
              </div>
            </div>
          </Grid>
        </form>

        {hasRetrievedCourses && (
          <div>
            <h4>Suggested Courses:</h4>
            <List>
              {suggestedCourses.map((course) => {
                return (
                  <>
                    <ListItem style={{ textTransform: "capitalize" }}>
                      <ListItemText primary={course} />
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default NewVolunteerOpportunity;
