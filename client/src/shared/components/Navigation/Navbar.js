import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import usePlacesAutocomplete from "use-places-autocomplete";

import { AuthContext } from "../../context/auth-context";

import LeftDrawer from "./LeftDrawer";

import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Autocomplete,
  TextField,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Bell as BellIcon } from "../../../admin/icons/bell";
import rns_logo from "../../../static/images/rns_logo.jpeg";

import classes from "./Navbar.module.css";
import Notifications from "./Notifications";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: {
    sm: theme.spacing(2),
    xs: 0
  },
  marginLeft: 0,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Navbar = (props) => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const toggleMapListHanler = () => props.setMapList((prevState) => !prevState);

  const [selectedValue, setSelectedValue] = useState("");

  const {
    // eslint-disable-next-line
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const toggleMapList = props.mapList ? (
    <IconButton className={classes.toggleBtn} onClick={toggleMapListHanler}>
      <FormatListBulletedIcon fontSize="large" />
    </IconButton>
  ) : (
    <IconButton className={classes.toggleBtn} onClick={toggleMapListHanler}>
      <TravelExploreIcon fontSize="large" />
    </IconButton>
  );

  const autocompleteChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const selectChangeHandler = (event, value) => {
    setSelectedValue(value);
  };

  const relevantDataSet = {
    options: status === 'OK' ? data.map(({ description }) => description) : [],
  };

  useEffect(() => {
    sessionStorage.setItem("nav-search", JSON.stringify(selectedValue));
  }, [selectedValue]);

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
            sx={{
              sm: { width: "42px", height: "21px" },
              xs: { width: "52px", height: "26px" },
              md: { width: "63px", height: "31.5px" },
              lg: { width: "84px", height: "42px" }
            }}
          >
            <img src={rns_logo} alt="rns_logo" className={classes.logo} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Search className={classes.search}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              popupIcon={null}
              onChange={selectChangeHandler}
              sx={{ width: { xs: "125px", sm: "400px", md: "500px", lg: "600px" } }}
              {...relevantDataSet}
              id="blur-on-select"
              blurOnSelect
              renderInput={(params) => (
                <>
                  <TextField
                    onChange={autocompleteChangeHandler}
                    {...params}
                  />
                </>
              )}
            />
          </Search>

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
