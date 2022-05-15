import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import usePlacesAutocomplete from "use-places-autocomplete";

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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
