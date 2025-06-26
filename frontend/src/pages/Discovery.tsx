import React, { useState, useMemo } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
} from "@mui/material";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips";
import PersonaGrid from "../components/PersonaGrid";
import Pagination from "../components/Pagination";
import { mockPersonas, mockFilters } from "../data/mockData";
import type { Persona, FilterOption } from "../types";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
      light: "#e8f5e8",
      dark: "#1b5e20",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

interface DiscoveryProps {
  onStartChat: (persona: Persona) => void;
}

const Discovery: React.FC<DiscoveryProps> = ({ onStartChat }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOption[]>(mockFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter logic
  const filteredPersonas = useMemo(() => {
    let filtered = mockPersonas;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (persona) =>
          persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          persona.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply department filter
    const activeFilters = filters.filter((f) => f.active).map((f) => f.value);
    if (activeFilters.length > 0) {
      filtered = filtered.filter((persona) =>
        activeFilters.includes(persona.department)
      );
    }

    return filtered;
  }, [searchTerm, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPersonas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPersonas = filteredPersonas.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Event handlers
  const handleFilterChange = (filterId: string) => {
    setFilters((prev) =>
      prev.map((filter) =>
        filter.value === filterId
          ? { ...filter, active: !filter.active }
          : filter
      )
    );
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
        <Header />

        <Container sx={{ py: 4 }}>
          {/* Search Section */}
          <SearchBar value={searchTerm} onChange={handleSearchChange} maxWidth={900} />

          {/* Filter Section */}
          <FilterChips filters={filters} onFilterChange={handleFilterChange} />

          {/* Personas Grid */}
          <PersonaGrid
            personas={paginatedPersonas}
            onStartChat={onStartChat}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Discovery;
