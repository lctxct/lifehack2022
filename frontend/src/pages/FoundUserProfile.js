import * as React from 'react';
import BuddyProfile from "../components/BuddyProfile";
import CustomizedTimeline from "../components/pastVolunteerEvents";


// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';

import Stack from "@mui/material/Stack";

export default function FoundProfile() {
  return (
    <Stack direction="row" alignItems="stretch" spacing={0}>
      <item>
        <BuddyProfile />
      </item>
      <item>
        <CustomizedTimeline />
      </item>
    </Stack>
  );
}







// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// // import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import { Button, CardActionArea, CardActions, Box } from '@mui/material';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import johnImg from "../test-data/john.jpeg";


// const drawerWidth = 240;

// export default function FoundProfile() {
//   const [value, setValue] = React.useState('1');

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
     
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar />
//         <Divider />
//         {/* <List>
//           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List> */}
//         <Card sx={{ maxWidth: 445 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="340"
//           image={johnImg}
//           alt="green john"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             John J., 21
//           </Typography>
          
//           <Typography variant="body2" color="text.secondary">
//             Hi I'm John! I'm an undergrad who enjoys volunteering on my off days and am looking to find like minded people to volunteer with! ^^
//           </Typography>

//           <Box sx={{ width: '100%', typography: 'body1' }}>
              
//             <TabContext value={value}>
//                 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                 <TabList onChange={handleChange} aria-label="lab API tabs example">
//                     <Tab label="Interested Causes" value="1" />
//                     <Tab label="My Interests" value="2" />
                    
//                 </TabList>
//                 </Box>
//                 <TabPanel value="1">Animals, Elderly, Education</TabPanel>
//                 <TabPanel value="2">I like potatoes.</TabPanel>
               

//             </TabContext>
//         </Box>

//         </CardContent>
//       </CardActionArea>
//       <Typography gutterBottom variant="h6" component="div">
//         <Button size="small" color="primary" variant="outlined">
//           Let's Chat!
//         </Button>
//       </Typography>
//     </Card>
//         <Divider />
//         {/* <List>
//           {['All mail', 'Trash', 'Spam'].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List> */}
//       </Drawer>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
//       >
//         <Toolbar />
       
//         <CustomizedTimeline />
  
//       </Box>
//     </Box>
//   );
// }
