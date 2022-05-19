import { useState } from "react";

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

import { Autocomplete, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from '@mui/icons-material/Replay';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    position: 'absolute',
    top: '1rem',
    left: '50%',
    transform: 'translate(-50%)',
    width: '100%',
    maxWidth: '300px',
    zIndex: 10,
    display: 'flex',
  },
  search: {
    left: '50%',
    width: '100%',
    maxWidth: '300px',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '8px',
    borderColor: 'black'
  },
  inputIconContainer: {
    width: '100%',
    marginBottom: '10px'
  },
  inputIcon: {
    position: 'absolute'
  },
  icon: {
    top: 10,
    minWidth: '40px',
  },
  resetIcon: {
    top: '5rem',
    height: '40px',
  }
}));

const Search = (props) => {
  const [resetHelper, setResetHelper] = useState(new Date().toISOString());

  const {
    setValue,
    suggestions: {
      status,
      data
    },
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => props.initLocation.lat, lng: () => props.initLocation.lng },
      radius: 800 * 1000,
    }
  });

  const classes = useStyles();

  const relevantDataSet = {
    options: status === 'OK' ? data.map(({ description }) => description) : [],
  };


  const selectChangeHandler = async (event, value) => {
    try {
      if (value) {
        const geoCodeResults = await getGeocode({ address: value });
        const { lat, lng } = getLatLng(geoCodeResults[0]);
        props.panTo({ lat, lng });
        setValue(value);
        props.setValue({ address: value, location: { lat, lng } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetHandler = () => {
    setResetHelper(new Date().toISOString());
    props.onReset();
  };

  return (
    <div className={classes.searchContainer}>
      <Autocomplete
        key={resetHelper}
        className={classes.search}
        popupIcon={null}
        onChange={selectChangeHandler}
        sx={{ mt: '80px', width: { xs: "125px", sm: "400px", md: "500px", lg: "600px" }, maxWidth: '300px' }}
        {...relevantDataSet}
        id="blur-on-select"
        blurOnSelect
        renderInput={(params) => (
          <div className={classes.inputIconContainer}>
            <SearchIcon className={`${classes.inputIcon} ${classes.icon}`} />
            <TextField
              placeholder="Search..."
              className={classes.input}
              onChange={(event) => setValue(event.target.value)}
              {...params}
            />
          </div>
        )}
      />
      <IconButton
        className={classes.resetIcon}
        sx={{ svg: { fontSize: '27px' } }}
        onClick={resetHandler}
      >
        <ReplayIcon />
      </IconButton>
    </div>
  )
}
export default Search;