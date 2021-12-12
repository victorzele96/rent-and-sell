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

const PropertyInfoForm = () => {
  const [propertyType, setPropertyType] = useState('');
  const [renovated, setRenovated] = useState(false);
  const [parking, setParking] = useState(false);
  const [accessibility, setAccessibility] = useState(false);
  const [illumination, setIllumination] = useState(false);
  const [pets, setPets] = useState(false);
  const [park, setPark] = useState(false);
  const [transport, setTransport] = useState(false);
  const [institutes, setInstitutes] = useState(false);

  const propertyTypeChangeHandler = (event) => setPropertyType(event.target.value);
  const renovatedChangeHandler = () => setRenovated(prevState => !prevState);
  const parkingChangeHandler = (event) => setParking(prevState => !prevState);
  const accessibilityChangeHandler = () => setAccessibility(prevState => !prevState);
  const illuminationChangeHandler = () => setIllumination(prevState => !prevState);
  const petsChangeHandler = () => setPets(prevState => !prevState);
  const parkChangeHandler = () => setPark(prevState => !prevState);
  const transportChangeHandler = () => setTransport(prevState => !prevState);
  const institutesChangeHandler = () => setInstitutes(prevState => !prevState);
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Property Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="demo-simple-select-label">Property Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={propertyType}
              label="property-type"
              onChange={propertyTypeChangeHandler}
            >
              <MenuItem value="house">House</MenuItem>
              <MenuItem value="apartment">Apartment</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="stories"
            name="stories"
            label="Stories"
            fullWidth
            autoComplete="stories"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="floor"
            name="floor"
            label="Floor"
            fullWidth
            autoComplete="floor"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="price"
            name="price"
            label="Price"
            fullWidth
            autoComplete="price"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rooms-num"
            name="rooms-num"
            label="Rooms Number"
            fullWidth
            autoComplete="rooms-num"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rooms-size"
            name="rooms-size"
            label="Rooms Size"
            fullWidth
            autoComplete="rooms-size"
            variant="standard"
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
            autoComplete="address"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="contact"
            name="contact"
            label="Contact"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12} sm={6}>
          <ToggleButton
            color="primary"
            value="parking"
            selected={parking}
            fullWidth
            onChange={parkingChangeHandler}
          >
            <LocalParkingIcon sx={{ mr: 2 }} />
            Parking
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            color="primary"
            value="accessibility"
            selected={accessibility}
            fullWidth
            onChange={accessibilityChangeHandler}
          >
            <ConstructionIcon sx={{ mr: 2 }} />
            Accessibility
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            color="primary"
            value="illumination"
            selected={illumination}
            fullWidth
            onChange={illuminationChangeHandler}
          >
            <WbIncandescentIcon sx={{ mr: 2 }} />
            Natural Illumination
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            color="primary"
            value="pets"
            selected={pets}
            fullWidth
            onChange={petsChangeHandler}
          >
            <PetsIcon sx={{ mr: 2 }} />
            Pets
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            color="primary"
            value="park"
            selected={park}
            fullWidth
            onChange={parkChangeHandler}
          >
            <ParkIcon sx={{ mr: 2 }} />
            Park
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            color="primary"
            value="transport"
            selected={transport}
            fullWidth
            onChange={transportChangeHandler}
          >
            <CommuteIcon sx={{ mr: 2 }} />
            Public Transport
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            color="primary"
            value="institutes"
            selected={institutes}
            fullWidth
            onChange={institutesChangeHandler}
          >
            <DomainIcon sx={{ mr: 2 }} />
            Public Institutes
          </ToggleButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            color="primary"
            value="renovated"
            selected={renovated}
            fullWidth
            onChange={renovatedChangeHandler}
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