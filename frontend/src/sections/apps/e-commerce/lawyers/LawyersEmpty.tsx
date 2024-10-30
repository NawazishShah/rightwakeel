// LawyersEmpty.tsx
import { Box, Button, Typography, CardMedia, Grid, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import { ArrowRight2 } from 'iconsax-react';
import imageEmpty from 'assets/images/e-commerce/empty.png';

interface LawyersEmptyProps {
  handleFilter: () => void;
}

const LawyersEmpty = ({ handleFilter }: LawyersEmptyProps) => {
  return (
    <MainCard content={false}>
      <Grid container alignItems="center" justifyContent="center" spacing={3} sx={{ my: 3 }}>
        <Grid item>
          <CardMedia component="img" image={imageEmpty} title="No Lawyers Found" sx={{ width: 240 }} />
        </Grid>
        <Grid item>
          <Stack spacing={0.5}>
            <Typography variant="h1" color="inherit">No Lawyers Found</Typography>
            <Typography variant="h5" color="textSecondary">Try adjusting your filters</Typography>
            <Box sx={{ pt: 3 }}>
              <Button variant="contained" size="large" color="error" endIcon={<ArrowRight2 />} onClick={handleFilter}>
                Reset Filter
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default LawyersEmpty;
