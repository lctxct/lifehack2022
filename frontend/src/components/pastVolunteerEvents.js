import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function CustomizedTimeline() {
  return (
    <Timeline>
        <h2> My Volunteering Journey </h2>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          May, 2022
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            {/* <FastfoodIcon /> */}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Senior Volunteer, SPCA
          </Typography>
          <Typography>I enjoyed mentoring the new recruits. I had a great time interacting with the staff and especially the animals. </Typography>
          <Typography component="legend"><i>My Experience</i></Typography>
          <Rating name="read-only" value={3} readOnly />
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          Jan, 2022
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            {/* <LaptopMacIcon /> */}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Volunteer, Silver Homes
          </Typography>
          <Typography>Had a wonderful time chatting with the elderly and getting to hear their life stories!</Typography>
          <Typography component="legend"> <i>My Experience</i></Typography>
          <Rating name="read-only" value={3} readOnly />
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          Nov, 2021
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            {/* <HotelIcon /> */}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Volunteer Instructor, CITC
          </Typography>
          <Typography>It was fullfilling to teach the children. Their structured on-boarding workshops gave me insights on how to be a better educater! </Typography>
          <Typography component="legend"><i>My Experience</i></Typography>
          <Rating name="read-only" value={4} readOnly />
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          June, 2021
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            {/* <HotelIcon /> */}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Junior Volunteer, SPCA
          </Typography>
          <Typography> Loved working with the animals and interacting with the public at adoption drives. </Typography>
          <Typography component="legend"><i>My Experience</i></Typography>
          <Rating name="read-only" value={5} readOnly />
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          Dec, 2019
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            {/* <HotelIcon /> */}
          </TimelineDot>
          <TimelineConnector/>
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
                VIA Leader, Self-Initiated
          </Typography>
          <Typography> Worked with school to organise talent show for nearby daycare. </Typography>
          <Typography component="legend"><i>My Experience</i></Typography>
          <Rating name="read-only" value={4} readOnly />
        </TimelineContent>
      </TimelineItem>
      
    </Timeline>
  );
}
