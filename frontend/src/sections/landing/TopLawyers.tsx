import { useState, useEffect } from 'react';
// import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';
import axios from 'axios';
import Slider from 'react-slick'; // New Carousel Library

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar'; // Dummy avatar component
import AvatarPlaceholder from 'assets/images/users/avatar-6.png'; // Default avatar image

// ================================|| SLIDER - ITEMS ||================================ //

const Item = ({ lawyer }: { lawyer: { firstname: string; lastname: string; address: string; speciality: string[] } }) => (
  <MainCard
    sx={{
      // width: { xs: '300px', md: '320px' },
      cursor: 'pointer',
      my: 0.2,
      mx: 1.5
    }}
  >
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      {/* Use dummy avatar */}
      <Stack>
        <Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
          <Avatar alt="Avatar" size="lg" src={AvatarPlaceholder}></Avatar>

          <Grid item>
            <Typography variant="h5">{lawyer.firstname} {lawyer.lastname}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="textSecondary">
              {lawyer.address}
            </Typography>
            {/* <Typography variant="body2" color="primary">
            {lawyer.speciality.map((speciality, index) => (
            <span key={index}>{speciality}</span>
          ))}
            </Typography> */}
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  </MainCard>
);

// ==============================|| LANDING - TopLawyers ||============================== //
const TopLawyers = () => {
  // const theme = useTheme();
  const [lawyers, setLawyers] = useState<any[]>([]); // State to hold lawyer data

  // Fetch lawyers from backend
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lawyers'); // Replace with your actual API endpoint
        setLawyers(response.data); // Assuming the data is an array of lawyers
      } catch (error) {
        console.error('Failed to fetch lawyers:', error);
      }
    };

    fetchLawyers();
  }, []);

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Move slide every 3 seconds
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <>
      <Box sx={{ mt: { md: 15, xs: 2.5 } }}>
        <Container>
          <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 4 }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2
                }}
              >
                <Typography variant="h2">RightWakeel Complete Solutions</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4
                }}
              >
                <Typography>
                  RightWakeel has helped countless individuals find the right legal assistance with ease and confidence. Here’s what some of
                  our clients and lawyers have to say.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ mb: { md: 10, xs: 2.5 } }}>
        <Container>
          <Slider {...settings}>
            {lawyers.map((lawyer, index) => (
              <Item key={index} lawyer={lawyer} />
            ))}
          </Slider>
        </Container>
      </Box>
    </>
  );
};

export default TopLawyers;
