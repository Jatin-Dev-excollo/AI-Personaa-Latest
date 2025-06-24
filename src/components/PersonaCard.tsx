import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import type { Persona } from "../types";

interface PersonaCardProps {
  persona: Persona;
  onStartChat?: (persona: Persona) => void;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona, onStartChat }) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        width: 200,
        gap: 3,
        backgroundColor: "transparent",
        boxShadow: "none",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        cursor: "pointer",
        position: "relative",
        overflow: "visible",
        "&:hover": {
          transform: "translateY(-2px)",
          "& .persona-image": {
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          },
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={persona.avatar}
          alt={persona.name}
          className="persona-image"
          sx={{
            objectFit: "cover",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "box-shadow 0.2s ease-in-out",
          }}
        />

        {persona.hasStartChat && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7) 100%)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              p: 2,
              borderRadius: "8px",
            }}
          >
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                onStartChat?.(persona);
              }}
              sx={{
                backgroundColor: "rgba(255,255,255,0.9)",
                color: "#333",
                fontWeight: 500,
                textTransform: "none",
                borderRadius: 1.5,
                px: 2.5,
                py: 0.8,
                fontSize: "13px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,1)",
                },
              }}
            >
              Start Chat
            </Button>
          </Box>
        )}
      </Box>

      <CardContent
        sx={{ p: 2, pt: 1.5, pb: "0px !important", background: "transparent" }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            fontSize: "15px",
            color: "#333",
            mb: 0.5,
            lineHeight: 1.3,
          }}
        >
          {persona.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#2e7d32",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          {persona.role}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PersonaCard;
