import { useState } from 'react';

import {
  IconButton,
  Drawer,
  TextField,
  ToggleButton,
  Box,
  Divider,
  Typography,
  Button,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

import { styled, useTheme } from '@mui/material/styles';

import ConstructionIcon from '@mui/icons-material/Construction';
import PetsIcon from '@mui/icons-material/Pets';
import ParkIcon from '@mui/icons-material/Park';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import DomainIcon from '@mui/icons-material/Domain';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SellIcon from '@mui/icons-material/Sell';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const useStyles = makeStyles((theme) => ({
  filter: {
    zIndex: 1,
    position: 'fixed',
    left: 0,
    top: 0,
    marginLeft: '0.5rem',
    marginTop: '15rem',
  },
  closedFilter: {
    width: '58px',
    height: '40px',
  },
  filterBtnContainer: {
    position: 'absolute',
  },
  filterItem: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  headerTitle: {
    float: 'left',
    marginTop: 5
  },
  headerBtn: {
    float: 'right',
  },
  reset: {
    marginTop: "15px",
    paddingLeft: "15%",
    paddingRight: "15%",
    width: "100px",
  }
}));

const initialFilterState = {
  rooms_num: 0,
  listing_status: 'sale',
  renovated: false,
  parking: false,
  accessibility: false,
  natural_illumination: false,
  pets: false,
  park: false,
  public_transport: false,
  public_institutes: false,
};

const DrawerHeader = styled('div')(({ theme }) => ({
  alignItems: 'center',
  padding: theme.spacing(0, 1),
}));

const Filter = (props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const [filterState, setFilterState] = useState(initialFilterState);

  const listingStatusChangeHandler = () => {
    if (filterState.listing_status === "sale") {
      setFilterState({ ...filterState, listing_status: "rent" });
    } else {
      setFilterState({ ...filterState, listing_status: "sale" });
    }
  };

  const changeHandler = (event) => {
    let newFilterState = { ...filterState };

    for (const [key, value] of Object.entries(filterState)) {
      if (key === event.target.name) {
        if (typeof value === "boolean") {
          newFilterState[key] = !value;
        } else {
          newFilterState[key] = event.target.value;
        }
      };
      setFilterState({ ...newFilterState });

      // TODO: add filtering logic to apartment list
    }
  };

  const resetHandler = () => {
    setFilterState(initialFilterState);
    // props.onReset();
  };

  const filterHandler = () => {
    // if (filterState.rooms_num === 0) {
    //   delete filterState.rooms_num;
    // }
    // console.log(filterState);
    props.onFilter(filterState);
  };

  const filterContent = (
    <>
      <TextField
        id="rooms_num"
        name="rooms_num"
        label="Rooms Number"
        fullWidth
        variant="standard"
        onChange={changeHandler}
        className={`disableInputArrows ${classes.filterItem}`}
        value={filterState.rooms_num}
        type="number"
        onWheel={(event) => { event.target.blur() }}
      />
      <ToggleButton
        color="primary"
        value="listing_status"
        selected={true}
        fullWidth
        onClick={listingStatusChangeHandler}
        className={classes.filterItem}
        name="listing_status"
      >
        <SellIcon sx={{ mr: 2 }} />
        {filterState.listing_status}
      </ToggleButton>
      <ToggleButton
        color="primary"
        value="parking"
        selected={filterState.parking}
        fullWidth
        onChange={changeHandler}
        className={classes.filterItem}
        name="parking"
      >
        <LocalParkingIcon sx={{ mr: 2 }} />
        Parking
      </ToggleButton>
      <ToggleButton
        color="primary"
        value="accessibility"
        selected={filterState.accessibility}
        fullWidth
        onChange={changeHandler}
        className={classes.filterItem}
        name="accessibility"
      >
        <ConstructionIcon sx={{ mr: 2 }} />
        Accessibility
      </ToggleButton>
      <ToggleButton
        color="primary"
        value="natural_illumination"
        selected={filterState.natural_illumination}
        fullWidth
        onChange={changeHandler}
        className={classes.filterItem}
        name="natural_illumination"
      >
        <WbIncandescentIcon sx={{ mr: 2 }} />
        Natural Illumination
      </ToggleButton>
      <ToggleButton
        color="primary"
        value="pets"
        selected={filterState.pets}
        fullWidth
        onChange={changeHandler}
        className={classes.filterItem}
        name="pets"
      >
        <PetsIcon sx={{ mr: 2 }} />
        Pets
      </ToggleButton>
      <ToggleButton
        color="primary"
        value="park"
        selected={filterState.park}
        fullWidth
        onChange={changeHandler}
        className={classes.filterItem}
        name="park"
      >
        <ParkIcon sx={{ mr: 2 }} />
        Park
      </ToggleButton>
      <ToggleButton
        color="primary"
        value="public_transport"
        selected={filterState.public_transport}
        fullWidth
        onChange={changeHandler}
        className={classes.filterItem}
        name="public_transport"
      >
        <CommuteIcon sx={{ mr: 2 }} />
        Public Transport
      </ToggleButton>
      <ToggleButton
        color="primary"
        value="public_institutes"
        selected={filterState.public_institutes}
        fullWidth
        onChange={changeHandler}
        className={classes.filterItem}
        name="public_institutes"
      >
        <DomainIcon sx={{ mr: 2 }} />
        Public Institutes
      </ToggleButton>
      <ToggleButton
        color="primary"
        value="renovated"
        selected={filterState.renovated}
        fullWidth
        onChange={changeHandler}
        className={classes.filterItem}
        name="renovated"
      >
        <ConstructionIcon sx={{ mr: 2 }} />
        Renovated
      </ToggleButton>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={resetHandler}
          className={classes.reset}
        >
          Reset
        </Button>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={filterHandler}
          className={classes.reset}
        >
          Filter
        </Button>
      </Box>
    </>
  );

  return (
    <div className={`${classes.filter} ${!open ? classes.closedFilter : ''}`}>
      <div className={classes.filterBtnContainer}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ ml: 0.25, mr: 2, ...(open && { display: 'none' }) }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      <Box>
        <Drawer
          sx={{
            width: open ? 240 : '58px',
            height: open ? 240 : '100%',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              position: 'unset',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '4px',
              padding: '1rem',
              overflowY: 'scroll',
              maxHeight: open ? '300px' : '40px'
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <div className={classes.headerTitle}>
              <Typography variant="h6">
                Filter
              </Typography>
            </div>
            <div className={classes.headerBtn}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
          </DrawerHeader>
          <Divider />
          {filterContent}
        </Drawer>
      </Box>
    </div>
  );
}
export default Filter;