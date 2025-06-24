import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Avatar,
  InputAdornment,
  Button,
  Stack,
} from "@mui/material";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CiSearch, CiSettings } from "react-icons/ci";

const Header: React.FC = () => {
  return (
    <AppBar
      position="relative"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        color: "#333",
        borderBottom: "1px solid #e9ecef",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        {/* Left section - Logo and Chat */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#333",
              fontSize: "18px",
            }}
          >
            Pine Labs
          </Typography>
          <IconButton
            sx={{
              backgroundColor: "#059134",
              color: "white",
              width: 40,
              borderRadius: "10%",
              height: 40,
              "&:hover": {
                backgroundColor: "#1b5e20",
              },
            }}
          >
            <IoChatbubbleEllipsesOutline size={20} />
          </IconButton>
        </Box>

        {/* Center section - Navigation and Search */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 4, flex: 1, mx: 4 }}
        ></Box>

        {/* Right section - Settings and Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Stack direction="row">
            <Button
              sx={{
                color: "#059134",
                fontWeight: 500,
                textTransform: "none",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#1b5e20",
                },
              }}
            >
              Discover
            </Button>
            <Button
              sx={{
                color: "#666",
                fontWeight: 400,
                textTransform: "none",
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#333",
                },
              }}
            >
              Chat History
            </Button>
          </Stack>
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            sx={{
              flex: 1,
              maxWidth: 150,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#e8f5e8",
                borderRadius: 2,
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "1px solid #059134",
                },
              },
              "& .MuiOutlinedInput-input::placeholder": {
                color: "#059134",
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CiSearch size={20} color="#059134" />
                </InputAdornment>
              ),
            }}
          />
          <IconButton sx={{ color: "#666" }}>
            <CiSettings />
          </IconButton>
          <Button>
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              sx={{ width: 32, height: 32 }}
            />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
