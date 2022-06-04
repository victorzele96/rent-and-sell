import { useState, useCallback, useEffect, useContext } from "react";

import PropertyContext from "../../shared/context/property-context";

import { useHttpClient } from "../../shared/hooks/http-hook";

import List from "../components/list/List";
import Map from "../components/map/Map";

const AllProperties = (props) => {
  const [loadedProperties, setLoadedProperties] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();
  const propertyCtx = useContext(PropertyContext);

  const loadProperties = useCallback(async () => {
    let url = process.env.REACT_APP_BACK_URL + '/properties';

    try {
      const responseData = await sendRequest(url);
      let data;
      let data_arr = [];
      let flag = false;
      // eslint-disable-next-line
      for (const [key, value] of Object.entries(responseData)) {
        if (Array.isArray(value)) {
          data = value;
          flag = true;
        } else {
          if (value?.length > 1) {
            value.map(item => data_arr.push(item));
          } else {
            data_arr.push(value);
          }
        }
      }
      setLoadedProperties(prevState => prevState.concat(flag ? data : data_arr));
    } catch (err) {
      console.log(err.message);
    }
  }, [sendRequest]);

  const deletePropertyHandler = deletedPropertyId => {
    setLoadedProperties(prevState => prevState.filter(property => property.id !== deletedPropertyId));
  };

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  useEffect(() => {
    propertyCtx.addProperty(loadedProperties);
  }, [loadedProperties]);

  return (
    <>
      {props.toggle && (
        <Map
          properties={loadedProperties}
        />
      )}
      {!props.toggle && (
        <List
          load='all'
          tagId={props.tagId}
          onDelete={deletePropertyHandler}
          isLoading={isLoading}
          properties={loadedProperties}
        />
      )}
    </>
  )
}
export default AllProperties;