import BuddyingFilterBar from "../components/BuddyingFilterBar";
import UserCard from "../components/UserCard";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { useEffect, useState } from "react";
import { categories } from "../types/Organisations";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const DEFAULT_AUTH_TOKEN = process.env.REACT_APP_DEFAULT_AUTH_TOKEN;

const Buddying = () => {
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
          data.users.filter((user) => {
            if (!categoryFilter.length) {
              return true;
            }
            return user.categories.some(category => categoryFilter.includes(categories[category]))
          }).map((user, index) => {
            return { key: index, content: <UserCard {...user} /> };
          })
        );
      });
  }, [categoryFilter, locationFilter]);

  return (
    <>
      <BuddyingFilterBar
        handleCategoryFilterChange={handleCategoryFilterChange}
        handleLocationFilterChange={handleLocationFilterChange}
        categoryFilter={categoryFilter}
        locationFilter={locationFilter}
      />
      <div style={{ width: "40%", height: "500px", margin: "1vw auto" }}>
        <Carousel
          slides={slides}
          offsetRadius="10"
          animationConfig={config.gentle}
          showNavigation
        />
      </div>
    </>
  );
};

export default Buddying;
