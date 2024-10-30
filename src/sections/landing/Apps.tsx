import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { TickCircle } from 'iconsax-react'; // Importing from iconsax-react

// project-imports
import FadeInWhenVisible from './Animation';

const BenefitsContent = [
  {
    title: 'Benefits for Clients',
    points: [
      'Receive step-by-step updates on your legal case.',
      'Enjoy complete confidentiality: your trust, our promise.',
      'Register, browse, and send direct inquiries to professionals, or open general inquiries if needed.',
      'Securely connect with your lawyer via in-app messaging and video calls.'
    ],
    buttonText: 'Learn More'
  },
  {
    title: 'Benefits for Lawyers',
    points: [
      'Secure, confidential connections with clients.',
      'Share key updates like case reports, images, and videos with ease.',
      'Boost visibility through searches by location, law speciality, experience, and more.',
      'Be accessible to clients anytime and anywhere they need you.'
    ],
    buttonText: 'Get Started'
  }
];

const AppsPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: theme.palette.primary.main }}>
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ pt: { md: 10, xs: 2.5 }, pb: { md: 10, xs: 2.5 } }}>
          {/* Heading and Subheading */}
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
              <Grid item xs={12}>
                <Typography variant="h2" color="white">
                  Benefits Overview
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography color="white">
                  Discover the key advantages tailored for both clients and lawyers.
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Cards */}
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="center">
              {BenefitsContent.map((benefit, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <FadeInWhenVisible>
                    <Box
                      sx={{
                        padding: 4,
                        borderRadius: 1.5,
                        background: theme.palette.secondary.lighter + 20,
                        boxShadow: theme.customShadows.z1
                      }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h4" color="white">
                            {benefit.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <List>
                            {benefit.points.map((point, i) => (
                              <ListItem key={i} sx={{ paddingLeft: 0 }}>
                                <ListItemIcon>
                                  <TickCircle size="20" variant="Bold" color="#FFFFFF" /> {/* Make icon white */}
                                </ListItemIcon>
                                <ListItemText primary={point} primaryTypographyProps={{ color: 'white' }} />
                              </ListItem>
                            ))}
                          </List>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ borderRadius: 2, paddingX: 4 }}
                          >
                            {benefit.buttonText}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </FadeInWhenVisible>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AppsPage;
