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
    <Card sx={{ maxWidth: 445 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="340"
          image={Img}
          alt="green john"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Food From the Heart
</Typography>
          <Typography gutterBottom variant="h6" component="div">
          Food from the Heart is a non-profit organisation that feeds the needy through its food distribution programme. Our mission is to To alleviate hunger by providing reliable, consistent and sustainable food support to the less-fortunate through food distribution programmes.
          </Typography>

          <Box sx={{ width: '100%', typography: 'body1' }}>
              
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Top Volunteers" value="1" />
                    <Tab label="Locations" value="2" />   
                </TabList>
                </Box>
                <TabPanel value="1">
                <List>
                    <ListItem>
                      <ListItemIcon>
                        <CelebrationIcon/>
                      </ListItemIcon>
                      <ListItemText
                        primary="John J."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CelebrationIcon/>
                      </ListItemIcon>
                      <ListItemText
                        primary="William"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CelebrationIcon/>
                      </ListItemIcon>
                      <ListItemText
                        primary="Joanne"
                      />
                    </ListItem>
            </List>
                </TabPanel>
                <TabPanel value="2">
                  {/* how to get all the locations of a organisation name */}
                  <List>
              
                    <ListItem>
                      <ListItemIcon>
                        <LocationSearchingIcon/>
                      </ListItemIcon>
                      <ListItemText
                        primary="Bedok"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationSearchingIcon/>
                      </ListItemIcon>
                      <ListItemText
                        primary="Changi"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationSearchingIcon/>
                      </ListItemIcon>
                      <ListItemText
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
