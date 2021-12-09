import * as React from 'react';
import { Link } from 'react-router-dom';

import RightDrawer from './RightDrawer';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

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

const Navbar = () => {
  const [mapListState, setMapListState] = React.useState(true);

  const toggleMapListHanler = () => setMapListState(prevState => !prevState);

  const toggleMapList = mapListState ? (
    <TravelExploreIcon
      fontSize="large"
      onClick={toggleMapListHanler}
    />
  ) : (
    <FormatListBulletedIcon
      fontSize="large"
      onClick={toggleMapListHanler}
    />
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.logo}
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { sm: 'block' },
              color: "white",
              fontSize: "24px",
              textDecoration: "none"
            }}
          >
            RNT
          </Typography>
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
          <Box sx={{ display: { md: 'flex' }, marginRight: "1rem" }}>
            {toggleMapList}
          </Box>
          <Box sx={{ display: { md: 'flex' } }}>
            {/* sdiebar */}
            <RightDrawer />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;