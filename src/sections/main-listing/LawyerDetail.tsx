import { RootState } from 'store'; // Import RootState from your store
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Loader';
import { getLawyerById } from 'store/reducers/lawyer';

// Material-UI Components
import { Container,  Typography, Divider, Box, Button, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

// Icons
// import { LocationOn, School, Work, AttachMoney } from '@mui/icons-material';

const LawyerDetail = () => {
  const { id } = useParams(); // Get the id from the URL
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);

  // Fetching data and loading state, using RootState for type safety
  const lawyer = useSelector((state: RootState) => state.lawyer.lawyer);
  const loading = useSelector((state: RootState) => state.lawyer.loading);
  const error = useSelector((state: RootState) => state.lawyer.error);

  useEffect(() => {
    if (id) {
      dispatch(getLawyerById(id) as any); // Dispatch action to get lawyer by ID
    }
  }, [dispatch, id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Loading spinner
  if (loading) return <Loader />;
  if (!lawyer) {
    return <Typography>No lawyer found with this ID.</Typography>;
  }

  // Error handling
  if (error) {
    const errorMessage = typeof error === 'string' 
      ? error 
      : (error as { message?: string }).message || 'Unknown error';
    return <Typography>Error fetching lawyer details: {errorMessage}</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: '90px' }}>
      {/* Lawyer Basic Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">
          {lawyer.firstname} {lawyer.lastname}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {lawyer.designation}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          {/* <LocationOn color="primary" sx={{ mr: 1 }} /> */}
          <Typography variant="body1">{lawyer.location}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          {/* <School color="primary" sx={{ mr: 1 }} /> */}
          <Typography variant="body1">{lawyer.degree}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          {/* <Work color="primary" sx={{ mr: 1 }} /> */}
          <Typography variant="body1">{lawyer.specialty}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          {/* <AttachMoney color="primary" sx={{ mr: 1 }} /> */}
          <Typography variant="body1">Hourly Rate: {lawyer.hourlyRate}</Typography>
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 3 }} />

      {/* Tabs for Lawyer Sections */}
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Overview" />
        <Tab label="Practice Portfolio" />
        <Tab label="Education" />
        <Tab label="Reviews" />
        <Tab label="Appointments" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {tabValue === 0 && (
          <Typography variant="body1">
            {/* {lawyer.overview || 'Overview information about the lawyer will be displayed here.'} */}
          </Typography>
        )}
        {tabValue === 1 && (
          <Typography variant="body1">
            {/* {lawyer.practicePortfolio || 'The lawyer’s practice portfolio will be displayed here.'} */}
          </Typography>
        )}
        {tabValue === 2 && (
          <Typography variant="body1">
            {/* {lawyer.education || 'Educational qualifications of the lawyer will be displayed here.'} */}
          </Typography>
        )}
        {tabValue === 3 && (
          <Typography variant="body1">
            {/* {lawyer.reviews || 'Client reviews and ratings will be displayed here.'} */}
          </Typography>
        )}
        {tabValue === 4 && (
          <Button variant="contained" color="primary">
            Book an Appointment
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default LawyerDetail;
