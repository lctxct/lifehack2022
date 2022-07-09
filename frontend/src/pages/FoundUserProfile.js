import CustomizedTimeline from "../components/pastVolunteerEvents";
import BuddyProfile from "../components/BuddyProfile";
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
