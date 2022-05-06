import * as React from 'react';
import { Link } from 'react-router-dom';

import RightDrawer from './RightDrawer';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { IconButton, Tooltip } from '@mui/material';

import rns_logo from '../../../static/images/rns_logo.jpeg';

import classes from './Navbar.module.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  // width: '100%',
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(3),
  //   width: 'auto',
  // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

const Navbar = (props) => {
  const toggleMapListHanler = () => props.setMapList(prevState => !prevState);

  const toggleMapList = props.mapList ? (
    <IconButton
      className={classes.toggleBtn}
      onClick={toggleMapListHanler}
    >
      <FormatListBulletedIcon
        fontSize="large"
      />
    </IconButton>
  ) : (
    <IconButton
      className={classes.toggleBtn}
      onClick={toggleMapListHanler}
    >
      <TravelExploreIcon
        fontSize="large"
      />
    </IconButton>
  );

  return (
    <Box sx={{ flexGrow: 1, top: 0, display: "block", width: "100%" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ display: { md: 'flex' } }}>
            {/* sdiebar */}
            <RightDrawer />
          </Box>
          <IconButton
            component={Link}
            to='/'
          >
            <img src={rns_logo} alt="rns_logo" width={84} height={42} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Search className={classes.search}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={props.mapList ? "Show as List" : "Show on Map"}>
            <Box sx={{ display: { md: 'flex' }, marginRight: "1rem" }}>
              {toggleMapList}
            </Box>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;