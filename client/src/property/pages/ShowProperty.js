import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Container } from "@mui/material";

import List from '../../property/components/List';

import { useHttpClient } from "../../shared/hooks/http-hook";

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: "fit-content",
    blockSize: "fit-content",
    marginTop: "5vh",
    textAlign: "left",
  }
}));

const ShowProperty = (props) => {
  const { propertyId } = useParams();
  const [loadedProperties, setLoadedProperties] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  const loadProperties = useCallback(async () => {
    let url = process.env.REACT_APP_BACK_URL + `/properties/${propertyId}`;

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
      setLoadedProperties([]);
    }
  }, [sendRequest, propertyId]);

  const deletePropertyHandler = deletedPropertyId => {
    setLoadedProperties(prevState => prevState.filter(property => property.id !== deletedPropertyId));
  };

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const classes = useStyles();

  return (
    <Container id={props.tagId} className={classes.container}>
      <List
        load='by-property-id'
        tagId={props.tagId}
        onDelete={deletePropertyHandler}
        isLoading={isLoading}
        properties={loadedProperties}
      />
    </Container>
  )
}

export default ShowProperty;