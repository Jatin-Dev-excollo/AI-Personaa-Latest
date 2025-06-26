import React, { useRef, useState } from "react";
import { Box, Avatar, Typography, IconButton, Chip, InputBase, Paper, ClickAwayListener } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { IoSend } from 'react-icons/io5';
import MicIcon from '@mui/icons-material/Mic';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import HistoryIcon from '@mui/icons-material/History';
import type { Persona } from "../types";
import ChatHeader from "../components/ChatHeader";
import Sidebar from '../components/sidebar/Sidebar';
import { mockPersonas } from "../data/mockData";

const suggestionChips = [
  "Ask about QR transaction flows",
  "Get merchant risk metrics",
  "Clarify settlement SLA"
];

interface ChatPageProps {
  persona: Persona;
  onBack: () => void;
}

export default function ChatPage({ persona, onBack }: ChatPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPersona, setCurrentPersona] = useState<Persona>(persona);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  // Handler to open sidebar from header
  const handleMenuClick = () => setSidebarOpen(true);
  // Handler to close sidebar
  const handleSidebarClose = () => setSidebarOpen(false);
  const SIDEBAR_WIDTH = 160;

  // Handler to open persona switcher
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setSwitcherOpen(true);
  };
  // Handler to close persona switcher
  const handleSwitcherClose = () => {
    setSwitcherOpen(false);
    setAnchorEl(null);
  };
  // Handler to switch persona
  const handlePersonaSelect = (p: Persona) => {
    setCurrentPersona(p);
    handleSwitcherClose();
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      bgcolor: '#fff', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden' // Prevent page-level scroll
    }}>
      {/* Full-width ChatHeader at the top */}
      <ChatHeader onBack={onBack} onMenu={handleMenuClick} isSidebarOpen={sidebarOpen} backIcon={<ChevronLeftIcon sx={{ fontSize: 28, color: '#012A1F' }} />} />
      
      {/* Content area with sidebar and main chat */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        flex: 1,
        overflow: 'hidden' // Contain the scrolling areas
      }}>
        {/* Sidebar - only this should scroll */}
        {sidebarOpen && (
          <Sidebar onClose={handleSidebarClose} />
        )}

        {/* Main chat area wrapper */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            transition: 'margin-left 0.3s cubic-bezier(.4,0,.2,1)',
            ml: sidebarOpen ? `${SIDEBAR_WIDTH}px` : 0,
            height: '100%',
          }}
        >
          {/* Scrollable content area */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 900,
            width: '100%',
            mx: 'auto',
            pt: 2.5, // Shift persona profile further up for better alignment
            overflow: 'auto',
            pb: 20 // Space for fixed elements at bottom
          }}>
            {/* Centered Persona Profile */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', mb: 6 }} onClick={handleProfileClick}>
              <Avatar src={currentPersona.avatar} sx={{ width: 96, height: 96, mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#222', mb: 0.5 }}>{currentPersona.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Typography variant="subtitle1" sx={{ color: '#2e7d32', fontWeight: 400, fontSize: 18 }}>{currentPersona.role}</Typography>
                <AutorenewIcon sx={{ color: '#2e7d32', fontSize: 18 }} />
              </Box>
            </Box>
            {/* Persona Switcher Popup */}
            {switcherOpen && anchorEl && (
              <ClickAwayListener onClickAway={handleSwitcherClose}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 160,
                    left: 'calc(50% + 100px)',
                    bgcolor: '#fafbfa',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px 0 rgba(44,62,80,0.10)',
                    p: 1.1,
                    minWidth: 160,
                    zIndex: 30,
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#888', fontWeight: 600, mb: 1, fontSize: 15 }}>
                    Switch Persona
                  </Typography>
                  {mockPersonas.filter(p => p.id !== currentPersona.id).slice(0, 3).map((p) => (
                    <Box key={p.id} sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer', pl: 2, '&:hover': { background: '#f5f5f5', borderRadius: 1 } }} onClick={() => handlePersonaSelect(p)}>
                      <Avatar src={p.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 13, color: '#222' }}>{p.name}</Typography>
                        <Typography sx={{ color: '#388e3c', fontWeight: 400, fontSize: 11 }}>{p.role}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </ClickAwayListener>
            )}
          </Box>

          {/* Fixed elements at the bottom */}
          <Box sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 0,
            pb: 4,
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 20%)',
          }}>
            {/* Suggestion Chips */}
            <Box sx={{
              display: 'flex',
              gap: 2,
              maxWidth: 900,
              width: '100%',
              px: 11,
              mb: 0,
              ml: sidebarOpen ? { xs: 2, sm: 4, md: 6 } : { xs: 1, sm: 3, md: 3 },
              mt: 0,
            }}>
              {suggestionChips.map((label, idx) => (
                <Chip key={idx} label={label} sx={{ bgcolor: '#e8f5e8', fontWeight: 500, fontSize: 15 }} />
              ))}
            </Box>

            {/* Chat Input */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              maxWidth: 900,
              width: '100%',
              px: 3,
              ml: sidebarOpen ? { xs: 2, sm: 4, md: 6 } : { xs: 1, sm: 2, md: 3 }, // Shift right for better alignment
              mt: 2, // Shift input bar down a bit
            }}>
              {/* Mic button outside the input bar */}
              <IconButton
                sx={{
                  width: 44,
                  height: 44,
                  minWidth: 44,
                  minHeight: 44,
                  borderRadius: '50%',
                  backgroundColor: '#00875A',
                  color: 'white',
                  mr: 2,
                  boxShadow: '0 2px 8px rgba(44,62,80,0.04)',
                  '&:hover': { backgroundColor: '#1b5e20' },
                }}
              >
                <MicIcon />
              </IconButton>

              {/* Chat input bar */}
              <Paper
                component="form"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1.3,
                  borderRadius: 999,
                  boxShadow: '0 2px 8px rgba(44,62,80,0.04)',
                  bgcolor: '#e8f5e8',
                  px: 2,
                  py: 0.5,
                }}
                elevation={0}
              >
                {/* Upload/attachment icon */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <IconButton sx={{ color: '#9e9e9e', mr: 1 }} onClick={handleUploadClick}>
                  <AttachFileIcon sx={{ fontSize: 22, transform: 'rotate(40deg)' }} />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1, fontSize: 16 }}
                  placeholder="Send a message"
                  inputProps={{ 'aria-label': 'send a message' }}
                  disabled
                />
                {/* Clock icon in circular button */}
                <IconButton sx={{
                  color: '#9e9e9e',
                  mx: 1,
                  p: 0,
                }}>
                  <HistoryIcon sx={{ fontSize: 20 }} />
                </IconButton>
                {/* Circular send button */}
                <IconButton sx={{
                  color: '#222',
                  ml: 1,
                  p: 0,
                }}>
                  <IoSend size={20} />
                </IconButton>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 