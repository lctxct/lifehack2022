import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Img from "../test-data/orgFood.png";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CelebrationIcon from '@mui/icons-material/Celebration';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

export default function OrgProfile() {
    const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card sx={{ maxWidth: 445, fontFamily: "inherit" }}>
      <CardActionArea sx={{fontFamily:"inherit"}}>
        <CardMedia
          component="img"
          height="50%"
          image={Img}
          alt="green john"
        />
        <CardContent sx={{fontFamily:"inherit"}}>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:"inherit", fontSize:"1.1rem", fontWeight:"bold"}}>
          Food From the Heart
</Typography>
          <Typography gutterBottom variant="h6" component="div" sx={{fontFamily:"inherit", fontSize:"0.9rem", textAlign:"justify"}}>
          Food from the Heart is a non-profit organisation that feeds the needy through its food distribution programme. Our mission is to alleviate hunger by providing reliable, consistent and sustainable food support to the less-fortunate through food distribution programmes.
          </Typography>

          <Box sx={{ width: '100%', typography: 'body1' }}>
              
            <TabContext value={value}>
                <Box sx={{ borderBottom: "0.5rem", borderColor: 'divider'}}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Top Volunteers" value="1" sx={{width:"50%"}}/>
                    <Tab label="Locations" value="2" />   
                </TabList>
                </Box>
                <TabPanel value="1" sx={{ marginTop: "-0.6rem"}}>
                <List>
                    <ListItem sx={{padding:"0.05rem", marginLeft:"1rem"}}>
                      <ListItemIcon>
                        <CelebrationIcon/>
                      </ListItemIcon>
                      <ListItemText
                        sx={{marginLeft:"-1rem",fontSize:"0.5rem"}}
                        primary="John J."
                      />
                    </ListItem>
                    <ListItem sx={{padding:"0.05rem", marginLeft:"1rem"}}>
                      <ListItemIcon>
                        <CelebrationIcon/>
                      </ListItemIcon>
                      <ListItemText
                        sx={{marginLeft:"-1rem",fontSize:"0.5rem"}}
                        primary="William"
                      />
                    </ListItem>
                    <ListItem sx={{padding:"0.05rem", marginLeft:"1rem"}}>
                      <ListItemIcon>
                        <CelebrationIcon/>
                      </ListItemIcon>
                      <ListItemText
                        sx={{marginLeft:"-1rem",fontSize:"0.5rem"}}
                        primary="Joanne"
                      />
                    </ListItem>
            </List>
                </TabPanel>
                <TabPanel value="2" sx={{ marginTop: "-0.6rem"}}>
                  {/* how to get all the locations of a organisation name */}
                  <List>
              
                    <ListItem sx={{padding:"0.05rem", marginLeft:"1rem"}}>
                      <ListItemIcon>
                        <LocationSearchingIcon/>
                      </ListItemIcon>
                      <ListItemText
                        sx={{marginLeft:"-1rem",fontSize:"0.5rem"}}
                        primary="Bedok"
                      />
                    </ListItem>
                    <ListItem sx={{padding:"0.05rem", marginLeft:"1rem"}}>
                      <ListItemIcon>
                        <LocationSearchingIcon/>
                      </ListItemIcon>
                      <ListItemText
                        sx={{marginLeft:"-1rem",fontSize:"0.5rem"}}
                        primary="Changi"
                      />
                    </ListItem>
                    <ListItem sx={{padding:"0.05rem", marginLeft:"1rem"}}>
                      <ListItemIcon>
                        <LocationSearchingIcon/>
                      </ListItemIcon>
                      <ListItemText
                        sx={{marginLeft:"-1rem",fontSize:"0.5rem"}}
                        primary="Jupiter"
                      />
                    </ListItem>
                </List>
                </TabPanel>
               

            </TabContext>
        </Box>

        </CardContent>
      </CardActionArea>
      <Typography gutterBottom variant="h6" component="div">
        <Button size="medium" color="primary" variant="contained">
          Let's Chat!
        </Button>
      </Typography>
    </Card>
  );
}
