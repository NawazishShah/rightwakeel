import { Link } from 'react-router-dom';
import { Box, Button, Divider, Typography } from '@mui/material';
import { Rating } from '@mui/material';
import MainCard from 'components/MainCard';
import { Location, Star } from 'iconsax-react'; // Import relevant icons
import { Chip } from '@mui/material';
import Avatar from 'components/@extended/Avatar';

// ==============================|| LAWYER CARD ||============================== //

const LawyerCard = ({
  id,
  avatar,
  firstName,
  lastName,
  address,
  designation,
  speciality,
  degree,
  rating,
  experience
}: {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  address: string;
  designation: string;
  speciality: string;
  degree: string;
  rating: number;
  experience: string;
}) => {
  let specialties: string[] = [];

  console.log('Raw speciality:', designation); // Log the raw input for debugging

  // Parse speciality with added checks
  if (Array.isArray(speciality) && speciality.length > 0 && typeof speciality[0] === 'string') {
    try {
      // Remove extra single quotes and parse the array within the string
      const cleanedspeciality = speciality[0].replace(/'/g, '"'); // Replace single quotes with double quotes
      specialties = JSON.parse(cleanedspeciality); // Parse the cleaned string into an array
    } catch (e) {
      console.error('Error parsing specialties:', e);
    }
  }

  console.log('Parsed specialties:', specialties); // Log the parsed result
  return (
    <MainCard content={false} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
  {/* Profile image or icon */}
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      mr: 2,
    }}
  >
    <Box
      sx={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        marginRight: 2,
      }}
    >
      <Avatar alt="Avatar" src={`http://localhost:5000${avatar}`} sx={{ width: 64, height: 64 }} />
    </Box>

    {/* Lawyer Information */}
    <Box>
      <Typography variant="h5" component={Link} to={`/lawyers/${id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
        {firstName} {lastName}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {designation}
      </Typography>
    </Box>
  </Box>

  {/* Button aligned to the right */}
  <Box sx={{ p: 2 }}>
    <Button component={Link} to={`/lawyer/${id}`} variant="contained" fullWidth>
      View Profile
    </Button>
  </Box>
</Box>


      <Divider />

      {/* Details Section */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Star size="20" variant="Bold" />
          <Rating name="read-only" value={rating} readOnly sx={{ ml: 1 }} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {rating.toFixed(1)} / 5
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Location size="20" variant="Bold" />
          <Typography variant="body2" sx={{ ml: 1 }} color="textSecondary">
            {address}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {/* <Graduation size="20" variant="Bold" /> */}
          <Typography variant="body2" sx={{ ml: 1 }} color="textSecondary">
            {degree}
          </Typography>
        </Box>

        {specialties.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
            {specialties.map((spec, index) => (
              <Chip key={index} label={spec} variant="outlined" color="primary" />
            ))}
          </Box>
        )}

        <Typography variant="body2" color="textSecondary">
          Experience: {experience}
        </Typography>
      </Box>

    </MainCard>
  );
};

export default LawyerCard;
