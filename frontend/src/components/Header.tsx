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
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import SettingsPage from '../pages/SettingsPage';

const menuOptions = [
  'Marketing',
  'Technology',
  'Sales',
  'Marketing',
  'Sales',
  'Technology',
];

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);
  const profileOpen = Boolean(profileAnchorEl);
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };
  const handleLogout = () => {
    // TODO: Clear auth state if implemented
    handleProfileClose();
    navigate('/login');
  };
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const handleSettingsOpen = () => setSettingsOpen(true);
  const handleSettingsClose = () => setSettingsOpen(false);
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
              backgroundColor: "#00875A",
              color: "white",
              width: 40,
              borderRadius: "10%",
              height: 40,
              "&:hover": {
                backgroundColor: "#00875A",
              },
            }}
            onClick={() => navigate("/persona-selector")}
          >
            <IoChatbubbleEllipsesOutline size={20} />
          </IconButton>
        </Box>

        {/* Center section - Navigation and Search */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 4, flex: 1, mx: 4 }}
        ></Box>

        {/* Right section - Menu, Settings and Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Stack direction="row">
            <Button
              sx={{
                color: location.pathname === "/" ? "#059134" : "#666",
                fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: 0,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#059134",
                },
              }}
              onClick={() => navigate("/")}
            >
              Discover
            </Button>
            <Button
              sx={{
                color: location.pathname === "/chat-history" ? "#059134" : "#666",
                fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: 0,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#059134",
                },
              }}
              onClick={() => navigate("/chat-history")}
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
                backgroundColor: "#E8F2ED",
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
          <IconButton sx={{ color: "#666" }} onClick={handleSettingsOpen}>
            <CiSettings />
          </IconButton>
          <Button onClick={handleProfileClick} sx={{ minWidth: 0, p: 0.5 }}>
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              sx={{ width: 32, height: 32 }}
            />
          </Button>
          <Popover
            open={profileOpen}
            anchorEl={profileAnchorEl}
            onClose={handleProfileClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{
              sx: {
                mt: 1.5,
                ml: -2,
                borderRadius: 3,
                boxShadow: '0px 8px 32px 0px rgba(0,0,0,0.18)',
                minWidth: 240,
                p: 1.5,
                bgcolor: '#fff',
              }
            }}
          >
            <Typography sx={{ color: '#9e9e9e', fontSize: 18, fontWeight: 400, mb: 1.5, ml: 1 }}>
              Sophialclark@gmail.com
            </Typography>
            <List disablePadding>
              <ListItem button sx={{ borderRadius: 2, mb: 0.5, minHeight: 36 }} onClick={handleProfileClose}>
                <ListItemIcon sx={{ minWidth: 32 }}><HelpOutlineIcon sx={{ color: '#222', fontSize: 20 }} /></ListItemIcon>
                <ListItemText primary={<Typography sx={{ fontWeight: 500, fontSize: 16, color: '#222' }}>Help</Typography>} />
              </ListItem>
              <ListItem button sx={{ borderRadius: 2, minHeight: 36 }} onClick={handleLogout}>
                <ListItemIcon sx={{ minWidth: 32 }}><LogoutIcon sx={{ color: '#222', fontSize: 20 }} /></ListItemIcon>
                <ListItemText primary={<Typography sx={{ fontWeight: 500, fontSize: 16, color: '#222' }}>Logout</Typography>} />
              </ListItem>
            </List>
          </Popover>
        </Box>
      </Toolbar>
      <Dialog open={settingsOpen} onClose={handleSettingsClose} maxWidth="md" fullWidth>
        <SettingsPage />
      </Dialog>
    </AppBar>
  );
};

export default Header;
