import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, Grid, Paper, Typography, Card}  from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from '@mui/icons-material/Info';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// export default function EventCard(props) {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardHeader title={props.title} subheader={props.subheader} />
//       <CardMedia component="img" height="194" image={props.img} alt="test" />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           What can you expect to learn?
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {props.takeaways}
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography paragraph>{props.desc}</Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// }








const OrganisationCardV2 = ({
  img,
  organisation,
  eventName,
  timing,
  location_name,
  handleClick,
  description,
  training_program,

  ...props
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
        setExpanded(!expanded);
      };
  return (
    <Grid item xs={12} sm={4}>
      <Paper>
        <img src={img} alt="organisation" style={{ maxWidth: "100%",  }} />
        <div style={{padding: '1vw'}}>
          <Typography variant="h5">{eventName}</Typography>
          <div style={{textTransform: "capitalize", marginTop: "2ch", fontWeight: "bold"}}>{organisation}</div>
          <div style={{marginTop: "0.5ch", display: "flex", alignItems: "center"}}>
            <CalendarMonthIcon />
            {timing}
          </div>
          <div style={{marginTop: "0.5ch", textTransform: "capitalize", display: "flex", alignItems: "center"}}>
            <LocationOnIcon />
            {location_name}
          </div>
          <div style={{marginTop: "0.5ch", textTransform: "capitalize", display: "flex", alignItems: "center"}}>
            <Typography variant="body2" color="text.secondary">
              What can you expect to learn?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {training_program}
            </Typography>
          </div>
          <div style={{marginTop: "0.5ch", textTransform: "capitalize", display: "flex", alignItems: "center"}}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          < IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
          
        </ExpandMore>
        </div>
        
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{description}</Typography>
            </CardContent>
          </Collapse>        
      
      </div>
      </Paper>
    </Grid>
  );
};

export default OrganisationCardV2;
