import { Box, Dialog } from "@mui/material";
import OrganisationProfile from "../components/OrganisationProfile";

const OrganisationModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box>
        <OrganisationProfile />
      </Box>
    </Dialog>
  );
};

export default OrganisationModal;
