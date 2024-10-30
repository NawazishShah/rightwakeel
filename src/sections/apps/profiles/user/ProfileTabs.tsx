import { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Box, Divider, FormLabel, Grid, TextField, Menu, MenuItem, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import ProfileTab from './ProfileTab';
import { facebookColor, linkedInColor } from 'config';
import { Google, Facebook, Apple, Camera, More } from 'iconsax-react';
import useAuth from 'hooks/useAuth';
import { RootState } from 'store';
import IconButton from 'components/@extended/IconButton';
import axios from 'axios';

// ==============================|| USER PROFILE - TABS ||============================== //

const ProfileTabs = ({ focusInput }: { focusInput: () => void }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const { lawyer } = useSelector((state: RootState) => state.lawyer);

  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  


  useEffect(() => {
    // Set the avatar either from the selected image or from the lawyer object (if available)
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
      console.log(selectedImage, URL.createObjectURL(selectedImage), "url imgaes")
    } else if (lawyer && lawyer.avatar) {
      setAvatar(`http://localhost:5000${lawyer.avatar}`); // Load avatar from the lawyer data
      console.log(lawyer.avatar)

    }
  }, [selectedImage, lawyer]);

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget as Element);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImageUpload = async (file: File) => {
    if (!user || !user.id) {
      console.error('User ID is not available');
      return; // Exit if user ID is not available
    }
    
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.put(`http://localhost:5000/api/lawyers/updateProfilePic/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Profile updated successfully', response.data);
      // Update the avatar in state after successful upload
      setAvatar(URL.createObjectURL(response.data.avatar)); // Assuming the response contains the new avatar URL
    } catch (error) {
      console.error('Error updating profile image', error);
    }
  };

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedImage(file);
      handleImageUpload(file); // Upload the image
    }
  };

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton
              variant="light"
              color="secondary"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <More />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem
                component={Link}
                to="/apps/profiles/user/personal"
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    focusInput();
                  });
                }}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={handleClose} disabled>
                Delete
              </MenuItem>
            </Menu>
          </Stack>
          <Stack spacing={2.5} alignItems="center">
            <FormLabel
              htmlFor="change-avatar"
              sx={{
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                '&:hover .MuiBox-root': { opacity: 1 },
                cursor: 'pointer'
              }}
            >
              <Avatar alt="Avatar" src={avatar} sx={{ width: 124, height: 124, border: '1px dashed' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <Camera style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                  <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                </Stack>
              </Box>
            </FormLabel>
            <TextField
              type="file"
              id="change-avatar"
              placeholder="Outlined"
              variant="outlined"
              sx={{ display: 'none' }}
              onChange={handleChangeAvatar}
            />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{lawyer?.firstname} {lawyer?.lastname}</Typography>
              <Typography color="secondary">{lawyer?.designation}</Typography>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ '& svg': { fontSize: '1.15rem', cursor: 'pointer' } }}>
              <Google variant="Bold" color={theme.palette.error.main} />
              <Facebook variant="Bold" color={facebookColor} />
              <Apple variant="Bold" color={linkedInColor} />
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={3} sx={{ display: { sm: 'block', md: 'none' } }} />
        <Grid item xs={12} sm={6} md={12}>
          <Stack direction="row" justifyContent="space-around" alignItems="center">
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">86</Typography>
              <Typography color="secondary">Post</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">40</Typography>
              <Typography color="secondary">Project</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">4.5K</Typography>
              <Typography color="secondary">Members</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ProfileTab />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ProfileTabs;
