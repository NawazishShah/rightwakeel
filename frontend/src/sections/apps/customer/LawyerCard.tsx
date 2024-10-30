import { useState, MouseEvent } from 'react';

// material-ui imports
import {
  // Box,
  // Button,
  // Chip,
  // Dialog,
  Divider,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  // Stack,
  Typography
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';

// assets/icons
import { CallCalling, Location, More, Sms } from 'iconsax-react';

// types
interface LawyerCardProps {
  lawyer: {
    firstname: string;
    lastname: string;
    address: string;
    speciality: string[];
    contact: string;
    email: string;
    avatar: number;
  };
}

// ==============================|| LAWYER - CARD ||============================== //

const LawyerCard = ({ lawyer }: { lawyer: LawyerCardProps['lawyer'] }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <MainCard sx={{ height: 1, '& .MuiCardContent-root': { height: 1, display: 'flex', flexDirection: 'column' } }}>
      <Grid container spacing={2.25}>
        <Grid item xs={12}>
          <List sx={{ width: 1, p: 0 }}>
            <ListItem
              disablePadding
              secondaryAction={
                <IconButton edge="end" aria-label="options" color="secondary" onClick={handleMenuClick}>
                  <More style={{ fontSize: '1.15rem' }} />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar alt={`${lawyer.firstname} ${lawyer.lastname}`} src={`/path/to/avatars/avatar-${lawyer.avatar}.png`} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="subtitle1">{lawyer.firstname} {lawyer.lastname}</Typography>}
                secondary={<Typography color="text.secondary">{lawyer.speciality.join(', ')}</Typography>}
              />
            </ListItem>
          </List>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem>View Profile</MenuItem>
            <MenuItem>Contact</MenuItem>
          </Menu>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography>{lawyer.address}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} direction={{ xs: 'column', md: 'row' }}>
            <Grid item xs={6}>
              <List sx={{ p: 0, overflow: 'hidden', '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
                <ListItem>
                  <ListItemIcon>
                    <Sms size={18} />
                  </ListItemIcon>
                  <ListItemText primary={<Typography color="text.secondary">{lawyer.email}</Typography>} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CallCalling size={18} />
                  </ListItemIcon>
                  <ListItemText primary={<Typography color="text.secondary">{lawyer.contact}</Typography>} />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6}>
              <List sx={{ p: 0 }}>
                <ListItem>
                  <ListItemIcon>
                    <Location size={18} />
                  </ListItemIcon>
                  <ListItemText primary={<Typography color="text.secondary">{lawyer.address}</Typography>} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default LawyerCard;
