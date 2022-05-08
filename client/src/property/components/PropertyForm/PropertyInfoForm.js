import { useEffect, useState } from 'react';

import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';

import ConstructionIcon from '@mui/icons-material/Construction';
import PetsIcon from '@mui/icons-material/Pets';
import ParkIcon from '@mui/icons-material/Park';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import DomainIcon from '@mui/icons-material/Domain';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

const initialPropertyState = {
  description: '',
  address: '',
  images: [],
  details: {
    listing_status: "rent",
    price: 0,
    renovated: false,
    rooms_num: 0,
    room_size: 0,
    property_type: "house",
    stories: 0,
    floor: 0,
    parking: false,
    accessiblity: false,
    natural_illumination: false,
    pets: false,
    park: false,
    public_transport: false,
    public_institutes: false,
    contact: ''
  },
  creator: ''
};

const PropertyInfoForm = (props) => {
  const [propertyState, setPropertyState] = useState(initialPropertyState);
  const [selectedArray, setSelectedArray] = useState([]);

  // TODO: add filtering logic to apartment list + pass the propertyState to outer components.

  const listingStatusChangeHandler = (event) => {
    setPropertyState(prevState => ({
      ...prevState, details: {
        ...prevState.details, listing_status: prevState.details.listing_status === 'rent' ? 'sale' : 'rent'
      }
    }));
  };

  const houseTypeChangeHandler = (event) => {
    setPropertyState(prevState => ({
      ...prevState, details: {
        ...prevState.details, property_type: prevState.details.property_type === 'house' ? 'apartment' : 'house'
      }
    }));
  };

  const toggle = (event, currentButtonName) => {
    if (selectedArray.some(value => value === currentButtonName)) {
      setSelectedArray([...selectedArray.filter(value => value !== currentButtonName)]);
    } else {
      setSelectedArray([...selectedArray, currentButtonName]);
    }
  };

  const changeHandler = (event) => {
    // eslint-disable-next-line
    for (const [key1, value1] of Object.entries(propertyState)) {
      if (key1 === 'details') {
        // eslint-disable-next-line
        for (const [key2, value2] of Object.entries(propertyState.details)) {
          if (key2 === event.target.name) {
            if (event.target.name === event.target.value) {
              setPropertyState(prevState => ({
                ...prevState, [key1]: {
                  ...prevState[key1], [key2]: !prevState[key1][key2]
                }
              }));
            } else {
              setPropertyState(prevState => ({
                ...prevState, [key1]: {
                  ...prevState[key1], [key2]: event.target.value
                }
              }));
            }
          }
        }
      } else {
        if (key1 === event.target.name) {
          setPropertyState(prevState => ({ ...prevState, [key1]: event.target.value }));
        }
      }
    }
  };

  useEffect(() => {
    window.sessionStorage.setItem("new-property-state", JSON.stringify(propertyState));
  }, [propertyState]);

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Property Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="listing_status-label">Listing Status</InputLabel>
            <Select
              labelId="listing_status-label"
              id="listing_status"
              name="listing_status"
              value={propertyState.details.listing_status}
              label="listing-status"
              onChange={listingStatusChangeHandler}
              required
            >
              <MenuItem value="rent">Rent</MenuItem>
              <MenuItem value="sale">Sale</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="property_type-label">Property Type</InputLabel>
            <Select
              labelId="property_type-label"
              id="property_type"
              name="property_type"
              value={propertyState.details.property_type}
              label="property-type"
              onChange={houseTypeChangeHandler}
              required
            >
              <MenuItem value="house">House</MenuItem>
              <MenuItem value="apartment">Apartment</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {propertyState.details.property_type === 'house' && (
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="stories"
              name="stories"
              label="Stories"
              type="number"
              fullWidth
              variant="standard"
              onChange={changeHandler}
            />
          </Grid>
        )}
        {propertyState.details.property_type === 'apartment' && (
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="floor"
              name="floor"
              label="Floor"
              type="number"
              fullWidth
              variant="standard"
              onChange={changeHandler}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rooms_num"
            name="rooms_num"
            label="Rooms Number"
            type="number"
            fullWidth
            variant="standard"
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="room_size"
            name="room_size"
            label="Room Size"
            type="number"
            fullWidth
            variant="standard"
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            variant="standard"
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="contact"
            name="contact"
            label="Contact"
            type="tel"
            fullWidth
            variant="standard"
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label="description"
            multiline
            rows={3}
            fullWidth
            inputProps={{ maxLength: 500 }}
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={12} />
        <Grid container columns={2} spacing={3}>
          <Grid item xs={1}>
            <ToggleButtonGroup
              onChange={changeHandler}
              value={selectedArray}
              color="primary"
              orientation='vertical'
              fullWidth
            >
              <ToggleButton
                name="park"
                color="primary"
                value="park"
                fullWidth
                onClick={toggle}
              >
                <ParkIcon sx={{ mr: 2 }} />
                Park
              </ToggleButton>
              <ToggleButton
                name="public_transport"
                color="primary"
                value="public_transport"
                fullWidth
                onClick={toggle}
              >
                <CommuteIcon sx={{ mr: 2 }} />
                Public Transport
              </ToggleButton>
              <ToggleButton
                name="public_institutes"
                color="primary"
                value="public_institutes"
                fullWidth
                onClick={toggle}
              >
                <DomainIcon sx={{ mr: 2 }} />
                Public Institutes
              </ToggleButton>
              <ToggleButton
                name="renovated"
                color="primary"
                value="renovated"
                fullWidth
                onClick={toggle}
              >
                <ConstructionIcon sx={{ mr: 2 }} />
                Renovated
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={1}>
            <ToggleButtonGroup
              onChange={changeHandler}
              value={selectedArray}
              color="primary"
              orientation='vertical'
              fullWidth
            >
              <ToggleButton
                color="primary"
                value="parking"
                name="parking"
                fullWidth
                onClick={toggle}
              >
                <LocalParkingIcon sx={{ mr: 2 }} />
                Parking
              </ToggleButton>
              <ToggleButton
                name="accessiblity"
                color="primary"
                value="accessiblity"
                fullWidth
                onClick={toggle}
              >
                <ConstructionIcon sx={{ mr: 2 }} />
                Accessibility
              </ToggleButton>
              <ToggleButton
                name="natural_illumination"
                color="primary"
                value="natural_illumination"
                fullWidth
                onClick={toggle}
              >
                <WbIncandescentIcon sx={{ mr: 2 }} />
                Natural Illumination
              </ToggleButton>
              <ToggleButton
                name="pets"
                color="primary"
                value="pets"
                fullWidth
                onClick={toggle}
              >
                <PetsIcon sx={{ mr: 2 }} />
                Pets
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PropertyInfoForm;