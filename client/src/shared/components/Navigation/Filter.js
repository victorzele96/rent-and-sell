import { useEffect, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  ToggleButton
} from '@mui/material';

import ConstructionIcon from '@mui/icons-material/Construction';
import PetsIcon from '@mui/icons-material/Pets';
import ParkIcon from '@mui/icons-material/Park';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import DomainIcon from '@mui/icons-material/Domain';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SellIcon from '@mui/icons-material/Sell';

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
    marginTop: "15px",
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
    marginTop: "15px",
    paddingLeft: "15%",
    paddingRight: "15%",
  }
}));

const initialFilterState = {
  address: "",
  street: "",
  city: "",
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

const Filter = (porps) => {
  const classes = useStyles();

  // const [query, setQuery] = useState("");
  // const [searchParam] = useState(["title", "address"]);

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
          console.log(event.target.name)
          newFilterState[key] = event.target.value;
        }
      };
      setFilterState({ ...newFilterState });

      // TODO: add filtering logic to apartment list
    }
  };

  useEffect(() => {
    console.log(filterState);
  }, [filterState]);

  const resetHandler = () => {
    setFilterState(initialFilterState);
  };

  const content = (
    <>
      <TextField
        id="address"
        name="address"
        label="Address"
        fullWidth
        variant="standard"
        onChange={changeHandler}
        className={classes.filterItem}
        value={filterState.address}
      />
      <TextField
        id="street"
        name="street"
        label="Street"
        fullWidth
        variant="standard"
        onChange={changeHandler}
        className={classes.filterItem}
        value={filterState.street}
      />
      <TextField
        id="city"
        name="city"
        label="City"
        fullWidth
        variant="standard"
        onChange={changeHandler}
        className={classes.filterItem}
        value={filterState.city}
      />
      <TextField
        id="rooms_num"
        name="rooms_num"
        label="Rooms Number"
        fullWidth
        variant="standard"
        onChange={changeHandler}
        className={classes.filterItem}
        value={filterState.rooms_num}
        type="number"
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
    </>
  );

  return (
    <Container maxWidth={false} className={classes.container}>
      <Card className={classes.filterCard}>
        <CardContent className={classes.filterCardContent}>
          {content}
          <Button
            variant="contained"
            onClick={resetHandler}
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