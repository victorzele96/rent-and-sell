import { useState } from 'react';

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

const initialPropertyState = {
  id: Math.floor(Math.random() * 10000),
  description: '',
  img: '',
  address: '',
  details: {
    listing_status: "sale",
    creation_date: '',
    price: '',
    renovated: false,
    rooms_num: 0,
    room_size: 0,
    house_type: "house",
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

  const changeHandler = (event) => {
    // let newPropertyState = { ...initialPropertyState };

    // for (const [key1, value1] of Object.entries(propertyState)) {
    //   if (key1 === 'details') {
    //     for (const [key2, value2] of Object.entries(propertyState[key1])) {
    //       if (key2 === event.target.name) {
    //         console.log(typeof value2);
    //         if (typeof value2 === Boolean) {
    //           console.log(!event.target.value);
    //           setPropertyState({ ...newPropertyState, [key1]: { [key2]: !event.target.value } });
    //         } else {
    //           setPropertyState({ ...newPropertyState, [key1]: { [key2]: event.target.value } });
    //         }
    //       }
    //     }
    //   } else {
    //     if (key1 === event.target.name) {
    //       setPropertyState({ ...newPropertyState, [key1]: event.target.value });
    //     }
    //   }
    // console.log(propertyState);
    // props.onPropertyInfo(propertyState);
    // };

    // TODO: add filtering logic to apartment list
  };

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Property Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="house_type-label">Property Type</InputLabel>
            <Select
              labelId="house_type-label"
              id="house_type"
              name="house_type"
              value={propertyState.details.house_type}
              label="property-type"
              onChange={changeHandler}
              required
            >
              <MenuItem value="house">house</MenuItem>
              <MenuItem value="apartment">apartment</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {propertyState.details.house_type === 'house' && (
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="stories"
              name="stories"
              label="Stories"
              fullWidth
              variant="standard"
              onChange={changeHandler}
            />
          </Grid>
        )}
        {propertyState.details.house_type === 'apartment' && (
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="floor"
              name="floor"
              label="Floor"
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
            type="tel"
            fullWidth
            variant="standard"
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rooms-num"
            name="rooms-num"
            label="Rooms Number"
            fullWidth
            variant="standard"
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rooms-size"
            name="rooms-size"
            label="Rooms Size"
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
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            variant="standard"
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
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
        <Grid item xs={12} sm={6}>
          <ToggleButton
            color="primary"
            value="parking"
            name="parking"
            selected={propertyState.details.parking}
            fullWidth
            onChange={changeHandler}
          >
            <LocalParkingIcon sx={{ mr: 2 }} />
            Parking
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            name="accessibility"
            color="primary"
            value="accessibility"
            selected={propertyState.details.accessibility}
            fullWidth
            onChange={changeHandler}
          >
            <ConstructionIcon sx={{ mr: 2 }} />
            Accessibility
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            name="illumination"
            color="primary"
            value="illumination"
            selected={propertyState.details.illumination}
            fullWidth
            onChange={changeHandler}
          >
            <WbIncandescentIcon sx={{ mr: 2 }} />
            Natural Illumination
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            name="pets"
            color="primary"
            value="pets"
            selected={propertyState.details.pets}
            fullWidth
            onChange={changeHandler}
          >
            <PetsIcon sx={{ mr: 2 }} />
            Pets
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            name="park"
            color="primary"
            value="park"
            selected={propertyState.details.park}
            fullWidth
            onChange={changeHandler}
          >
            <ParkIcon sx={{ mr: 2 }} />
            Park
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            name="transport"
            color="primary"
            value="transport"
            selected={propertyState.details.transport}
            fullWidth
            onChange={changeHandler}
          >
            <CommuteIcon sx={{ mr: 2 }} />
            Public Transport
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            name="institutes"
            color="primary"
            value="institutes"
            selected={propertyState.details.institutes}
            fullWidth
            onChange={changeHandler}
          >
            <DomainIcon sx={{ mr: 2 }} />
            Public Institutes
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            name="renovated"
            color="primary"
            value="renovated"
            selected={propertyState.details.renovated}
            fullWidth
            onChange={changeHandler}
          >
            <ConstructionIcon sx={{ mr: 2 }} />
            Renovated
          </ToggleButton>
        </Grid>
      </Grid>
    </>
  );
};

export default PropertyInfoForm;