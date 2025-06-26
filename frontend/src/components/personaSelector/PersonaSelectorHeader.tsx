import React from "react";
import { Box, Typography } from "@mui/material";

const PersonaSelectorHeader: React.FC = () => (
  <Box sx={{ mt: 5, mb: 3, textAlign: 'center' }}>
    <Typography variant="h4" sx={{ fontWeight: 800, color: '#222', fontSize: 36, mb: 1 }}>
      Choose a persona to chat
    </Typography>
  </Box>
);

export default PersonaSelectorHeader; 