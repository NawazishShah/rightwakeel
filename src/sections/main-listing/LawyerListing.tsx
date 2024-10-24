import { useEffect, useState, ReactElement } from 'react';

// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles';
import { Box, Container, Grid } from '@mui/material';

// project-imports
import Loader from 'components/Loader';
import LawyerCard from 'sections/apps/e-commerce/lawyers/LawyerCard'; // Create a suitable LawyerCard component
import LawyerFilterDrawer from 'sections/apps/e-commerce/lawyers/LawyerFilterDrawer';
import SkeletonLawyerPlaceholder from 'sections/apps/e-commerce/lawyers/SkeletonLawyerPlaceholder'; // Create a suitable skeleton component
import LawyersHeader from 'sections/apps/e-commerce/lawyers/LawyersHeader';
import LawyersEmpty from 'sections/apps/e-commerce/lawyers/LawyersEmpty';

import useConfig from 'hooks/useConfig';
import { dispatch, useSelector } from 'store';
import { getLawyers, filterLawyers } from 'store/reducers/lawyer';

// types
import { Lawyer as LawyersTypo, LawyerFilter } from 'types/lawyer';

const Main = styled('main', { shouldForwardProp: (prop: string) => prop !== 'open' && prop !== 'container' })(
  ({ theme, open, container }: { theme: Theme; open: boolean; container: any }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    marginLeft: -320,
    ...(container && {
      [theme.breakpoints.only('lg')]: {
        marginLeft: !open ? -240 : 0
      }
    }),
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0,
      marginLeft: 0
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter
      }),
      marginLeft: 0
    })
  })
);

// ==============================|| LAWYERS - LISTING ||============================== //

const LawyersPage = () => {
  const theme = useTheme();

  const lawyerState = useSelector((state) => state.lawyer);
  const { container } = useConfig();

  const [loading, setLoading] = useState<boolean>(true);
  const [lawyerLoading, setLawyerLoading] = useState(true);

  // lawyer data
  const [lawyers, setLawyers] = useState<LawyersTypo[]>([]);

  useEffect(() => {
    setLawyers(lawyerState.lawyers);
  }, [lawyerState]);

  useEffect(() => {
    const lawyersCall = dispatch(getLawyers());
    Promise.all([lawyersCall]).then(() => setLoading(false));
  }, []);

  // useEffect(() => {
  //   // Parse query parameters
  //   const params = new URLSearchParams(location.search);
  //   const lawyerName = params.get('name');
  //   const lawArea = params.get('area');
  //   const city = params.get('city');

  //   // Construct the filter object based on the query parameters
  //   const filter = {
  //     firstName: lawyerName || '',
  //     specialty: lawArea || '',
  //     address: city || ''
  //   };

  //   // Dispatch filter action to fetch lawyers based on search params
  //   dispatch(filterLawyers(filter));
  // }, [location.search]);

  const [openFilterDrawer, setOpenFilterDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setOpenFilterDrawer((prevState) => !prevState);
  };
  const fetchLawyers = () => {
    dispatch(filterLawyers(filter));
  };
  const handelFilter = (type: string, params: string, rating?: number) => {
    setFilter((prevFilter) => {
      let newFilter = { ...prevFilter };
      switch (type) {
        case 'firstName':
          newFilter.firstName = params;
          break;
        case 'lastName':
          newFilter.lastName = params;
          break;
        case 'address':
          newFilter.address = params;
          break;
        case 'designation':
          newFilter.designation = params;
          break;
        case 'specialty':
          if (rating !== undefined) {
            newFilter.specialties = [...newFilter.specialties, params];
          } else {
            newFilter.specialties = newFilter.specialties.filter((item) => item !== params);
          }
          break;
        case 'degree':
          newFilter.degree = params;
          break;
        case 'reset':
          return initialState; // Reset filter to initial state
        default:
          break;
      }
      return newFilter;
    });
    fetchLawyers(); // Call the function to fetch lawyers based on updated filters
  };
  

  // filter initial state
  const initialState: LawyerFilter = {
    firstName: '',
    lastName: '',
    address: '',
    designation: '',
    specialty: '',
    degree: '',
    search: '',
    sort: '',
    specialties: [],
    locations: [],
    hourlyRate: '',
    rating: 0
  };

  const [filter, setFilter] = useState(initialState);

  const filterData = async () => {
    await dispatch(filterLawyers(filter));
    setLawyerLoading(false);
  };

  useEffect(() => {
    filterData();
  }, [filter]);

  let lawyerResult: ReactElement | ReactElement[] = <></>;
  if (lawyers && lawyers.length > 0) {
   lawyerResult = lawyers.map((lawyer: LawyersTypo, index: number) => (
  <Grid key={index} item xs={12} sm={6} md={6}>
    <LawyerCard
      id={String(lawyer._id ?? '')} // Ensures it's a string
      firstName={lawyer.firstname ?? ''}
      lastName={lawyer.lastname ?? ''}
      address={lawyer.location ?? ''}
      designation={lawyer.designation ?? ''}
      specialty={lawyer.specialty ?? ''}
      degree={lawyer.degree ?? ''}
      rating={lawyer.rating ?? 0} // Pass the rating prop
      experience={lawyer.experience ?? 'N/A'} // Pass the experience prop
    />
  </Grid>
));

  } else {
    lawyerResult = (
      <Grid item xs={12} sx={{ mt: 3 }}>
        <LawyersEmpty handleFilter={() => setFilter(initialState)} />
      </Grid>
    );
  }

  if (loading) return <Loader />;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
    <Box sx={{ display: 'flex' }}>
      <LawyerFilterDrawer
        filter={filter}
        setFilter={setFilter}
        openFilterDrawer={openFilterDrawer}
        handleDrawerOpen={handleDrawerOpen}
        setLoading={setLawyerLoading}
        initialState={initialState}
        fetchLawyers={fetchLawyers}
        handelFilter={handelFilter} 
      />
      <Main theme={theme} open={openFilterDrawer} container={container}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <LawyersHeader filter={filter} handleDrawerOpen={handleDrawerOpen} setFilter={setFilter} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {lawyerLoading
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Grid key={item} item xs={12} sm={6} md={4} lg={4}>
                      <SkeletonLawyerPlaceholder />
                    </Grid>
                  ))
                : lawyerResult}
            </Grid>
          </Grid>
        </Grid>
      </Main>
    </Box>

    </Container>
  );
};

export default LawyersPage;
