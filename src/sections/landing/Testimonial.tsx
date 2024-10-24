import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';

// third party
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
// assets
import Avatar from 'components/@extended/Avatar';
import Avatar1 from 'assets/images/users/avatar-6.png';
import Avatar2 from 'assets/images/users/avatar-1.png';
import Avatar3 from 'assets/images/users/avatar-2.png';
import Avatar4 from 'assets/images/users/avatar-3.png';
import Avatar5 from 'assets/images/users/avatar-4.png';
import Avatar6 from 'assets/images/users/avatar-5.png';
import Avatar7 from 'assets/images/users/avatar-7.png';
import Avatar8 from 'assets/images/users/avatar-8.png';

// ================================|| SLIDER - ITEMS ||================================ //

const Item = ({ item }: { item: { image: string; text: string; name: string; designation: string; highlight?: boolean } }) => (
  <MainCard
    sx={{
      width: { xs: '300px', md: '420px' },
      cursor: 'pointer',
      my: 0.2,
      mx: 1.5
    }}
  >
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      <Avatar alt="Avatar" size="lg" src={item.image}></Avatar>
      <Stack>
        <Typography>{item.text}</Typography>
        <Typography>
          <small>{item.name}</small> -{' '}
          <Box component="span" color="textSecondary">
            {item.designation}
          </Box>
        </Typography>
      </Stack>
    </Stack>
  </MainCard>
);

// ==============================|| LANDING - TestimonialPage ||============================== //
const TestimonialPage = () => {
  const theme = useTheme();
  const items = [
    { image: Avatar1, text: '“RightWakeel provided the best legal advice I’ve ever received. Top-notch! 💼“', name: 'Sarah K.', designation: 'Client' },
    {
      image: Avatar2,
      text: '“Efficient, professional, and reliable – exactly what I needed in a lawyer! 👩‍⚖️“',
      name: 'John M.',
      designation: 'Client'
    },
    {
      image: Avatar3,
      text: '“As a lawyer, RightWakeel streamlined my client communication and case management perfectly. 🙌“',
      name: 'Amir H.',
      designation: 'Lawyer'
    },
    {
      image: Avatar4,
      text: '“A great platform for budding law students to learn and grow. Highly recommend! 🎓“',
      name: 'Neha R.',
      designation: 'Law Student'
    },
    {
      image: Avatar5,
      text: '“RightWakeel made hiring the right lawyer for my case super easy. 🌟“',
      name: 'David P.',
      designation: 'Client'
    },
    {
      image: Avatar6,
      text: '“The platform’s support team is incredibly responsive. They resolved my issues quickly! 👏“',
      name: 'Sana L.',
      designation: 'Lawyer'
    },
    {
      image: Avatar7,
      text: '“I’ve never had an easier time finding the perfect lawyer. RightWakeel made it simple. 👍“',
      name: 'Ravi S.',
      designation: 'Client'
    },
    {
      image: Avatar8,
      text: '“Excellent user experience for both clients and lawyers. Highly recommended! 🎯“',
      name: 'Anita G.',
      designation: 'Lawyer'
    }
  ];

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
                <Typography variant="h2">
                  Trusted by{' '}
                  <Box
                    component="span"
                    sx={{
                      color: theme.palette.primary.main
                    }}
                  >
                    clients & lawyers
                  </Box>{' '}
                  across the nation! 🚀
                </Typography>
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
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <FadeInWhenVisible>
              <Marquee pauseOnHover gradient={false}>
                {items.map((item, index) => (
                  <Item key={index} item={item} />
                ))}
              </Marquee>
            </FadeInWhenVisible>
          </Grid>
          <Grid item xs={12}>
            <FadeInWhenVisible>
              <Marquee pauseOnHover direction="right" gradient={false}>
                {items.map((item, index) => (
                  <Item key={index} item={item} />
                ))}
              </Marquee>
            </FadeInWhenVisible>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default TestimonialPage;
