import React from "react";
import { Grid, Box } from "@mui/material";
import PersonaCard from "./PersonaCard";
import type { Persona } from "../types";

interface PersonaGridProps {
  personas: Persona[];
  onStartChat?: (persona: Persona) => void;
}

const PersonaGrid: React.FC<PersonaGridProps> = ({ personas, onStartChat }) => {
  return (
    <Box sx={{ flexGrow: 1, py: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          mx: 4,
        }}
      >
        <Box sx={{ maxWidth: 900, width: "100%" }}>
          <Grid container spacing={3}>
            {personas.map((persona) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={persona.id}>
                <PersonaCard persona={persona} onStartChat={onStartChat} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonaGrid;
