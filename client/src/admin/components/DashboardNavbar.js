import { useState } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Menu,
  MenuItem
} from '@mui/material';

import Notifications from '../../shared/components/Navigation/Notifications';

import MenuIcon from '@mui/icons-material/Menu';
import { Bell as BellIcon } from '../icons/bell';
import { Cog as CogIcon } from '../icons/cog';

import rns_logo from '../../static/images/rns_logo.jpeg';

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const openMenu = Boolean(anchorEl);
  const [menuOption, setMenuOption] = useState();

  const moreMenuOpenHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const moreMenuSelectHandler = (event) => {
    setMenuOption(event.target.id);
    setOpen(true);
    setAnchorEl(null);
  };

  const closeMoreMenuHandler = () => {
    setAnchorEl(null);
  };

  const closeModalHandler = () => {
    setOpen(false);
    setMenuOption(null);
  };

  const options = [
    {
      title: 'Spam',
      message: 'Property $id was reported by User $id'
    },
    {
      title: 'Offensive',
      message: 'Property $id was reported by User $id'
    }
  ];

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
            <IconButton sx={{ mr: 2, color: "white" }} onClick={moreMenuOpenHandler}>
              <Badge
                badgeContent={1}
                color="error"
                variant="dot"
              >
                <BellIcon fontSize="medium" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            id="more-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={closeMoreMenuHandler}
            PaperProps={{
              style: {
                width: '13ch',
              },
            }}
          >
            {options.map((option, index) => (
              <MenuItem key={index} id={index} onClick={moreMenuSelectHandler}>
                {option.title}
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title="Settings">
            <IconButton sx={{ mr: 2, color: "white" }}>
              <CogIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Notifications notifications={options} selected={menuOption} open={open} onClose={closeModalHandler} />
      </AppBar>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
