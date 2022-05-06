import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import Legend from './Legend';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    height: "93.4vh",
    marginTop: "64px"
  }
}));

const Map = props => {
  const [map, setMap] = useState(null);

  const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const classes = useStyles();

  const INITIAL_MAP_CONFIG = {
    center: [31.2530, 34.7915],
    zoom: 8
  };

  return (
    <MapContainer
      center={INITIAL_MAP_CONFIG.center}
      zoom={INITIAL_MAP_CONFIG.zoom}
      className={classes.mapContainer}
      whenCreated={setMap}
    >
      <TileLayer
        attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a> | © Rent-n-Sell 2022</strong>"
        url={`https://api.mapbox.com/styles/v1/jayzpkz/cl17glze8000714pt2eqa32x7/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_GL_API_KEY}`}
      />
      {props.properties.map(property => {
        return (
          <Marker
            key={property.id}
            position={property.location}
            icon={property.details.listing_status === 'rent' ? greenIcon : blueIcon}
          >
            <Popup>
              <address>
                {property.address}
              </address>
              <p style={{ marginTop: "5px", marginBottom: "5px" }}>rooms: {property.details.rooms_num}</p>
              <p style={{ marginTop: "5px", marginBottom: "5px" }}>price: {property.details.price}</p>
              <span>For more info <a href={process.env.REACT_APP_FRONT_URL + '/property/' + property.id}>click here!</a></span>
            </Popup>
          </Marker>
        );
      })}
      <Legend map={map} />
    </MapContainer>
  );
};

export default Map;