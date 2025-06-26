import React from "react";
import { Box, Chip, IconButton } from "@mui/material";
import { FilterList as FilterIcon } from "@mui/icons-material";
import type { FilterOption } from "../types";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface FilterChipsProps {
  filters: FilterOption[];
  onFilterChange: (filterId: string) => void;
}

const menuOptions = [
  'Marketing',
  'Technology',
  'Sales',
 
];

const FilterChips: React.FC<FilterChipsProps> = ({
  filters,
  onFilterChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
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
                  backgroundColor: "#E8F2ED",
                  color: "#000",
                  borderColor: filter.active ? "#2e7d32" : "#e0e0e0",
                  fontWeight: 500,
                  borderRadius: 2,
                  fontSize: "14px",
                  height: 36,
                  "&:hover": {
                    backgroundColor: "#d4e8d4",
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
            onClick={handleMenuClick}
            aria-controls={open ? 'filter-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <FilterIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 240,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(44,62,80,0.13)',
                maxHeight: 320,
                overflowY: 'auto',
                p: 0.5,
              },
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {menuOptions.map((option, idx) => (
              <MenuItem key={idx} onClick={handleMenuClose} sx={{ fontSize: 20, py: 2, px: 3, borderRadius: 2 }}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterChips;
