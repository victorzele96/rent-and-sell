import { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import classes from './Map.module.css';

const Map = props => {
  return (
    <MapContainer center={[31.2530, 34.7915]} zoom={8} className={classes["map-container"]}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {props.properties.map(property => {

      })} */}
      <Marker position={[31.2530, 34.7915]}>
        <Popup>
          ARIE ADD MAP TO HIS REACT PROJECT <br /> AND IT LOOKS NICEEEE!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
