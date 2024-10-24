// material-ui
import { Button, Container, Grid, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';

import { Judge, Code1, Book, MessageQuestion } from 'iconsax-react';

const Technologies = [
  {
    icon: <Judge size="32" color="#6155B4" />,  // Icon for legal services
    title: 'Comprehensive Legal Services',
    description: 'RightWakeel connects you with experienced lawyers who specialize in a wide range of legal services, ensuring you find the right expertise for your case.',
  },
  {
    icon: <Code1 size="32" color="#6155B4" />,  // Icon for online legal tools
    title: 'Digital Legal Solutions',
    description: 'Our platform provides digital tools to streamline legal processes, making it easier for lawyers and clients to collaborate efficiently online.',
  },
  {
    icon: <Book size="32" color="#6155B4" />,  // Icon for legal resources
    title: 'Extensive Legal Resources',
    description: 'Access a comprehensive library of legal documents, guides, and case studies to support your legal needs and help you navigate complex legal matters.',
  },
  {
    icon: <MessageQuestion size="32" color="#6155B4" />,  // Icon for legal support
    title: 'Dedicated Client Support',
    description: 'RightWakeel offers client support for all legal queries. Whether you need help finding a lawyer or understanding legal documents, we’re here to assist.',
  }
];


// ==============================|| LANDING - ComboPage ||============================== //

const ComboPage = () => {
  return (
    <Container>
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: 3 }}>
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
                  RightWakeel offers a complete suite of tools for developers and designers, making it easier to build and scale your projects.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>

        {/* Cards Section */}
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center">
            {Technologies.map((tech, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
                      <Grid item>{tech.icon}</Grid>
                      <Grid item>
                        <Typography variant="h4">{tech.title}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{tech.description}</Typography>
                      </Grid>
                    </Grid>
                  </MainCard>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Single Button at the end */}
        <Grid item xs={12} sx={{ textAlign: 'center', mt: 5 }}>
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 30,
              delay: 0.6
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                fontWeight: 500,
                bgcolor: 'secondary.light',
                color: 'secondary.darker',
                '&:hover': { color: 'secondary.lighter' }
              }}
              href="/learn-more"
            >
              Learn More About RightWakeel
            </Button>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ComboPage;
