import { Button, Chip, Paper } from "@mui/material";
import { categories } from "../types/Organisations";
import profileImg from "../test-data/profile_pic.jpg";

const UserCard = ({ username, age, bio, handleClick, ...props }) => {
  return (
    <Paper sx={{ width: 300, height: 480, padding: 3 }}>
      <img
        src={profileImg}
        alt="default"
        style={{ width: "80px", margin: "auto", borderRadius: "100%" }}
      />
      <h1>{username}</h1>
      <p>Age: {age}</p>
      <p>{bio}</p>
      {props.categories.map((category) => (
        <Chip label={categories[category]} sx={{ m: 0.5 }} />
      ))}
      <Button variant="contained" onClick={handleClick}>
        View Profile
      </Button>
    </Paper>
  );
};

export default UserCard;
