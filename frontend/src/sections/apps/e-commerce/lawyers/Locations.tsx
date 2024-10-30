// Locations.tsx
import { useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, Skeleton, Stack, Typography } from '@mui/material';

// ==============================|| LAWYER - LOCATIONS FILTER ||============================== //

const Locations = ({ locations, handelFilter }: { locations: string[]; handelFilter: (type: string, params: string) => void }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Stack>
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={96} />
      ) : (
        <>
          <Typography variant="h5">Locations</Typography>
          <Box sx={{ pl: 0.5 }}>
            <Stack>
              <FormControlLabel
                control={<Checkbox checked={locations.some((item) => item === 'new-york')} />}
                onChange={() => handelFilter('locations', 'new-york')}
                label="New York"
              />
              <FormControlLabel
                control={<Checkbox checked={locations.some((item) => item === 'los-angeles')} />}
                onChange={() => handelFilter('locations', 'los-angeles')}
                label="Los Angeles"
              />
              <FormControlLabel
                control={<Checkbox checked={locations.some((item) => item === 'chicago')} />}
                onChange={() => handelFilter('locations', 'chicago')}
                label="Chicago"
              />
              <FormControlLabel
                control={<Checkbox checked={locations.some((item) => item === 'miami')} />}
                onChange={() => handelFilter('locations', 'miami')}
                label="Miami"
              />
              {/* Add more locations as needed */}
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default Locations;
