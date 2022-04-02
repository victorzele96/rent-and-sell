import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';

import ConstructionIcon from '@mui/icons-material/Construction';
import PetsIcon from '@mui/icons-material/Pets';
import ParkIcon from '@mui/icons-material/Park';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import DomainIcon from '@mui/icons-material/Domain';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { ToggleButtonGroup } from '@mui/material';

const initialPropertyState = {
  id: Math.floor(Math.random() * 10000),
  description: '',
  img: '',
  address: '',
  details: {
    listing_status: "sale",
    creation_date: new Intl.DateTimeFormat('He-IL').format(),
    // `${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(new Date().getFullYear()).padStart(2, '0')}`,
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
    for (const [key1, value1] of Object.entries(propertyState)) {
      if (key1 === 'details') {
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
    console.log(propertyState);
  }, [propertyState]);

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Property Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="property_type-label">Property Type</InputLabel>
            <Select
              labelId="property_type-label"
              id="property_type"
              name="property_type"
              value={propertyState.details.property_type}
              // value="house"
              label="property-type"
              onChange={houseTypeChangeHandler}
              required
            >
              <MenuItem value="house">house</MenuItem>
              <MenuItem value="apartment">apartment</MenuItem>
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
            id="rooms_size"
            name="rooms_size"
            label="Rooms Size"
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