// LawyerFilterDrawer.tsx
import { useTheme } from '@mui/material/styles';
import { Drawer, Stack, useMediaQuery } from '@mui/material';

// project-imports
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import { HEADER_HEIGHT } from 'config';
import useConfig from 'hooks/useConfig';

// types
import { ThemeMode } from 'types/config';
import { LawyerFilter } from 'types/lawyer';
import LawyersFilter from './LawyersFilter';
import LawyerFilterView from './LawyerFilterView';


// ==============================|| LAWYER - FILTER DRAWER ||============================== //

interface FilterDrawerProps {
  filter: LawyerFilter;
  initialState: LawyerFilter;
  handleDrawerOpen: () => void;
  openFilterDrawer: boolean | undefined;
  setFilter: (filter: LawyerFilter) => void;
  setLoading: (flag: boolean) => void;
  fetchLawyers: () => void; 
  handelFilter: (type: string, params: string, rating?: number) => void;

}


function LawyerFilterDrawer({ filter, initialState, handleDrawerOpen, openFilterDrawer, setFilter, setLoading, fetchLawyers }: FilterDrawerProps) {
  const theme = useTheme();
  const { container } = useConfig();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchLG = useMediaQuery(theme.breakpoints.only('lg'));
  const drawerBG = theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'white';

  const handelFilter = (type: string, params: string, rating?: number) => {
    setLoading(true);
    let newFilter;

    switch (type) {
        case 'firstName':
            setFilter({ ...filter, firstName: params });
            break;
        case 'lastName':
            setFilter({ ...filter, lastName: params });
            break;
        case 'address':
            setFilter({ ...filter, address: params });
            break;
        case 'designation':
            setFilter({ ...filter, designation: params });
            break;
        case 'specialty':
            if (rating !== undefined) {
                newFilter = { ...filter, specialties: [...filter.specialties, params] };
            } else {
                newFilter = { ...filter, specialties: filter.specialties.filter((item) => item !== params) };
            }
            setFilter(newFilter);
            break;
        case 'degree':
            setFilter({ ...filter, degree: params });
            break;
        case 'reset':
            setFilter(initialState);
            break;
        default:
            setFilter(filter);
            break;
    }
    fetchLawyers();
};

   // Add filterIsEqual method
   const filterIsEqual = (initial: LawyerFilter, current: LawyerFilter) => {
    return JSON.stringify(initial) === JSON.stringify(current);
  };

  const drawerContent = (
    <Stack sx={{ p: 3 }} spacing={0.5}>
      <LawyerFilterView filter={filter} handelFilter={handelFilter} initialState={initialState} filterIsEqual={filterIsEqual}  />
      <LawyersFilter filter={filter} handelFilter={handelFilter} />
    </Stack>
  );

  return (
    <Drawer
      sx={{
        width: container && matchLG ? 240 : 320,
        flexShrink: 0,
        zIndex: { xs: 1200, lg: 0 },
        mr: openFilterDrawer && !matchDownLG ? 2.5 : 0,
        '& .MuiDrawer-paper': {
          height: matchDownLG ? '100%' : 'auto',
          width: container && matchLG ? 240 : 320,
          boxSizing: 'border-box',
          position: 'relative',
          boxShadow: 'none'
        }
      }}
      variant={matchDownLG ? 'temporary' : 'persistent'}
      anchor="left"
      open={openFilterDrawer}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerOpen}
    >
      <MainCard
        title="Filter"
        sx={{
          bgcolor: matchDownLG ? 'transparent' : drawerBG,
          borderRadius: '4px 0 0 4px',
          borderRight: 'none'
        }}
        border={!matchDownLG}
        content={false}
      >
        {matchDownLG ? <SimpleBar sx={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>{drawerContent}</SimpleBar> : drawerContent}
      </MainCard>
    </Drawer>
  );
}

export default LawyerFilterDrawer;
