// HourlyRate.tsx
import { useEffect, useState } from 'react';
import { Box, Skeleton,  Stack, TextField, Typography } from '@mui/material';

// ==============================|| LAWYER - HOURLY RATE FILTER ||============================== //

const HourlyRate = ({ rate, handelFilter }: { rate: string; handelFilter: (type: string, params: string) => void }) => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = useState<number[]>([0, 500]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSlider = (event: Event, newValue: number[]) => {
    setValue(newValue);
    const data = `${newValue[0]}-${newValue[1]}`;
    handelFilter('rate', data);
  };
  console.log(handleSlider)

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={172} />
      ) : (
        <Stack spacing={1}>
          <Typography variant="h5">Hourly Rate ($)</Typography>
          <Stack direction="row" spacing={2}>
            <Stack spacing={0.5}>
              <Typography color="textSecondary">Min</Typography>
              <TextField
                value={value[0]}
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
            <Stack spacing={0.5}>
              <Typography color="textSecondary">Max</Typography>
              <TextField
                value={value[1]}
                InputProps={{
                  readOnly: true
                }}
              />
            </Stack>
          </Stack>
          <Box sx={{ px: 0.75 }}>
            {/* <Slider min={0} max={1000} value={value} onChange={handleSlider} valueLabelDisplay="auto" /> */}
          </Box>
        </Stack>
      )}
    </>
  );
};

export default HourlyRate;
