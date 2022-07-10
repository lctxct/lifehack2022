import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import johnImg from "../test-data/image.jpg";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function BuddyProfile() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card sx={{ maxwidth: 240, m: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="340"
          image={johnImg}
          alt="green john"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            John J., 21
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Hi I'm John! I'm an undergrad who enjoys volunteering on my off days
            and am looking to find like minded people to volunteer with! ^^
          </Typography>

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Interested Causes" value="1" />
                  <Tab label="Why Do I Volunteer?" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Animals" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Elderly" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Education Access" />
                  </ListItem>
                </List>
              </TabPanel>
              <TabPanel value="2">
                I like meeting new people and giving back!
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
      </CardActionArea>
      <Typography gutterBottom variant="h6" component="div" sx={{m: 3}}>
        <Button size="small" color="primary" variant="outlined" >
          Let's Chat!
        </Button>
      </Typography>
    </Card>
  );
}
