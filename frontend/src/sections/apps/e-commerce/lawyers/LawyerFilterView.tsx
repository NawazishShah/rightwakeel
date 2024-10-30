// LawyerFilterView.tsx
import { IconButton } from '@mui/material';
import { Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { LawyerFilter } from 'types/lawyer';

// ==============================|| LAWYER - FILTER VIEW ||============================== //

interface LawyerFilterViewProps {
  filter: LawyerFilter;
  initialState: LawyerFilter;
  filterIsEqual: (initialState: LawyerFilter, filter: LawyerFilter) => boolean;
  handelFilter: (type: string, params: string, rating?: number) => void;
}

const LawyerFilterView = ({ filter, filterIsEqual, handelFilter, initialState }: LawyerFilterViewProps) => {
  //   const matchDownMD = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

  return (
    <>
      {!filterIsEqual(initialState, filter) && (
        <Stack spacing={2}>
          <Typography variant="h5">Active Filters</Typography>
          {filter.specialties.length > 0 && (
            <Grid item>
              <Stack direction="row" alignItems="center" sx={{ ml: '-10px' }}>
                <Chip label={`Specialties: ${filter.specialties.join(', ')}`} />
               <IconButton onClick={() => handelFilter('specialties', '', undefined)}> {/* Call the handler with undefined to remove all specialties */}</IconButton>

              </Stack>
            </Grid>
          )}
          {filter.locations.length > 0 && (
            <Grid item>
              <Stack direction="row" alignItems="center" sx={{ ml: '-10px' }}>
                <Chip label={`Locations: ${filter.locations.join(', ')}`} />
                <IconButton onClick={() => handelFilter('locations', '')}>{/* Close Icon here */}</IconButton>
              </Stack>
            </Grid>
          )}
          {filter.hourlyRate && ( // Change from rate to hourlyRate
            <Grid item>
              <Stack direction="row" alignItems="center" sx={{ ml: '-10px' }}>
                <Chip label={`Hourly Rate: ${filter.hourlyRate}`} />
                <IconButton onClick={() => handelFilter('hourlyRate', '')}>{/* Close Icon here */}</IconButton>
              </Stack>
            </Grid>
          )}

          {filter.rating > 0 && (
            <Grid item>
              <Stack direction="row" alignItems="center" sx={{ ml: '-10px' }}>
                <Chip label={`Rating: ${filter.rating}`} />
                <IconButton onClick={() => handelFilter('rating', '', 0)}>{/* Close Icon here */}</IconButton>
              </Stack>
            </Grid>
          )}
          <Grid item>
            <Button variant="text" color="primary" onClick={() => handelFilter('reset', '')}>
              Reset all filters
            </Button>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default LawyerFilterView;
