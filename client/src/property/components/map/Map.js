import { useCallback, useRef, useState, Children, useEffect } from 'react';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import { useResponsive } from '../../../shared/hooks/responsive-hook';

import PinInfo from './PinInfo';
import Search from './Search';
import LocateMe from './LocateMe';
import Legend from './Legend';
import Filter from './Filter';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    height: '93.4vh',
    marginTop: '64px'
  }
}));

const INITIAL_MAP_CONFIG = {
  center: {
    lat: 31.6146791,
    lng: 35.0083167
  },
  zoom: 9
};

const libraries = ["places"];

const version = 'beta';

const Map = (props) => {
  const [loadedProperties, setLoadedProperties] = useState();
  const [selected, setSelected] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const { width, height } = useResponsive();

  const classes = useStyles();

  const { isLoaded, laodError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
    version
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }, street, city, country) => {
    mapRef.current.panTo({ lat, lng });
    if (street && street !== city) {
      console.log(street, city, country);
      mapRef.current.setZoom(17);
    }
    if (!city && country) {
      console.log(street, city, country);
      mapRef.current.setZoom(7);
    }
    if (!street && city) {
      console.log(street, city, country);
      mapRef.current.setZoom(10);
    }
  }, []);

  const getIcon = useCallback((type) => {
    if (type === 'rent') {
      return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
    }
    if (type === 'sale') {
      return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'
    }
    return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
  }, []);

  const searchHandler = (value) => {
    setSearchValue(value);
  }

  const filterHandler = (value) => {
    setFilterValue(value);
  }

  const resetSearch = () => {
    setLoadedProperties(props.properties);
    mapRef.current.panTo(INITIAL_MAP_CONFIG.center);
    mapRef.current.setZoom(INITIAL_MAP_CONFIG.zoom);
  };

  useEffect(() => {
    setLoadedProperties(props.properties);
  }, [props.properties]);

  useEffect(() => {
    if (searchValue) {
      setLoadedProperties(prevState => prevState.filter(property => {
        if (searchValue.street && searchValue.city && searchValue.country) {
          return (
            property.address.includes(searchValue.street) &&
            property.address.includes(searchValue.city) &&
            property.address.includes(searchValue.country)
          );
        }
        if (!searchValue.street && !searchValue.city && searchValue.country) {
          return property.address.includes(searchValue.country);
        }
        if (!searchValue.street && searchValue.city && searchValue.country) {
          return (
            property.address.includes(searchValue.city) &&
            property.address.includes(searchValue.country)
          );
        }
        return null;
      }));
    } else {
      console.log('its null');
    }
  }, [searchValue]);

  useEffect(() => {
    if (filterValue) {
      setLoadedProperties(prevState => prevState.filter(property => {
        let keepFlag = false;
        for (const [key1, value1] of Object.entries(property)) {
          if (key1 in filterValue) {
            if (value1 === filterValue[key1]) {
              keepFlag = true;
            } else {
              return null;
            }
          } else if (key1 === 'details') {
            for (const [key2, value2] of Object.entries(property.details)) {
              if (key2 in filterValue) {
                if (key2 !== 'rooms_num') {
                  if (value2 === filterValue[key2]) {
                    keepFlag = true;
                  } else {
                    return null;
                  }
                } else {
                  if (filterValue.rooms_num === 0) {
                    continue;
                  } else {
                    if (value2 === filterValue.rooms_num) {
                      keepFlag = true;
                    } else {
                      return null;
                    }
                  }
                }
              }
            }
          }
        }
        if (keepFlag) return property;
        return null;
      }));
    } else {
      console.log('its null');
    }
  }, [filterValue]);

  const mapClickHandler = () => {
    setSelected(null);
  }

  const getHeight = () => {
    if (height < 1000) return '93.4vh';
    if (height >= 1000 && height < 1050) return '94.5vh';
    if (height >= 1050) return '94.7vh';
  };

  const getMarginTop = () => {
    if (height <= 650) {
      return '43px';
    }
    if (height <= 800) {
      return '54px';
    }
    if (height <= 900) {
      return '56px';
    }
    return '64px';
  };

  if (laodError) return "Error loading maps;"
  if (!isLoaded) return "loading maps;"

  return (
    <>
      <Search
        initLocation={INITIAL_MAP_CONFIG.center}
        setValue={searchHandler}
        onReset={resetSearch}
        panTo={panTo}
      />
      <LocateMe panTo={panTo} />
      <Legend />
      <Filter
        onFilter={filterHandler}
        onReset={resetSearch}
      />
      <GoogleMap
        id="rns-map"
        onClick={mapClickHandler}
        // mapContainerClassName={classes.mapContainer}
        mapContainerStyle={{
          height: getHeight(),
          marginTop: getMarginTop()
        }}
        zoom={INITIAL_MAP_CONFIG.zoom}
        center={INITIAL_MAP_CONFIG.center}
        options={{
          disableDefaultUI: true,
          zoomControl: width <= 450 ? false : true
        }}
        onLoad={onMapLoad}
      >
        {Children.toArray(
          loadedProperties.map((property, key) => (
            <>
              <Marker
                position={property.location}
                icon={{
                  url: getIcon(property.details.listing_status),
                  scaledSize: new window.google.maps.Size(24, 42),
                }}
                onClick={() => {
                  setSelected({ ...property })
                }}
              />
            </>
          ))
        )}
        {selected ? (
          <>
            <PinInfo selected={selected} onClose={() => { setSelected(null) }} />
          </>
        ) : null}
      </GoogleMap>
    </>
  );
};

export default Map;