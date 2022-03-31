import { useState } from 'react';

import { Button, Card, CardContent, Container, TextField, ToggleButton } from '@mui/material';

import ConstructionIcon from '@mui/icons-material/Construction';
import PetsIcon from '@mui/icons-material/Pets';
import ParkIcon from '@mui/icons-material/Park';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import DomainIcon from '@mui/icons-material/Domain';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SellIcon from '@mui/icons-material/Sell';

// import classes from './Filter.module.css';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    "overflow-y": "scroll",
    maxHeight: "350px",
    paddingBottom: "15px"
  },
  filterCard: {
    alignItems: "center",
    paddingBottom: "50px",
    marginTop: "40px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)"
  },
  filterCardContent: {
    "overflow": "hidden",
    textAlign: "center"
  },
  filterItem: {
    marginTop: "5px",
    marginBottom: "5px",
    btn: {
      "border-radius": "0%",
      "justify-content": "start"
    }
  },
  reset: {
    borderColor: "#1976d2",
    border: "1px solid",
    marginTop: "15px",
    paddingLeft: "15%",
    paddingRight: "15%"
  }
}));

const initialFilterState = {
  listingStatus: 'sale',
  renovated: false,
  parking: false,
  accessibility: false,
  illumination: false,
  pets: false,
  park: false,
  transport: false,
  institutes: false,
};

const Filter = (porps) => {
  const classes = useStyles();

  const [query, setQuery] = useState("");
  const [searchParam] = useState(["title", "address"]);

  const [filterState, setFilterState] = useState(initialFilterState);

  // const [listingStatus, setListingStatus] = useState("sale");
  // const [renovated, setRenovated] = useState(false);
  // const [parking, setParking] = useState(false);
  // const [accessibility, setAccessibility] = useState(false);
  // const [illumination, setIllumination] = useState(false);
  // const [pets, setPets] = useState(false);
  // const [park, setPark] = useState(false);
  // const [transport, setTransport] = useState(false);
  // const [institutes, setInstitutes] = useState(false);

  const listingStatusChangeHandler = () => {
    if (filterState.listingStatus === "sale") {
      setFilterState({ ...filterState, listingStatus: "rent" });
    } else {
      setFilterState({ ...filterState, listingStatus: "sale" });
    }
  };

  const changeHandler = (event) => {
    let newFilterState = filterState;

    for (const [key, value] of Object.entries(filterState)) {
      let state;

      if (key === event.target.name) {
        newFilterState[key] = !value;
      }
    };
    setFilterState({ ...newFilterState });

    // TODO: add filtering logic to apartment list
  };

  const resetHandler = () => {
    setFilterState({ ...initialFilterState });
    // ! bug when reseting the states
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <Card className={classes.filterCard}>
        <CardContent className={classes.filterCardContent}>
          <TextField
            id="address"
            name="address"
            label="address"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            className={classes.filterItem}
          />
          <TextField
            id="street"
            name="street"
            label="street"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            className={classes.filterItem}
          />
          <TextField
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            className={classes.filterItem}
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
            {filterState.listingStatus}
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
            value="illumination"
            selected={filterState.illumination}
            fullWidth
            onChange={changeHandler}
            className={classes.filterItem}
            name="illumination"
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
            value="transport"
            selected={filterState.transport}
            fullWidth
            onChange={changeHandler}
            className={classes.filterItem}
            name="transport"
          >
            <CommuteIcon sx={{ mr: 2 }} />
            Public Transport
          </ToggleButton>
          <ToggleButton
            color="primary"
            value="institutes"
            selected={filterState.institutes}
            fullWidth
            onChange={changeHandler}
            className={classes.filterItem}
            name="institutes"
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
          <Button
            onClick={resetHandler}
            color="primary"
            className={classes.reset}
          >
            Reset
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Filter;