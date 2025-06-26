import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Button,
  Stack,
  Dialog,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { CiSettings } from "react-icons/ci";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SettingsPage from '../pages/SettingsPage';

interface ChatHeaderProps {
  onBack: () => void;
  onMenu?: () => void;
  isSidebarOpen?: boolean;
  backIcon?: React.ReactNode;
}

const SIDEBAR_WIDTH = 220; // Match Sidebar width

const ChatHeader: React.FC<ChatHeaderProps> = ({ onBack, onMenu, isSidebarOpen, backIcon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <AppBar
      position="relative"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        color: "#333",
        boxShadow: 'none',
        borderBottom: '1px solid #e9ecef',
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3, minHeight: 64 }}>
        {/* Left-side spacer when sidebar is open */}
        {isSidebarOpen && <Box sx={{ width: `${SIDEBAR_WIDTH}px`, flexShrink: 0 }} />}
        {/* Left section - Back and Menu, hidden when sidebar is open */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            transition: 'margin-left 0.3s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {!isSidebarOpen && (
            <>
              <IconButton
                size="small"
                onClick={onBack}
                sx={{
                  fontSize: 28,
                  color: '#000',
                  fontWeight: 900,
                  fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
                  p: 1,
                  mr: 0.2,
                  background: 'none',
                  border: 'none',
                  borderRadius: 0,
                  boxShadow: 'none',
                  '&:hover': {
                    color: '#059134',
                    background: 'none',
                  },
                }}
              >
                {typeof backIcon !== 'undefined' ? backIcon : '<'}
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: '#000',
                  fontSize: 22,
                  fontWeight: 900,
                  fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
                  p: 0.7,
                  ml: 0.2,
                  background: 'none',
                  border: 'none',
                  borderRadius: 0,
                  boxShadow: 'none',
                  '&:hover': {
                    color: '#059134',
                    background: 'none',
                  },
                }}
                onClick={onMenu}
              >
                <MenuIcon sx={{ fontSize: 22, fontWeight: 900 }} />
              </IconButton>
            </>
          )}
        </Box>

        {/* Center section - Spacer (matches Discover header) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4, flex: 1, mx: 4 }}></Box>

        {/* Right section - Navigation, Settings, Avatar */}
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
          {(() => {
            const [settingsOpen, setSettingsOpen] = React.useState(false);
            const handleSettingsOpen = () => setSettingsOpen(true);
            const handleSettingsClose = () => setSettingsOpen(false);
            return <>
              <IconButton sx={{ color: "#666" }} onClick={handleSettingsOpen}>
                <CiSettings />
              </IconButton>
              <Dialog open={settingsOpen} onClose={handleSettingsClose} maxWidth="md" fullWidth>
                <SettingsPage />
              </Dialog>
            </>;
          })()}
          <Button>
            <Avatar
              src="https://randomuser.me/api/portraits/women/44.jpg"
              sx={{ width: 32, height: 32 }}
            />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader; 