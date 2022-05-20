import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import usePlacesAutocomplete from "use-places-autocomplete";
import { useResponsive } from '../../hooks/responsive-hook';

import { AuthContext } from "../../context/auth-context";

import Notifications from "./Notifications";
import LeftDrawer from "./LeftDrawer";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Bell as BellIcon } from "../../../admin/icons/bell";
import rns_logo from "../../../static/images/rns_logo.jpeg";

const Navbar = (props) => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);

  const { width } = useResponsive();

  const toggleMapListHanler = () => props.setMapList((prevState) => !prevState);

  usePlacesAutocomplete(); //! for unknown reason when you delete this it shows error.

  const toggleMapList = props.mapList ? (
    <IconButton onClick={toggleMapListHanler}>
      <FormatListBulletedIcon
        fontSize="large"
        sx={{ color: 'white' }}
      />
    </IconButton>
  ) : (
    <IconButton onClick={toggleMapListHanler}>
      <TravelExploreIcon
        fontSize="large"
        sx={{ color: 'white' }}
      />
    </IconButton>
  );

  const options = [
    {
      title: 'Welcome',
      message: 'Welcome to Rent and Sell'
    },
    {
      title: 'Update 1.0',
      message: 'We are happy to announce our first update'
    }
  ];

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

  const getHeight = () => {
    if (width <= 370) {
      return '21px';
    }
    if (width <= 420) {
      return '23px';
    }
    if (width > 420) {
      return '26px';
    }
  };

  const getWidth = () => {
    if (width <= 370) {
      return '42px';
    }
    if (width <= 420) {
      return '46px';
    }
    if (width > 420) {
      return '52px';
    }
  };

  return (
    <Box sx={{ flexGrow: 1, top: 0, display: "block", width: "100%" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ display: { md: "flex" } }}>
            {/* sdiebar */}
            <LeftDrawer />
          </Box>
          <IconButton
            component={Link}
            to="/"
          >
            <img
              src={rns_logo}
              alt="rns_logo"
              style={{ width: getWidth(), height: getHeight() }}
            />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={props.mapList ? "Show as List" : "Show on Map"}>
            <Box sx={{ display: { md: "flex" }, marginRight: "1rem" }}>
              {location.pathname === '/' && toggleMapList}
            </Box>
          </Tooltip>
          {authCtx.user && (
            <>
              <Tooltip title="Notifications">
                <IconButton
                  sx={{ mr: 2, color: "white", svg: { height: "30px", width: "30px" } }}
                  onClick={moreMenuOpenHandler}
                >
                  <Badge
                    badgeContent={options.length}
                    color="error"
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
            </>
          )}
        </Toolbar>
        <Notifications notifications={options} selected={menuOption} open={open} onClose={closeModalHandler} />
      </AppBar>
    </Box>
  );
};

export default Navbar;
