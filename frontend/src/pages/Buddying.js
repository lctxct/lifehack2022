import BuddyingFilterBar from "../components/BuddyingFilterBar";
import UserCard from "../components/UserCard";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { useEffect, useState } from "react";
import { categories } from "../types/Organisations";
import { Fade } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const DEFAULT_AUTH_TOKEN = process.env.REACT_APP_DEFAULT_AUTH_TOKEN;

const customTheme = createTheme({
  palette: {
    light: {main: '#CDBCA5', contrastText: '#FFFFFF'},
    mediumlight: {main: '#d4c4b4', contrastText: '#FFFFFF'},
    neutral: {main: '#98745C', contrastText: '#FFFFFF'},
    dark: {main: '#060606', contrastText: '#FFFFFF'},
  },
});

const Buddying = ({ setPage }) => {
  const [slides, setSlides] = useState([]); // key and content
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);

  const handleCategoryFilterChange = (e) => {
    const {
      target: { value },
    } = e;

    setCategoryFilter(typeof value === "string" ? value.split(",") : value);
  };

  const handleLocationFilterChange = (e) => {
    const {
      target: { value },
    } = e;

    setLocationFilter(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    fetch(BACKEND_URL + "/list_users", {
      method: "get",
      headers: {
        authorization: DEFAULT_AUTH_TOKEN,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSlides(
          data.users
            .filter((user) => {
              if (!categoryFilter.length) {
                return true;
              }
              return user.categories.some((category) =>
                categoryFilter.includes(categories[category])
              );
            })
            .map((user, index) => {
              return {
                key: index,
                content: <UserCard handleClick={() => setPage(2)} {...user} />,
              };
            })
        );
      });
  }, [categoryFilter, locationFilter]);

  return (
    <ThemeProvider theme={customTheme}>
    <Fade in={true}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <h1>Find a buddy! 🤗</h1>
        <span style={{marginBottom: "2ch"}}>Volunteering alone can be kind of lonely. Here are a list of volunteers <b>similiar to you</b> which you can volunteer together!</span>
        <BuddyingFilterBar
          handleCategoryFilterChange={handleCategoryFilterChange}
          handleLocationFilterChange={handleLocationFilterChange}
          categoryFilter={categoryFilter}
          locationFilter={locationFilter}
        />
        <div style={{ width: "40%", height: "500px", margin: "1vw auto", marginTop: "3ch"}}>
          <Carousel
            slides={slides}
            offsetRadius="3"
            animationConfig={config.gentle}
            showNavigation
          />
        </div>
      </div>
    </Fade>
    </ThemeProvider>
  );
};

export default Buddying;
