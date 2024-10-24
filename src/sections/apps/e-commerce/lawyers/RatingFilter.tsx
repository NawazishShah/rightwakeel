// RatingFilter.tsx
import { useEffect, useState } from 'react';
import { Stack, Typography, Rating } from '@mui/material';
import { Skeleton } from '@mui/material';

// ==============================|| LAWYER - RATING FILTER ||============================== //

const RatingFilter = ({
  rating,
  handelFilter
}: {
  rating: number;
  handelFilter: (type: string, params: string, rating: number) => void;
}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={172} />
      ) : (
        <Stack spacing={1}>
          <Typography variant="h5">Rating</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating
              precision={0.5}
              name="rating-controlled"
              value={rating}
              onChange={(event, newValue) => handelFilter('rating', '', newValue!)}
            />
            <Typography component="legend">({rating})</Typography>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default RatingFilter;
