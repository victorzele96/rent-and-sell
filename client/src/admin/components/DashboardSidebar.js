import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, IconButton } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Users as UsersIcon } from '../icons/users';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavItem } from './NavItem';

import rns_logo from '../../static/images/rns_logo_reverse.jpeg';
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";

const items = [
  {
    href: '/dashboard',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/dashboard/users',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Users'
  },
  {
    href: '/',
    icon: (<LogoutIcon fontSize="small" />),
    title: 'Sign Out'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const authCtx = useContext(AuthContext);

  const signoutHandler = () => {
    authCtx.signout();
    onClose();
  };

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <IconButton
              to="/dashboard"
              component={Link}
            >
              <img src={rns_logo} alt="rns-logo" width={104} height={52} />
            </IconButton>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: 'rgb(25 118 210)',
            borderWidth: 1,
            mb: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => {
            if (item.title === 'Sign Out') {
              return (
                <NavItem
                  onClick={signoutHandler}
                  key={item.title}
                  icon={item.icon}
                  href={item.href}
                  title={item.title}
                />
              );
            }
            return (
              <NavItem
                onClick={onClose}
                key={item.title}
                icon={item.icon}
                href={item.href}
                title={item.title}
              />
            );
          })}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
      </Box>
    </>
  );

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
