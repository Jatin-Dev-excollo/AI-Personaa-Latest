import React, { useRef, useState, useEffect } from "react";
import { Box, Avatar, Typography, IconButton, Chip, InputBase, Paper, ClickAwayListener, useTheme, useMediaQuery } from "@mui/material";
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
import { useParams } from "react-router-dom";

interface ChatPageProps {
  onBack: () => void;
}

export default function ChatPage({ onBack }: ChatPageProps) {
  const { id } = useParams();
  const persona = mockPersonas.find(p => p.id === id);
  if (!persona) {
    return <div>Persona not found</div>;
  }
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai', text: string }[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const messageListRef = useRef<HTMLDivElement>(null);

  // Get user avatar from localStorage
  let userAvatar = '';
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    userAvatar = user.avatar || '';
  } catch {}

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  // Handler to open sidebar from header
  const handleMenuClick = () => setSidebarOpen(true);
  // Handler to close sidebar
  const handleSidebarClose = () => setSidebarOpen(false);
  const SIDEBAR_WIDTH = isMobile ? 280 : 160;

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
    // Instead of updating local state, navigate to the new persona's chat route
    window.location.href = `/chat/${p.id}`;
    handleSwitcherClose();
  };

  // Handle sending a message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = messageInput.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setMessageInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'ai', text: "This is a sample response from your AI Persona." }]);
    }, 800);
  };

  // Dynamic suggestion chips based on persona department
  const getSuggestionChips = (department: string) => {
    switch (department) {
      case 'Tech':
        return [
          'Ask about QR transaction flows',
          'Get merchant risk metrics',
          'Clarify settlement SLA',
        ];
      case 'Marketing':
        return [
          'Request latest campaign stats',
          'Ask for competitor analysis',
          'Get social media insights',
        ];
      case 'Sales':
        return [
          'Ask for sales pipeline update',
          'Request lead conversion rates',
          'Get monthly sales summary',
        ];
      default:
        return [
          'Ask a question',
          'Request a report',
          'Get latest updates',
        ];
    }
  };
  const suggestionChips = React.useMemo(() => getSuggestionChips(persona.department), [persona]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box sx={{ 
      height: '100vh', 
      bgcolor: '#fff', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden', // Prevent page-level scroll
      width: '100vw', // Ensure no horizontal scroll
      maxWidth: '100vw',
    }}>
      {/* Full-width ChatHeader at the top */}
      <ChatHeader onBack={onBack} onMenu={handleMenuClick} isSidebarOpen={sidebarOpen} backIcon={<ChevronLeftIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: '#012A1F' }} />} />
      
      {/* Content area with sidebar and main chat */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        flex: 1,
        overflow: 'hidden', // Contain the scrolling areas
        width: '100%',
        maxWidth: '100vw',
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
            width: '100%',
            maxWidth: '100vw',
            overflow: 'hidden',
          }}
        >
          {/* Persona Profile - always visible at the top */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            cursor: 'pointer', 
            mb: { xs: 2, sm: 3 },
            px: { xs: 2, sm: 0 },
            pt: { xs: 2, sm: 3 },
            pb: { xs: 1, sm: 2 },
            zIndex: 2,
            background: '#fff',
          }} onClick={handleProfileClick}>
            <Avatar 
              src={persona.avatar} 
              sx={{ 
                width: { xs: 80, sm: 96 }, 
                height: { xs: 80, sm: 96 }, 
                mb: { xs: 1.5, sm: 2 } 
              }} 
            />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600, 
                color: '#222', 
                mb: 0.5,
                fontSize: { xs: "20px", sm: "24px" },
                textAlign: "center"
              }}
            >
              {persona.name}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              mb: 0,
              flexDirection: { xs: "column", sm: "row" }
            }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: '#2e7d32', 
                  fontWeight: 400, 
                  fontSize: { xs: 16, sm: 18 },
                  textAlign: "center"
                }}
              >
                {persona.role}
              </Typography>
              <AutorenewIcon sx={{ color: '#2e7d32', fontSize: { xs: 16, sm: 18 } }} />
            </Box>
          </Box>
          {/* Scrollable message list fills the rest of the space */}
          <Box ref={messageListRef} sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '100vw',
            mx: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            pb: { xs: 2, sm: 4 },
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari, Opera
            minHeight: 0,
          }}>
            {/* Message list */}
            <Box sx={{ 
              width: '100%', 
              maxWidth: { xs: "100%", sm: 900 }, 
              mx: 'auto', 
              mb: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              px: { xs: 2, sm: 0 },
              overflow: 'visible',
            }}>
              {messages.map((msg, idx) => (
                msg.sender === 'ai' ? (
                  <Box key={idx} sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 2 }}>
                      <Avatar sx={{ width: 48, height: 48 }}>
                        <img src={persona.avatar} alt="AI" style={{ width: 48, height: 48, borderRadius: '50%' }} />
                      </Avatar>
                      <Box>
                        <Box sx={{ color: '#52946B', fontWeight: 600, fontSize: 20, mb: 1, fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif' }}>{persona.name}</Box>
                        <Box sx={{
                          bgcolor: '#F0F5F2',
                          color: '#17212c',
                          px: { xs: 3, sm: 4 },
                          py: { xs: 2.5, sm: 3 },
                          borderRadius: 3,
                          fontSize: 22,
                          fontWeight: 500,
                          maxWidth: { xs: '100%', sm: 800 },
                          wordBreak: 'break-word',
                          boxShadow: 'none',
                          lineHeight: 1.35,
                          fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
                        }}>{msg.text}</Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box key={idx} sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mb: 2, mr: { xs: 0, sm: 4 } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-end', gap: 1.5 }}>
                      <Avatar sx={{ width: 40, height: 40, ml: 1 }}>
                        {userAvatar ? <img src={userAvatar} alt="User" style={{ width: 40, height: 40, borderRadius: '50%' }} /> : 'U'}
                      </Avatar>
                      <Box sx={{
                        bgcolor: '#00875A',
                        color: '#fff',
                        px: { xs: 2.5, sm: 3 },
                        py: { xs: 2, sm: 2.5 },
                        borderRadius: 3,
                        fontSize: { xs: 16, sm: 18 },
                        fontWeight: 500,
                        maxWidth: { xs: '100%', sm: 700 },
                        wordBreak: 'break-word',
                        boxShadow: '0 2px 8px rgba(44,62,80,0.04)',
                        lineHeight: 1.2,
                        fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
                      }}>{msg.text}</Box>
                    </Box>
                  </Box>
                )
              ))}
            </Box>
            {/* Persona Switcher Popup */}
            {switcherOpen && anchorEl && (
              <ClickAwayListener onClickAway={handleSwitcherClose}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 140, sm: 160 },
                    left: { xs: '50%', sm: 'calc(50% + 100px)' },
                    transform: { xs: 'translateX(-50%)', sm: 'none' },
                    bgcolor: '#fafbfa',
                    borderRadius: 2,
                    boxShadow: '0 2px 8px 0 rgba(44,62,80,0.10)',
                    p: { xs: 1, sm: 1.1 },
                    minWidth: { xs: 200, sm: 160 },
                    zIndex: 30,
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#888', fontWeight: 600, mb: 1, fontSize: { xs: 14, sm: 15 } }}>
                    Switch Persona
                  </Typography>
                  {mockPersonas.filter(p => p.id !== persona.id).slice(0, 3).map((p) => (
                    <Box key={p.id} sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 1, 
                      cursor: 'pointer', 
                      pl: { xs: 1.5, sm: 2 }, 
                      '&:hover': { background: '#f5f5f5', borderRadius: 1 } 
                    }} onClick={() => handlePersonaSelect(p)}>
                      <Avatar src={p.avatar} sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 }, mr: 1 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: { xs: 12, sm: 13 }, color: '#222' }}>{p.name}</Typography>
                        <Typography sx={{ color: '#388e3c', fontWeight: 400, fontSize: { xs: 10, sm: 11 } }}>{p.role}</Typography>
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
            pb: { xs: 2, sm: 4 },
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 20%)',
          }}>
            {/* Suggestion Chips */}
            <Box sx={{
              display: 'flex',
              gap: { xs: 1, sm: 2 },
              maxWidth: sidebarOpen ? { xs: '100%', sm: `calc(1200px - ${SIDEBAR_WIDTH}px)` } : { xs: '100%', sm: 1200 },
              width: '100%',
              pl: { xs: 6, sm: 12 },
              pr: { xs: 2, sm: 3 },
              mb: 0,
              mt: 0,
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}>
              {suggestionChips.map((label, idx) => (
                <Chip 
                  key={idx} 
                  label={label} 
                  sx={{ 
                    bgcolor: '#e8f5e8', 
                    fontWeight: 500, 
                    fontSize: { xs: 13, sm: 15 },
                    height: { xs: 32, sm: 36 },
                    mb: { xs: 1, sm: 0 }
                  }} 
                />
              ))}
            </Box>

            {/* Chat Input */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              maxWidth: sidebarOpen ? { xs: '100%', sm: `calc(1200px - ${SIDEBAR_WIDTH}px)` } : { xs: '100%', sm: 1200 },
              width: '100%',
              px: { xs: 2, sm: 3 },
              mt: { xs: 1, sm: 2 },
            }}>
              {/* Mic button outside the input bar */}
              <IconButton
                sx={{
                  width: { xs: 40, sm: 44 },
                  height: { xs: 40, sm: 44 },
                  minWidth: { xs: 40, sm: 44 },
                  minHeight: { xs: 40, sm: 44 },
                  borderRadius: '50%',
                  backgroundColor: '#00875A',
                  color: 'white',
                  mr: { xs: 1.5, sm: 2 },
                  boxShadow: '0 2px 8px rgba(44,62,80,0.04)',
                  '&:hover': { backgroundColor: '#1b5e20' },
                }}
              >
                <MicIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </IconButton>

              {/* Chat input bar */}
              <Paper
                component="form"
                onSubmit={handleSendMessage}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1.3,
                  borderRadius: 999,
                  boxShadow: '0 2px 8px rgba(44,62,80,0.04)',
                  bgcolor: '#e8f5e8',
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 0.5, sm: 0.5 },
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
                  <AttachFileIcon sx={{ fontSize: { xs: 20, sm: 22 }, transform: 'rotate(40deg)' }} />
                </IconButton>
                <InputBase
                  sx={{ 
                    ml: 1, 
                    flex: 1, 
                    fontSize: { xs: 14, sm: 16 },
                    '& input': {
                      fontSize: { xs: 14, sm: 16 },
                    }
                  }}
                  placeholder="Send a message"
                  inputProps={{ 'aria-label': 'send a message' }}
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  autoFocus
                />
                {/* Clock icon in circular button */}
                <IconButton sx={{
                  color: '#9e9e9e',
                  mx: 1,
                  p: 0,
                }}>
                  <HistoryIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                </IconButton>
                {/* Circular send button */}
                <IconButton sx={{
                  color: '#222',
                  ml: 1,
                  p: 0,
                }} onClick={() => handleSendMessage()}>
                  <IoSend size={isMobile ? 18 : 20} />
                </IconButton>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 