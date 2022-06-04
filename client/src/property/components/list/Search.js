import { useState } from "react";

import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";

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
    position: 'absolute',
    marginTop: 80
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
  } = usePlacesAutocomplete();

  const classes = useStyles();

  const relevantDataSet = {
    options: status === 'OK' ? data.map(({ description }) => description) : [],
  };

  const selectChangeHandler = async (event, value) => {
    try {
      if (value) {
        const selectedData = data.filter(item => item.description === value);
        const detailsResults = await getDetails({ placeId: selectedData[0].place_id });
        let street;
        if (detailsResults.address_components.length > 1) {
          if (detailsResults.address_components[1].long_name === detailsResults.vicinity) {
            street = detailsResults.address_components[0].long_name.split('Street')[0];
          }
          if (Number(detailsResults.address_components[0].long_name)) {
            street = detailsResults.address_components[1].long_name.split('Street')[0];
          }
        }
        const city = detailsResults.vicinity;
        const country = detailsResults.address_components[detailsResults.address_components.length - 1].long_name;
        setValue(value);
        props.setValue({ street, city, country });
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
              placeholder={props.placeHolder ? props.placeHolder : "Search..."}
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