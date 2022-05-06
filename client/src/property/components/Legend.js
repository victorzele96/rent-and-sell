import { useEffect } from "react";
import L from 'leaflet';

import "./Legend.css";

const Legend = ({ map }) => {

  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomright" });

      legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Legend</h4>";
        div.innerHTML += '<i class="icon" style="background-image: url(https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png);background-repeat: no-repeat;"></i><span>For rent</span><br>';
        div.innerHTML += '<i class="icon" style="background-image: url(https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png);background-repeat: no-repeat;"></i><span>For sale</span><br>';
        return div;
      };

      legend.addTo(map);
    }
  }, [map]); //here add map
  return null;
};

export default Legend;