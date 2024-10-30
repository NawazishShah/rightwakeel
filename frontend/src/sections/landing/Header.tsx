import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Rating,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';

// third party
import { motion } from 'framer-motion';
// assets
import AnimateButton from 'components/@extended/AnimateButton';
// import techBootstrap from 'assets/images/landing/tech-bootstrap.svg'; 
import punjabLogo from 'assets/images/landing/punjab-bar-council-logo.png'; // Replace this with a relevant image for your platform
// import techReact from 'assets/images/landing/tech-react.svg'; // Replace this with a relevant image for your platform
import MainCard from 'components/MainCard';
import { useState } from 'react';
// import techMui from 'assets/images/landing/tech-mui.svg'; // Replace this with a relevant image for your platform
// import techCodeigniter from 'assets/images/landing/tech-codeigniter.svg'; // Replace this with a relevant image for your platform
// import techNet from 'assets/images/landing/tech-net.svg'; // Replace this with a relevant image for your platform
// import techFigma from 'assets/images/landing/tech-figma.svg'; // Replace this with a relevant image for your platform

// ==============================|| LANDING - HeaderPage ||============================== //

const HeaderPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();


  // States to capture form inputs
  const [lawyerName, setLawyerName] = useState('');
  const [lawArea, setLawArea] = useState('');
  const [city, setCity] = useState('');

  // Handle search logic
  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    // Add the search parameters if they are available
    if (lawyerName) queryParams.append('name', lawyerName);
    if (lawArea) queryParams.append('area', lawArea);
    if (city) queryParams.append('city', city);

    // Navigate to the lawyers page with the query params
    navigate(`/lawyers?${queryParams.toString()}`);
  };

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container alignItems="start" justifyContent="start" spacing={0} sx={{ pt: { md: 0, xs: 8 }, pb: { md: 0, xs: 5 } }}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3} sx={{ textAlign: 'left' }}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '1.825rem', sm: '2rem', md: '3.4375rem' },
                    fontWeight: 700,
                    lineHeight: 1.2
                  }}
                >
                  <span>Empowering </span>
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(90deg, rgb(37, 161, 244), rgb(249, 31, 169), rgb(37, 161, 244)) 0 0 / 400% 100%',
                      color: 'transparent',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      animation: 'move-bg 24s infinite linear',
                      '@keyframes move-bg': {
                        '100%': {
                          backgroundPosition: '400% 0'
                        }
                      }
                    }}
                  >
                    <span>Lawyers</span>
                  </Box>
                  <span> & Clients Worldwide</span>
                </Typography>
              </motion.div>
            </Grid>
            <Grid container justifyContent="center" item xs={12}>
              <Grid item xs={8}>
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
                  {/* <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: 400,
                      lineHeight: { xs: 1.4, md: 1.4 }
                    }}
                  >
                    Our platform connects clients with professional lawyers for seamless legal services. Lawyers can manage their business,
                    consultations, and cases online with ease.
                  </Typography> */}
                </motion.div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
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
                <Grid container spacing={2} justifyContent="start">
                  <Grid item>
                    <AnimateButton>
                      <Button component={RouterLink} to="/services" size="large" color="secondary" variant="outlined">
                        Explore Services
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <AnimateButton>
                      <Button component={RouterLink} to="/signup" target="_blank" size="large" color="primary" variant="contained">
                        Hire a Lawyer
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.6
                }}
              >
                <Grid container spacing={3} justifyContent="start">
                  <Grid
                    item
                    sx={{
                      position: 'relative',
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        height: 30,
                        bottom: 10,
                        left: 'auto',
                        right: '-12px',
                        width: '1px',
                        background: theme.palette.divider
                      }
                    }}
                  >
                    <Rating name="read-only" value={4.7} size="small" readOnly />
                    <Typography variant="h4">
                      4.7/5
                      <span
                        style={{
                          fontSize: '75%',
                          fontWeight: 400,
                          margin: 5,
                          color: theme.palette.text.secondary
                        }}
                      >
                        Ratings
                      </span>
                    </Typography>
                  </Grid>
                  <Grid marginBottom={'80px'} item>
                    <Typography variant="h5">
                      <span
                        style={{
                          fontSize: '75%',
                          fontWeight: 400,
                          color: theme.palette.text.secondary
                        }}
                      >
                        Clients
                      </span>
                    </Typography>
                    <Typography variant="h4">1.2K+</Typography>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MainCard sx={{ padding: '0px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ fontWeight: 600, textAlign: 'center' }}>
                  Search for a verified and professional lawyer!
                </Typography>
              </Grid>

              {/* Search by Lawyer's Name */}
              <Grid item xs={12} sm={8} md={12}>
                <TextField
                  fullWidth
                  placeholder="Search by Lawyer's Name"
                  variant="outlined"
                  value={lawyerName}
                  onChange={(e) => setLawyerName(e.target.value)}
                />
              </Grid>

              {/* Search Law Area Dropdown */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Search Law Area</InputLabel>
                  <Select value={lawArea} onChange={(e) => setLawArea(e.target.value)}>
                    <MenuItem value="Criminal Law">Criminal Law</MenuItem>
                    <MenuItem value="Civil Law">Civil Law</MenuItem>
                    <MenuItem value="Corporate Law">Corporate Law</MenuItem>
                    {/* Add other law areas */}
                  </Select>
                </FormControl>
              </Grid>

              {/* Search City Dropdown */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Search City</InputLabel>
                  <Select value={city} onChange={(e) => setCity(e.target.value)}>
                    <MenuItem value="New York">New York</MenuItem>
                    <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                    <MenuItem value="Chicago">Chicago</MenuItem>
                    {/* Add more cities */}
                  </Select>
                </FormControl>
              </Grid>

              {/* Search Button */}
              <Grid item xs={12} sm={2} margin={'auto'}>
                <Button fullWidth variant="contained" color="primary" onClick={handleSearch}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          bottom: { xs: -30, sm: 0 },
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{
            '& > .MuiGrid-item': {
              borderRight: `1px solid ${theme.palette.divider}`,
              '&:first-of-type': {
                borderLeft: `1px solid ${theme.palette.divider}`
              },
              '& img': {
                padding: 1.3
              }
            }
          }}
        >
          <Grid item>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 0.8
              }}
            >
              <Tooltip title="Explore Our Services">
                <Link component={Link} href="/services" target="_blank">
                  <CardMedia component="img" image={punjabLogo} sx={{ width: 'auto', maxHeight: '100px' }} /> {/* Replace with a relevant legal image */}
                </Link>
              </Tooltip>
            </motion.div>
          </Grid>
          <Grid item>
            <motion.div
              initial={{ opacity: 0, translateY: 550 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 0.9
              }}
            >
              <Tooltip title="Hire a Lawyer">
                <Link component={Link} href="/signup" target="_blank">
                  <CardMedia component="img" image={punjabLogo} sx={{ width: 'auto', maxHeight: '100px'  }} /> {/* Replace with a relevant legal image */}
                </Link>
              </Tooltip>
            </motion.div>
          </Grid>
          {/* Add more relevant sections as needed */}
        </Grid>
      </Box>
    </Container>
  );
};
export default HeaderPage;
