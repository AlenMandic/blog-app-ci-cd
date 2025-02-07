import React from 'react';
import { Box, FormControl, Select, MenuItem, Typography } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

export default function BasicSelect({ sorting, setSorting }) {
  const handleChange = (event) => {
    setSorting(event.target.value);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: 2,
      maxWidth: '300px',
    }}>
      <SortIcon color="primary" />
      <Typography variant="body1" sx={{ fontWeight: 'medium', minWidth: 'fit-content' }}>
        Sort by:
      </Typography>
      <FormControl fullWidth size="small">
        <Select
          value={sorting}
          onChange={handleChange}
          displayEmpty
          sx={{
            '& .MuiSelect-select': {
              py: 1,
              pl: 2,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.dark',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          }}
        >
          <MenuItem value={'Default'}>Default</MenuItem>
          <MenuItem value={'Likes'}>Most Liked</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}