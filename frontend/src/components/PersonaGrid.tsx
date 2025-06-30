import React from "react";
import { Grid, Box, useTheme, useMediaQuery } from "@mui/material";
import PersonaCard from "./PersonaCard";
import type { Persona } from "../types";

interface PersonaGridProps {
  personas: Persona[];
  onStartChat?: (persona: Persona) => void;
}

const GRID_MAX_WIDTH = { xs: '100%', sm: 900, md: 1100, lg: 1200 };

const PersonaGrid: React.FC<PersonaGridProps> = ({ personas, onStartChat }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ flexGrow: 1, py: { xs: 1, sm: -1, md: -1 }, px: 0, width: '100%', maxWidth: 1200 }}>
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }}
        justifyContent="flex-start"
        sx={{ width: '100%', margin: 0 }}
      >
        {personas.map((persona) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={persona.id}
            sx={{ width: "100%" }}
          >
            <PersonaCard persona={persona} onStartChat={onStartChat} cardFullWidth />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PersonaGrid;
