// SkeletonLawyerPlaceholder.tsx
import { CardContent, Grid, Skeleton, Stack } from '@mui/material';
import MainCard from 'components/MainCard';

// ===========================|| SKELETON - LAWYER CARD ||=========================== //

const SkeletonLawyerPlaceholder = () => (
  <MainCard content={false}>
    <Skeleton variant="rectangular" height={220} />
    <CardContent sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Skeleton variant="text" height={30} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="text" height={20} />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <Skeleton variant="text" height={25} width={100} />
          </Stack>
        </Grid>
      </Grid>
    </CardContent>
  </MainCard>
);

export default SkeletonLawyerPlaceholder;
