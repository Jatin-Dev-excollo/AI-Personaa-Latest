import React from "react";
import { Card, CardMedia, Typography, Button, Box } from "@mui/material";
import type { Persona } from "../types";

interface PersonaCardProps {
  persona: Persona;
  onStartChat?: (persona: Persona) => void;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona, onStartChat }) => {
  return (
    <Card
      sx={{
        maxWidth: 180,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="240"
          image={persona.avatar}
          alt={persona.name}
          sx={{
            objectFit: "cover",
          }}
        />

        {/* Text overlay - always visible */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
            color: "white",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              fontSize: "15px",
              lineHeight: 1.2,
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {persona.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              opacity: 0.9,
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {persona.role}
          </Typography>
        </Box>

        {/* Start Chat button overlay - conditionally visible */}
        {persona.hasStartChat && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                onStartChat?.(persona);
              }}
              sx={{
                backgroundColor: "rgba(255,255,255,0.95)",
                color: "#333",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                py: 1,
                fontSize: "13px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,1)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                },
              }}
            >
              Start Chat
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default PersonaCard;
