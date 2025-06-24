import React from "react";
import { Box, Chip, IconButton } from "@mui/material";
import { FilterList as FilterIcon } from "@mui/icons-material";
import type { FilterOption } from "../types";

interface FilterChipsProps {
  filters: FilterOption[];
  onFilterChange: (filterId: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          mx: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 900,
            width: "100%",
          }}
        >
          {/* Left side - Filter Chips */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {filters.map((filter) => (
              <Chip
                key={filter.value}
                label={filter.label}
                onClick={() => onFilterChange(filter.value)}
                variant={filter.active ? "filled" : "outlined"}
                sx={{
                  backgroundColor: "#e8f5e8",
                  color: "#000",
                  borderColor: filter.active ? "#2e7d32" : "#e0e0e0",
                  fontWeight: 500,
                  borderRadius: 2,
                  fontSize: "14px",
                  height: 36,
                  "&:hover": {
                    backgroundColor: filter.active ? "#d4e8d4" : "#f5f5f5",
                    borderColor: "#2e7d32",
                  },
                  "& .MuiChip-label": {
                    px: 1.5,
                  },
                }}
              />
            ))}
          </Box>

          {/* Right side - Filter Icon */}
          <IconButton
            sx={{
              color: "#2e7d32",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <FilterIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterChips;
