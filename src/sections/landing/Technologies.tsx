import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Badge, Button, Container, Grid, Link, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// project imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// assets
import { DocumentDownload, ExportSquare } from 'iconsax-react';
import { Briefcase, ProfileTick, ShieldTick } from 'iconsax-react'; // Adding relevant icons for each feature

// Data array with relevant icons and step numbers
const Technologies = [
  {
    step: 1,
    icon: <Briefcase size={50} />, // Icon for 'Brief Your Case'
    title: 'Brief Your Case',
    description: "Share your case details and requirements with us to receive quick responses.",
    preview: 'https://ableproadmin.com/dashboard/index.html',
    free: 'https://links.codedthemes.com/vYUWM'
  },
  {
    step: 2,
    icon: <ProfileTick size={50} />, // Icon for 'Verified Professionals'
    title: 'Verified Professionals',
    description: 'Get connected with top-tier legal experts who are pre-screened for their quality.',
    preview: 'https://ableproadmin.com/react',
    free: 'https://links.codedthemes.com/vYUWM'
  },
  {
    step: 3,
    icon: <ShieldTick size={50} />, // Icon for 'Confidential & Secure'
    title: 'Confidential & Secure',
    description: 'We prioritize your privacy, sharing your details only with the selected expert.',
    preview: 'https://able-pro.azurewebsites.net/',
    free: 'https://links.codedthemes.com/vYUWM'
  }
];

// ==============================|| LANDING - TechnologiesPage ||============================== //

const TechnologiesPage = () => {
  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ textAlign: 'center', marginBottom: 3 }}>
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
                <Typography variant="h2">How it works</Typography>
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
                  delay: 0.4
                }}
              >
                <Typography>Submit Your Case Inquiry in Minutes.</Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center">
            {Technologies.map((tech, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Badge badgeContent={`Step ${tech.step}`} color="primary" variant="light">
                          {tech.icon} {/* Display the appropriate icon */}
                        </Badge>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4">{tech.title}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{tech.description}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2} justifyContent="flex-start">
                          <Grid item>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="large"
                              startIcon={<ExportSquare />}
                              component={Link}
                              href={tech.preview}
                              target="_blank"
                              sx={{
                                fontWeight: 500,
                                bgcolor: 'secondary.light',
                                color: 'secondary.darker',
                                '&:hover': { color: 'secondary.lighter' }
                              }}
                            >
                              Reference
                            </Button>
                          </Grid>
                          {!(tech.free == null) && (
                            <Grid item>
                              <Link component={RouterLink} to={tech.preview}>
                                <IconButton
                                  size="large"
                                  shape="rounded"
                                  color="secondary"
                                  sx={{
                                    bgcolor: 'secondary.lighter',
                                    color: 'secondary.darker',
                                    '&:hover': { color: 'secondary.lighter', bgcolor: 'secondary.darker' }
                                  }}
                                >
                                  <DocumentDownload />
                                </IconButton>
                              </Link>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </MainCard>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TechnologiesPage;
