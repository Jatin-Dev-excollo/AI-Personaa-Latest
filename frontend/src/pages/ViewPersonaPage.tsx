import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Header from "../components/Header";
import ViewPersonaSidebar from "../components/viewPersona/ViewPersonaSidebar";
import ViewPersonaHeader from "../components/viewPersona/ViewPersonaHeader";
import ViewPersonaTabs from "../components/viewPersona/ViewPersonaTabs";
import ViewPersonaStats from "../components/viewPersona/ViewPersonaStats";
import ViewPersonaSection from "../components/viewPersona/ViewPersonaSection";
import ViewPersonaChips from "../components/viewPersona/ViewPersonaChips";
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';

const mockPersona = {
  id: "1",
  name: "Ethan Carter",
  role: "Head of payment",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  about: `Ethan Carter has  years of expertise in optimizing payment experiences across digital and in-store commerce. He specializes in transaction design, fraud prevention, partner integrations, and scalable payment architecture for B2B and B2C ecosystems.\nHe provides high-impact guidance on cost-efficient transaction flows, modern checkout UX, cross-border payment compliance, and omnichannel integration.`,
  communication: `Ethan's communication style is characterized by clarity, conciseness, and a collaborative approach. He excels at articulating complex ideas in a simple and understandable manner, fostering open dialogue and ensuring all team members are aligned. His approach is both professional and approachable, making him an effective communicator across all levels of the organization.`
};
const mockStats = [
  { label: "Avg. User Rating", value: "4.8/5" },
  { label: "Total Conversations", value: "23.4K" },
  { label: "Success Rate", value: "92%" },
];
const mockExpertise = [
  "Research Collaboration",
  "Fraud & Risk Management",
  "Checkout UX Optimization",
  "Terminal Hardware Advisory",
  "Payment Gateway Evaluation",
  "Regulatory Compliance",
  "Dynamic Routing Strategy",
];
const mockTraits = [
  "Strategic",
  "Decisive",
  "Detail-Oriented",
  "Collaborative",
  "Financially Astute",
];
const mockPainPoints = [
  "Difficulty evaluating multiple PSP/gateway vendors",
  "Lack of clarity on transaction-level costs",
  "Integrating modern payment features into legacy systems",
];
const mockResponsibilities = [
  "Optimize transaction cost efficiency",
  "Design omnichannel payment flows",
  "Ensure regulatory & PCI compliance",
];
const similarPersonas = [
  { id: "2", name: "David Lee", role: "Product Manager", avatar: "https://randomuser.me/api/portraits/men/33.jpg" },
  { id: "3", name: "Emily Carter", role: "Head of Engineering", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: "4", name: "Jessica Davis", role: "CTO", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
];
const mockSampleQuestions = [
  {
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    text: 'How should I explain our fallback transaction mechanism in pitches?'
  },
  {
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    text: "What's the best way to position our QR settlement timelines?"
  },
  {
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    text: 'Can you help validate how we compare to Razorpay on uptime and disputes?'
  },
  {
    img: '',
    text: 'How do I counter merchant objections about T+1 settlements?'
  },
];
const mockExampleInteractions = [
  {
    name: 'Sarah Chen',
    avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
    text: 'A client asked if we offer instant settlement. How flexible are we on that?'
  },
  {
    name: 'Sarah Chen',
    avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
    text: "What's our standard SLA for resolving failed transactions during peak hours?"
  },
];
const mockUpdates = [
  {
    icon: <InsertDriveFileOutlinedIcon sx={{ fontSize: 28, color: '#222' }} />, 
    title: 'Integrated April 2025 Meta Ads update',
    date: 'April 20, 2025',
  },
  {
    icon: <ComputerOutlinedIcon sx={{ fontSize: 28, color: '#222' }} />, 
    title: 'Completed training on new product features',
    date: 'April 15, 2025',
  },
  {
    icon: <StorageOutlinedIcon sx={{ fontSize: 28, color: '#222' }} />, 
    title: 'Updated knowledge base with Q1 2025 data',
    date: 'April 10, 2025',
  },
  {
    icon: <EditOutlinedIcon sx={{ fontSize: 28, color: '#222' }} />, 
    title: "Refreshed persona's tone and style guidelines",
    date: 'April 5, 2025',
  },
  {
    icon: <PublicOutlinedIcon sx={{ fontSize: 28, color: '#222' }} />, 
    title: 'Added support for new languages',
    date: 'March 28, 2025',
  },
];

const ViewPersonaPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      <Header />
      <Container maxWidth={false} sx={{ display: 'flex', pt: 4, pb: 6, maxWidth: 1200 }}>
        <ViewPersonaSidebar personas={similarPersonas} onSelect={() => {}} />
        <Box sx={{ flex: 1, pl: 2 }}>
          <ViewPersonaHeader
            avatar={mockPersona.avatar}
            name={mockPersona.name}
            role={mockPersona.role}
            onStartChat={() => {}}
          />
          <ViewPersonaTabs value={tab} onChange={setTab} />
          {tab === 0 && (
            <>
              <ViewPersonaStats stats={mockStats} />
              <ViewPersonaSection title="About">
                {mockPersona.about.split('\n').map((p, i) => (
                  <Box key={i} sx={{ mb: 1 }}><span>{p}</span></Box>
                ))}
              </ViewPersonaSection>
              <ViewPersonaSection title="Core Expertise">
                <ViewPersonaChips chips={mockExpertise} />
              </ViewPersonaSection>
              <ViewPersonaSection title="Communication Style">
                <span>{mockPersona.communication}</span>
              </ViewPersonaSection>
            </>
          )}
          {tab === 1 && (
            <>
              <ViewPersonaSection title="Traits">
                <ViewPersonaChips chips={mockTraits} />
              </ViewPersonaSection>
              <ViewPersonaSection title="Pain Points">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {mockPainPoints.map((point) => (
                    <Box key={point} sx={{ border: '1.5px solid #e0e0e0', borderRadius: 2, p: 2.2, minWidth: 260, fontWeight: 500, fontSize: 16, color: '#222', bgcolor: '#fff', flex: '1 1 260px' }}>
                      {point}
                    </Box>
                  ))}
                </Box>
              </ViewPersonaSection>
              <ViewPersonaSection title="Key Responsibilities">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {mockResponsibilities.map((resp) => (
                    <Box key={resp} sx={{ border: '1.5px solid #e0e0e0', borderRadius: 2, p: 2.2, minWidth: 260, fontWeight: 500, fontSize: 16, color: '#222', bgcolor: '#fff', flex: '1 1 260px' }}>
                      {resp}
                    </Box>
                  ))}
                </Box>
              </ViewPersonaSection>
            </>
          )}
          {tab === 2 && (
            <>
              <ViewPersonaSection title="Sample Questions">
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3, justifyContent: 'flex-start' }}>
                  {mockSampleQuestions.map((q, i) => (
                    <Box key={i} sx={{ width: 210, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'transparent', boxShadow: 'none', p: 0 }}>
                      <Box sx={{ width: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: '0 2px 8px rgba(44,62,80,0.06)', bgcolor: '#fff', mb: 1 }}>
                        {q.img ? (
                          <Box component="img" src={q.img} alt="sample" sx={{ width: '100%', height: 110, objectFit: 'cover' }} />
                        ) : (
                          <Box sx={{ width: '100%', height: 110, bgcolor: '#111' }} />
                        )}
                      </Box>
                      <Box sx={{ textAlign: 'center', width: '100%' }}>
                        <span style={{ fontWeight: 500, fontSize: 16, color: '#222' }}>{q.text}</span>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </ViewPersonaSection>
              <ViewPersonaSection title="Example Interactions">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {mockExampleInteractions.map((ex, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                      <Box component="img" src={ex.avatar} alt={ex.name} sx={{ width: 46, height: 36, borderRadius: '50%', mt: 0.5 }} />
                      <Box>
                        <Typography sx={{ color: '#219653', fontWeight: 600, fontSize: 15, mb: 0.5 }}>{ex.name}</Typography>
                        <Box sx={{ bgcolor: '#e8f5e8', borderRadius: 2, px: 2, py: 1, fontSize: 16, color: '#222', fontWeight: 500, maxWidth: 420 }}>{ex.text}</Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </ViewPersonaSection>
            </>
          )}
          {tab === 3 && (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 28, color: '#222', mb: 0.5 }}>Latest Updates</Typography>
                <Typography sx={{ color: '#888', fontWeight: 500, fontSize: 16, mb: 2 }}>
                  Stay informed about the latest knowledge enhancements and training events for your AI Persona.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pl: 1, position: 'relative' }}>
                {mockUpdates.map((u, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, position: 'relative' }}>
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      {u.icon}
                      {i < mockUpdates.length - 1 && (
                        <Box sx={{ position: 'absolute', left: '50%', top: 32, width: 2, height: 32, bgcolor: '#e0e0e0', transform: 'translateX(-50%)' }} />
                      )}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#222', mb: 0.2 }}>{u.title}</Typography>
                      <Typography sx={{ color: '#888', fontWeight: 500, fontSize: 16 }}>{u.date}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </>
          )}
          {/* Add other tab content as needed */}
        </Box>
      </Container>
    </Box>
  );
};

export default ViewPersonaPage; 