// LawyerFilter.tsx
import { Grid } from '@mui/material';
import Specialties from './Specialties';
import Locations from './Locations';
import HourlyRate from './HourlyRate';
import RatingFilter from './RatingFilter';
import { LawyerFilter } from 'types/lawyer';



// ==============================|| LAWYER - FILTER ||============================== //
const LawyersFilter = ({
  filter,
  handelFilter
}: {
  filter: LawyerFilter;
  handelFilter: (type: string, params: string) => void; // Update this line
}) => (
  <Grid container direction="column" rowSpacing={3}>
    <Grid item>
      <Specialties specialties={filter.specialties} handelFilter={handelFilter} />
    </Grid>
    <Grid item>
      <Locations locations={filter.locations} handelFilter={handelFilter} />
    </Grid>
    <Grid item>
      <HourlyRate rate={filter.hourlyRate} handelFilter={handelFilter} />
    </Grid>
    <Grid item>
      <RatingFilter rating={filter.rating} handelFilter={handelFilter} />
    </Grid>
  </Grid>
);

export default LawyersFilter;
