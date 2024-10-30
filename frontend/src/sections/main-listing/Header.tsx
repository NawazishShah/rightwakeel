// import { Link as RouterLink } from 'react-router-dom';

// material-ui
// import { useTheme } from '@mui/material/styles';
import {
  Box,
  // Button,
  Container,
  // FormControl,
  Grid,
  // InputLabel,
  // MenuItem,
  // Rating,
  // Select,
  // TextField,
  Typography
} from '@mui/material';

// third party
import { motion } from 'framer-motion';
// assets
// import techBootstrap from 'assets/images/landing/tech-bootstrap.svg';
// import techReact from 'assets/images/landing/tech-react.svg'; // Replace this with a relevant image for your platform
// import MainCard from 'components/MainCard';
// import techMui from 'assets/images/landing/tech-mui.svg'; // Replace this with a relevant image for your platform
// import techCodeigniter from 'assets/images/landing/tech-codeigniter.svg'; // Replace this with a relevant image for your platform
// import techNet from 'assets/images/landing/tech-net.svg'; // Replace this with a relevant image for your platform
// import techFigma from 'assets/images/landing/tech-figma.svg'; // Replace this with a relevant image for your platform

// ==============================|| LANDING - HeaderPage ||============================== //

const HeaderPage = () => {
  // const theme = useTheme();

  return (
    <Container sx={{ minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
      <Grid container alignItems="start" justifyContent="center" spacing={0} sx={{ pt: { md: 0, xs: 8 }, pb: { md: 0, xs: 5 } }}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3} sx={{ textAlign: 'center' }}>
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
                  variant="h4"
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
                  <Typography
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
                  </Typography>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Box
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
              <Grid item xs={12}>
                <TextField fullWidth placeholder="Search by Lawyer's Name" variant="outlined" />
              </Grid>
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
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Search Law Area</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="area1">Criminal Law</MenuItem>
                    <MenuItem value="area2">Civil Law</MenuItem>
                    <MenuItem value="area3">Corporate Law</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Search City</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="city1">New York</MenuItem>
                    <MenuItem value="city2">Los Angeles</MenuItem>
                    <MenuItem value="city3">Chicago</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
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
              
                      <Grid item xs={12} sm={2} margin={'auto'}>
                        <Button fullWidth variant="contained" color="primary" sx={{ height: '100%' }}>
                          Search
                        </Button>
                      </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </Box> */}
    </Container>
  );
};
export default HeaderPage;
