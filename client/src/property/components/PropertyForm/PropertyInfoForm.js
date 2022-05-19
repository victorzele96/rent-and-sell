import { useEffect, useState } from 'react';

import usePlacesAutocomplete from "use-places-autocomplete";

import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
  Alert,
  Box,
  Button
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
  const [selectedArray, setSelectedArray] = useState([]); // radio buttons
  const [selectedValue, setSelectedValue] = useState(""); // address
  const [errors, setError] = useState([]);

  const {
    // eslint-disable-next-line
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const autocompleteChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const selectChangeHandler = (event, value) => {
    setSelectedValue(value);
    changeHandler(event);
  };

  const relevantDataSet = {
    options: status === 'OK' ? data.map(({ description }) => description) : [],
  };

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

  const nextHandler = () => {
    props.onNextClick(errors);
  };

  const createError = (message) => {
    if (!errors.includes(message)) {
      setError(prevState => prevState.concat(message));
    }
  };

  const clearError = (prop) => {
    console.log(errors.some(err => err.includes(prop)))
    if (errors.some(err => err.includes(prop))) {
      setError(prevState => prevState.filter(err => !err.includes(prop)));
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const changeHandler = (event) => {
    // eslint-disable-next-line
    for (const [key1, value1] of Object.entries(propertyState)) {
      if (key1 === 'details') {
        // eslint-disable-next-line
        for (const [key2, value2] of Object.entries(propertyState.details)) {
          if (key2 === event.target.name) {
            if (key2 === 'address') {
              if (event.target.value === '' || relevantDataSet.includes(event.target.value)) {
                createError(`${key2} must be legit address (google format)!`);
              } else {
                clearError(key2);
              }
            }
            if (key2 === 'contact') {
              // eslint-disable-next-line
              if (event.target.value === '' || !/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/.test(event.target.value)) {
                createError(`${key2} number must be legit Israeli number!`);
              } else {
                clearError(key2);
              }
            }
            if (key2 === 'stories' || key2 === 'floor' || key2 === 'price' || key2 === 'rooms_num' || key2 === 'room_size') {
              if (event.target.value === '0' || event.target.value === 0) {
                createError(`${key2} can not be 0!`);
              } else {
                clearError(key2);
              }
            }
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
          if (key1 === 'description') {
            if (event.target.value === '' || event.target.value.length < 5) {
              createError(`${key1} must be at least 5 characters long!`);
            } else {
              clearError(key1);
            }
          }
          setPropertyState(prevState => ({ ...prevState, [key1]: event.target.value }));
        }
      }
    }
    if (relevantDataSet.options.includes(selectedValue)) {
      setPropertyState(prevState => ({ ...prevState, address: selectedValue }));
    }
  };

  useEffect(() => {
    sessionStorage.setItem("new-property-state", JSON.stringify(propertyState));
  }, [propertyState, selectedValue]);

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
        <Grid item xs={12}>
          <Autocomplete
            popupIcon={null}
            onChange={selectChangeHandler}
            {...relevantDataSet}
            id="address"
            blurOnSelect
            renderInput={(params) => (
              <>
                <TextField
                  onChange={autocompleteChangeHandler}
                  {...params}
                  variant="standard"
                  label="Address"
                />
              </>
            )}
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
        <ToggleButtonGroup
          sx={{ ml: 3, width: { lg: "40%" } }}
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
            selected={propertyState.details.park || false}
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
            selected={propertyState.details.public_transport || false}
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
            selected={propertyState.details.public_institutes || false}
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
            selected={propertyState.details.renovated || false}
          >
            <ConstructionIcon sx={{ mr: 2 }} />
            Renovated
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          sx={{ ml: { lg: 25, xs: 3 }, width: { lg: "40%" } }}
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
            selected={propertyState.details.parking || false}
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
            selected={propertyState.details.accessiblity || false}
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
            selected={propertyState.details.natural_illumination || false}
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
            selected={propertyState.details.pets || false}
          >
            <PetsIcon sx={{ mr: 2 }} />
            Pets
          </ToggleButton>
        </ToggleButtonGroup>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {props.activeStep !== 0 && (
              <Button onClick={props.onBackClick} sx={{ ml: 1 }}>
                Back
              </Button>
            )}

            <Button
              variant="contained"
              onClick={nextHandler}
              sx={{ ml: 1 }}
              disabled={errors.length > 0}
            >
              Next
            </Button>
          </Box>
          {errors.length > 0 && (
            <Box id="error-container" sx={{ marginTop: '20px' }}>
              {errors.map(err => (
                <Box key={errors.indexOf(err)} sx={{ marginTop: '10px' }}>
                  <Alert severity="error">
                    {err}
                  </Alert>
                </Box>
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default PropertyInfoForm;