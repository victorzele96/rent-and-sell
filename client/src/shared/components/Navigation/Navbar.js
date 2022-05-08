import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import usePlacesAutocomplete from "use-places-autocomplete";

import LeftDrawer from "./LeftDrawer";
// import  Autocomplete  from '../../hooks/autocomplete-hook';

import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  InputBase,
  IconButton,
  Tooltip,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import rns_logo from "../../../static/images/rns_logo.jpeg";

import classes from "./Navbar.module.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

const Navbar = (props) => {
  const toggleMapListHanler = () => props.setMapList((prevState) => !prevState);

  const [selectedValue, setSelectedValue] = useState("");

  const {
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

  const flatProps = {
    options: data.map(({ description }) => description),
  };

  useEffect(() => {
    window.sessionStorage.setItem("nav-search", JSON.stringify(selectedValue));
  }, [selectedValue]);

  return (
    <Box sx={{ flexGrow: 1, top: 0, display: "block", width: "100%" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ display: { md: "flex" } }}>
            {/* sdiebar */}
            <LeftDrawer />
          </Box>
          <IconButton component={Link} to="/">
            <img src={rns_logo} alt="rns_logo" className={classes.logo} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Search className={classes.search}>
            {/* {showSearchIcon && (selectedValue === "" || !selectedValue) && ( */}
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            {/* )} */}
            <Autocomplete
              popupIcon={null}
              onChange={selectChangeHandler}
              style={{ width: "300px" }}
              {...flatProps}
              id="blur-on-select"
              blurOnSelect
              renderInput={(params) => (
                <>
                  <TextField onChange={autocompleteChangeHandler} {...params} />
                </>
              )}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={props.mapList ? "Show as List" : "Show on Map"}>
            <Box sx={{ display: { md: "flex" }, marginRight: "1rem" }}>
              {toggleMapList}
            </Box>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
