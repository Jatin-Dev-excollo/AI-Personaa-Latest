import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
  maxWidth?: number | string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search personas",
  fullWidth = false,
  maxWidth,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Center section - Search */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...(fullWidth
            ? { width: '100%', mx: 0, flex: 'unset' }
            : { flex: 1, mx: 5 }),
        }}
      >
        <TextField
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            maxWidth: maxWidth !== undefined ? maxWidth : (fullWidth ? 1500 : 1000),
            width: "100%",
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
      </Box>
    </Box>
  );
};

export default SearchBar;
