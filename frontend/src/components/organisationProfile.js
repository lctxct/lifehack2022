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
import johnImg from "../test-data/john.jpeg";

export default function orgProfile() {
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
          image={johnImg}
          alt="green john"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          The Singapore Association of the Visually Handicapped (SAVH), is the national voluntary welfare organization for the visually impaired. Founded in 1951, the association is affiliated to the National Council of Social Service (NCSS) and is an approved Institution of a Public Character (IPC).          </Typography>
          
          <Typography variant="body2" color="text.secondary">
              
          </Typography>

          <Box sx={{ width: '100%', typography: 'body1' }}>
              
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Top Volunteers" value="1" />
                    <Tab label="Past Events" value="2" />
                    
                </TabList>
                </Box>
                <TabPanel value="1">
                    
                </TabPanel>
                <TabPanel value="2">

                </TabPanel>
               

            </TabContext>
        </Box>

        </CardContent>
      </CardActionArea>
      <Typography gutterBottom variant="h6" component="div">
        <Button size="small" color="primary" variant="outlined">
          Let's Chat!
        </Button>
      </Typography>
    </Card>
  );
}
