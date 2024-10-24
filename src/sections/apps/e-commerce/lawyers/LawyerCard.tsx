import { Link } from 'react-router-dom';
import { Box, Button,  Divider, Typography } from '@mui/material';
import { Rating } from '@mui/material';
import MainCard from 'components/MainCard';
import { Profile, Location,  Star } from 'iconsax-react'; // Import relevant icons
import { Chip } from '@mui/material';

// ==============================|| LAWYER CARD ||============================== //

const LawyerCard = ({
  id,
  firstName,
  lastName,
  address,
  designation,
  specialty,
  degree,
  rating,
  experience
}: {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  designation: string;
  specialty: string;
  degree: string;
  rating: number;
  experience: string;
}) => {
  let specialties: string[] = [];

  console.log('Raw specialty:', designation);  // Log the raw input for debugging

  // Parse specialty with added checks
  if (Array.isArray(specialty) && specialty.length > 0 && typeof specialty[0] === 'string') {
    try {
      // Remove extra single quotes and parse the array within the string
      const cleanedSpecialty = specialty[0].replace(/'/g, '"'); // Replace single quotes with double quotes
      specialties = JSON.parse(cleanedSpecialty); // Parse the cleaned string into an array
    } catch (e) {
      console.error('Error parsing specialties:', e);
    }
  }
  

  console.log('Parsed specialties:', specialties);  // Log the parsed result
  return (
    <MainCard content={false} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        {/* Profile image or icon */}
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            bgcolor: '#f5f5f5'
          }}
        >
          <Profile size="32" variant="Bold" />
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

      <Divider />

      {/* Action Button */}
      <Box sx={{ p: 2 }}>
        <Button component={Link} to={`/lawyer/${id}`} variant="contained" fullWidth>
          View Profile
        </Button>
      </Box>
    </MainCard>
  );
};

export default LawyerCard;
