import { categories, locations } from "../types/Organisations";
import MultiSelect from "../components/MultiSelect";
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
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
  const [description, setDescription] = useState("");
  const [eventName, setEventName] = useState("");
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [hasRetrievedCourses, setHasRetrievedCourses] = useState(false);

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

  const getRecommendedCourses = (e) => {
    e.preventDefault();
    fetch(BACKEND_URL + "/generate_training", {
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
  };

  return (
    <div>
      <Typography variant="h1">Create New Volunteering Opportunity</Typography>

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

          <Button variant="outlined" color="primary" type="submit">
            Get suggested courses
          </Button>
        </Grid>
      </form>
      {hasRetrievedCourses && (
        <div>
          <p>Would you like recommend any of the following courses?</p>
          <List>
            {suggestedCourses.map((course) => {
              return (
                <>
                  <ListItem>
                    <ListItemText primary={course} />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </div>
      )}
    </div>
  );
};

export default NewVolunteerOpportunity;
