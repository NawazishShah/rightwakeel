// LawyersHeader.tsx
import { useState, ChangeEvent, MouseEvent } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, InputAdornment, Menu, MenuItem, Stack, TextField, useMediaQuery } from '@mui/material';

// project-imports
import SortOptions from './SortOptions';  // Create or modify as needed
import MainCard from 'components/MainCard';

// types
import { LawyerFilter } from 'types/lawyer';

// ==============================|| LAWYERS - HEADER ||============================== //

const LawyersHeader = ({ filter, handleDrawerOpen, setFilter }: { filter: LawyerFilter; handleDrawerOpen: () => void; setFilter: (filter: LawyerFilter) => void; }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  // sort options
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: MouseEvent<HTMLElement>, index: string) => {
    setFilter({ ...filter, sort: index });
    setAnchorEl(null);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const newString = event.target.value;
    setFilter({ ...filter, firstName: newString });
  };

  return (
    <MainCard content={false}>
      <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" justifyContent="space-between" sx={{ p: 2 }} spacing={2}>
        <Stack direction="row" alignItems="center">
          <Button onClick={handleDrawerOpen} color="secondary" size="large">
            Filter
          </Button>
          <TextField
            sx={{ '& .MuiOutlinedInput-input': { pl: 0 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* Add an appropriate search icon */}
                </InputAdornment>
              )
            }}
            value={filter.search}
            placeholder="Search Lawyer"
            size="medium"
            onChange={handleSearch}
          />
        </Stack>

        <Button
          onClick={handleClickListItem}
          variant="outlined"
          size="large"
          color="secondary"
        >
          {/* Sort options label */}
        </Button>

        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          {SortOptions.map((option, index) => (
            <MenuItem key={index} onClick={(event) => handleMenuItemClick(event, option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    </MainCard>
  );
};

export default LawyersHeader;
