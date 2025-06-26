import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
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
        '&:hover': {
          transform: "translateY(-2px)",
          '& .persona-image': {
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          },
          '& .persona-image-overlay': {
            opacity: 1,
          },
          '& .start-chat-text': {
            opacity: 1,
            pointerEvents: 'auto',
            color: 'white',
          },
        },
      }}
      onClick={() => onStartChat?.(persona)}
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
        {/* Overlay for dimming effect on hover */}
        <Box
          className="persona-image-overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '8px',
            background: 'rgba(0,0,0,0.25)',
            opacity: 0,
            transition: 'opacity 0.2s',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {/* Start Chat text overlay */}
        <Box
          className="start-chat-text"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            pointerEvents: 'none',
            transition: "opacity 0.2s, color 0.2s",
            zIndex: 2,
            fontWeight: 600,
            fontSize: "15px",
            color: "white",
            userSelect: "none",
            cursor: "pointer",
            '&:hover': {
              color: '#2e7d32',
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            onStartChat?.(persona);
          }}
        >
          Start Chat
        </Box>
      </Box>
      <CardContent
        sx={{ p: 2, pt: 1.5, pb: "0px !important", background: "transparent" }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: 0,
            color: "#333",
            mb: 0.5,
          }}
        >
          {persona.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "21px",
            letterSpacing: 0,
            color: "#52946B",
          }}
        >
          {persona.role}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PersonaCard;
