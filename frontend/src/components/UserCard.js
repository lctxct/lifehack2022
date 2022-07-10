import { Button, Chip, Paper } from "@mui/material";
import { categories } from "../types/Organisations";
import profileImg from "../test-data/profile_pic.jpg";
import { createTheme, ThemeProvider } from "@mui/material";

const customTheme = createTheme({
  palette: {
    light: {main: '#CDBCA5', contrastText: '#FFFFFF'},
    mediumlight: {main: '#ccbca4', contrastText: '#FFFFFF'},
    neutral: {main: '#98745C', contrastText: '#FFFFFF'},
    dark: {main: '#060606', contrastText: '#FFFFFF'},
  },
});

const UserCard = ({ username, age, bio, handleClick, ...props }) => {
  return (
    <ThemeProvider theme={customTheme}>
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
      <Button variant="contained" color="mediumlight" onClick={handleClick} style={{marginTop: "2ch"}}>
        View Profile
      </Button>
    </Paper>
    </ThemeProvider>
  );
};

export default UserCard;
