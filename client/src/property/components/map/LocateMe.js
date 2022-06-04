import { useState } from "react";

import { IconButton } from "@mui/material";

import { useResponsive } from '../../../shared/hooks/responsive-hook';

import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  locateMe: {
    position: 'absolute',
    zIndex: 10
  }
}));

const LocateMe = (props) => {
  const [locate, setLocate] = useState(false);
  const { width } = useResponsive();

  const classes = useStyles();

  const locateHandler = () => {
    if (!locate) {
      navigator.geolocation.getCurrentPosition((position) => {
        props.panTo({ lat: position.coords.latitude, lng: position.coords.longitude })
      },
        (err) => {
          setLocate(false)
          console.log('Please enable location to use this feature.');
          alert('Please enable location to use this feature.');
        }
      )
    }
    setLocate(prevState => !prevState);
  };

  const getRight = () => {
    if (width <= 329) return '0.5rem';
    if (width >= 330 && width <= 375) return '1.7rem';
    if (width >= 361) return '0rem';
  };

  const getFontSize = () => {
    if (width <= 415) return '30px';
    return '40px';
  };

  const getTop = () => {
    if (width <= 414) return '10rem';
    if (width === 415) return '5.8rem';
    return '5.5rem';
  };

  return (
    <IconButton
      className={classes.locateMe}
      sx={{
        svg: {
          fontSize: getFontSize(),
          color: locate ? '#1976d2' : 'rgba(0, 0, 0, 0.6)'
        },
        top: getTop(),
        right: getRight()
      }}
      onClick={locateHandler}
    >
      {!locate && <LocationSearchingIcon />}
      {locate && <MyLocationIcon />}
    </IconButton>
  )
}
export default LocateMe;