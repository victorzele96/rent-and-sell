import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { Bell as BellIcon } from '../icons/bell';
import { Cog as CogIcon } from '../icons/cog';

import rns_logo from '../../static/images/rns_logo.jpeg';

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <AppBar {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            right: 0,
            px: 2,
          }}
        >
          <IconButton onClick={onSidebarOpen} sx={{ color: "white" }}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <IconButton
            component={Link}
            sx={{ ml: 1 }}
            to='/dashboard'
          >
            <img src={rns_logo} alt="rns_logo" width={84} height={42} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Notifications">
            <IconButton sx={{ mr: 2, color: "white" }}>
              <Badge
                badgeContent={1}
                color="error"
                variant="dot"
              >
                <BellIcon fontSize="medium" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton sx={{ mr: 2, color: "white" }}>
              <CogIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
