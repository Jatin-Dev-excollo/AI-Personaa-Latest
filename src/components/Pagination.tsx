import React from "react";
import { Box, IconButton, Button } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          variant={currentPage === i ? "contained" : "text"}
          sx={{
            minWidth: 40,
            height: 40,
            borderRadius: 1,
            mx: 0.5,
            backgroundColor: currentPage === i ? "#2e7d32" : "transparent",
            color: currentPage === i ? "white" : "#666",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: currentPage === i ? "#1b5e20" : "#f5f5f5",
            },
          }}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <Box sx={{ mt: 6, mb: 4 }}>
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
            justifyContent: "center",
            alignItems: "center",
            maxWidth: 900,
            width: "100%",
          }}
        >
          <IconButton
            onClick={handlePrevious}
            disabled={currentPage === 1}
            sx={{
              mr: 1,
              color: currentPage === 1 ? "#ccc" : "#666",
              "&:hover": {
                backgroundColor: currentPage === 1 ? "transparent" : "#f5f5f5",
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {renderPageNumbers()}

          <IconButton
            onClick={handleNext}
            disabled={currentPage === totalPages}
            sx={{
              ml: 1,
              color: currentPage === totalPages ? "#ccc" : "#666",
              "&:hover": {
                backgroundColor:
                  currentPage === totalPages ? "transparent" : "#f5f5f5",
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Pagination;
