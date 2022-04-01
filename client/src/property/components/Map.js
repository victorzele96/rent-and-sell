import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { Container } from '@mui/material';

// import classes from './Map.module.css';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    height: "93.4vh",
  }
}));

const Map = props => {
  const classes = useStyles();

  return (
    <MapContainer center={[31.2530, 34.7915]} zoom={8} className={classes.mapContainer}>
      <TileLayer
        attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a> | © Rent-n-Sell 2022</strong>"
        url="https://api.mapbox.com/styles/v1/jayzpkz/cl17glze8000714pt2eqa32x7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamF5enBreiIsImEiOiJjbDE2bjEwaW4wdm9jM2lzZ2MycnpucTlvIn0.jKddlYK37E-_QZ09prgopQ"
      />
      {props.properties.map(property => {
        return (
          <Marker key={property.id} position={property.location}>
            <Popup>
              <address>
                {property.address}
              </address>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;