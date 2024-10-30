// Specialties.tsx
import { useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, Skeleton, Stack, Typography } from '@mui/material';

const Specialties = ({ specialties, handelFilter }: { specialties: string[]; handelFilter: (type: string, params: string, add?: boolean) => void }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleChange = (speciality: string, checked: boolean) => {
    // Call the handler with the selected speciality and whether it's being added or removed
    handelFilter('specialties', speciality, checked);
  };

  return (
    <Stack>
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={42} />
      ) : (
        <>
          <Typography variant="h5">Specialties</Typography>
          <Box sx={{ pl: 0.5 }}>
            <Stack>
              {['family', 'criminal', 'corporate', 'tax', 'real-estate'].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={specialties.includes(item)} // Check if speciality is already selected
                      onChange={(e) => handleChange(item, e.target.checked)}
                    />
                  }
                  label={item.charAt(0).toUpperCase() + item.slice(1) + " Law"} // Capitalizing for display
                />
              ))}
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default Specialties;
