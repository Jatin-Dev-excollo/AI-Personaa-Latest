import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search personas",
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Center section - Search */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          mx: 4,
        }}
      >
        <TextField
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            maxWidth: 900,
            width: "100%",
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
      </Box>
    </Box>
  );
};

export default SearchBar;
