import { useState } from 'react';

import { Card, TextField, ToggleButton } from '@mui/material';

import ConstructionIcon from '@mui/icons-material/Construction';
import PetsIcon from '@mui/icons-material/Pets';
import ParkIcon from '@mui/icons-material/Park';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import DomainIcon from '@mui/icons-material/Domain';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SellIcon from '@mui/icons-material/Sell';

import classes from './Filter.module.css';

const Filter = (porps) => {
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["title", "address"]);

  const [listingStatus, setListingStatus] = useState("sale");
  const [renovated, setRenovated] = useState(false);
  const [parking, setParking] = useState(false);
  const [accessibility, setAccessibility] = useState(false);
  const [illumination, setIllumination] = useState(false);
  const [pets, setPets] = useState(false);
  const [park, setPark] = useState(false);
  const [transport, setTransport] = useState(false);
  const [institutes, setInstitutes] = useState(false);

  const listingStatusChangeHandler = () => {
    if (listingStatus === "sale") {
      setListingStatus("rent");
    } else {
      setListingStatus("sale");
    }
  };
  const renovatedChangeHandler = () => setRenovated(prevState => !prevState);
  const parkingChangeHandler = (event) => setParking(prevState => !prevState);
  const accessibilityChangeHandler = () => setAccessibility(prevState => !prevState);
  const illuminationChangeHandler = () => setIllumination(prevState => !prevState);
  const petsChangeHandler = () => setPets(prevState => !prevState);
  const parkChangeHandler = () => setPark(prevState => !prevState);
  const transportChangeHandler = () => setTransport(prevState => !prevState);
  const institutesChangeHandler = () => setInstitutes(prevState => !prevState);

  return (
    <Card className={classes["filter-card"]}>
      <div className={classes["filter-div"]}>
        <TextField
          id="address"
          name="address"
          label="address"
          fullWidth
          autoComplete="shipping address-level2"
          variant="standard"
        />
        <TextField
          id="street"
          name="street"
          label="street"
          fullWidth
          autoComplete="shipping address-level2"
          variant="standard"
        />
        <TextField
          id="city"
          name="city"
          label="City"
          fullWidth
          autoComplete="shipping address-level2"
          variant="standard"
        />
        <ToggleButton
          color="primary"
          value="listing_status"
          selected={true}
          fullWidth
          onClick={listingStatusChangeHandler}
          className={classes.btn}
        >
          <SellIcon sx={{ mr: 2 }} />
          {listingStatus}
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="parking"
          selected={parking}
          fullWidth
          onChange={parkingChangeHandler}
          className={classes.btn}
        >
          <LocalParkingIcon sx={{ mr: 2 }} />
          Parking
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="accessibility"
          selected={accessibility}
          fullWidth
          onChange={accessibilityChangeHandler}
          className={classes.btn}
        >
          <ConstructionIcon sx={{ mr: 2 }} />
          Accessibility
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="illumination"
          selected={illumination}
          fullWidth
          onChange={illuminationChangeHandler}
          className={classes.btn}
        >
          <WbIncandescentIcon sx={{ mr: 2 }} />
          Natural Illumination
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="pets"
          selected={pets}
          fullWidth
          onChange={petsChangeHandler}
          className={classes.btn}
        >
          <PetsIcon sx={{ mr: 2 }} />
          Pets
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="park"
          selected={park}
          fullWidth
          onChange={parkChangeHandler}
          className={classes.btn}
        >
          <ParkIcon sx={{ mr: 2 }} />
          Park
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="transport"
          selected={transport}
          fullWidth
          onChange={transportChangeHandler}
          className={classes.btn}
        >
          <CommuteIcon sx={{ mr: 2 }} />
          Public Transport
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="institutes"
          selected={institutes}
          fullWidth
          onChange={institutesChangeHandler}
          className={classes.btn}
        >
          <DomainIcon sx={{ mr: 2 }} />
          Public Institutes
        </ToggleButton>
        <ToggleButton
          color="primary"
          value="renovated"
          selected={renovated}
          fullWidth
          onChange={renovatedChangeHandler}
          className={classes.btn}
        >
          <ConstructionIcon sx={{ mr: 2 }} />
          Renovated
        </ToggleButton>
      </div>
    </Card>

  );
};

export default Filter;