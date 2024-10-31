import {  useLayoutEffect, useRef } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { Outlet } from 'react-router';

// project-imports
import ProfileCard from 'sections/apps/profiles/user/ProfileCard';
import ProfileTabs from 'sections/apps/profiles/user/ProfileTabs';
import { dispatch } from 'store';
import { getLawyerById } from 'store/reducers/lawyer';
import useAuth from 'hooks/useAuth';

// ==============================|| PROFILE - USER ||============================== //

const UserProfile = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  useLayoutEffect(() => {
    if (user?.id) {
      dispatch(getLawyerById(user.id)); // Fetch lawyer data only once
    }
  }, [dispatch, user?.id]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ProfileCard focusInput={focusInput} />
      </Grid>
      <Grid item xs={12} md={3}>
        <ProfileTabs focusInput={focusInput} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Outlet context={inputRef} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
