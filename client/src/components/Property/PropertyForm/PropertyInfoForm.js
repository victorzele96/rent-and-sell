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

const PropertyInfoForm = () => {
  const [propertyType, setPropertyType] = useState('');
  const [renovated, setRenovated] = useState('');
  const [parking, setParking] = useState('');
  const [accessibility, setAccessibility] = useState('');
  const [illumination, setIllumination] = useState('');
  const [pets, setPets] = useState('');
  const [park, setPark] = useState('');
  const [transport, setTransport] = useState('');
  const [institutes, setInstitutes] = useState('');

  const propertyTypeChangeHandler = (event) => setPropertyType(event.target.value);
  const renovatedChangeHandler = () => setRenovated(prevState => !prevState);
  const parkingChangeHandler = (event) => setParking(event.target.value);
  const accessibilityChangeHandler = (event) => setAccessibility(event.target.value);
  const illuminationChangeHandler = (event) => setIllumination(event.target.value);
  const petsChangeHandler = (event) => setPets(event.target.value);
  const parkChangeHandler = (event) => setPark(event.target.value);
  const transportChangeHandler = (event) => setTransport(event.target.value);
  const institutesChangeHandler = (event) => setInstitutes(event.target.value);
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
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="demo-simple-select-label">Parking</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={parking}
              label="parking"
              onChange={parkingChangeHandler}
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={1}>One Car</MenuItem>
              <MenuItem value={2}>Two Cars</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="demo-simple-select-label">Accessibility</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={accessibility}
              label="accessibility"
              onChange={accessibilityChangeHandler}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="demo-simple-select-label">Natural Illumination</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={illumination}
              label="iillumination"
              onChange={illuminationChangeHandler}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="demo-simple-select-label">Pets</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pets}
              label="pets"
              onChange={petsChangeHandler}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="demo-simple-select-label">Park</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={park}
              label="park]"
              onChange={parkChangeHandler}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="demo-simple-select-label">Public Transport</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={transport}
              label="transport"
              onChange={transportChangeHandler}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" fullWidth >
            <InputLabel id="demo-simple-select-label">Public Institutes</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={institutes}
              label="institutes"
              onChange={institutesChangeHandler}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ToggleButton
            value="renovated"
            selected={renovated}
            fullWidth
            onChange={renovatedChangeHandler}
          >
            <ConstructionIcon sx={{ mr: 2 }} />
            Renovated
          </ToggleButton>
        </Grid>
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
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
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
      </Grid>
    </>
  );
};

export default PropertyInfoForm;