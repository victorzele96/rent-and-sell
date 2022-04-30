import { useState, useEffect } from "react";

import { Card, Container, Stack } from "@mui/material";

import { makeStyles } from '@mui/styles';

import PropertyItem from "./PropertyItem";

import { useHttpClient } from "../../shared/hooks/http-hook";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    "overflow-y": "scroll",
    marginTop: "40px",
    maxHeight: "800px",
  },
  listContainerInner: {
    alignItems: "center",
    paddingBottom: "40px",
    marginTop: "40px",
    "overflow": "hidden"
  },
  loadingContainer: {
    width: "fit-content",
    blockSize: "fit-content",
    marginTop: "5vh",
    textAlign: "center",
  },
  loadingCard: {
    padding: "1rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)"
  },
  container: {
    width: "fit-content",
    blockSize: "fit-content",
    marginTop: "5vh",
    textAlign: "center",

  },
  card: {
    padding: "1rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)"
  }
}));

const List = (props) => {
  const [loadedProperties, setLoadedProperties] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();

  const classes = useStyles();

  const loadProperties = async (load, id) => {
    let url = 'http://localhost:9000/api/properties';
    if (load === 'by_user_id' && id) {
      url += `/user/${id}`;
    }

    if (load === 'by_property_id') {
      url += `/${id}`;
    }

    try {
      const responseData = await sendRequest(url);
      let data = [];
      for (const [key, value] of Object.entries(responseData)) {
        if (value?.length > 1) {
          value.map(item => data.push(item));
        } else {
          data.push(value);
        }
      }
      setLoadedProperties(prevState => prevState.concat(data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    loadProperties(props.load, props.id_prop);
  }, []);

  if (isLoading) {
    return (
      <Container id={props.tagId} className={classes.container}>
        <Card className={classes.card}>
          <p>Loading...</p>
        </Card>
      </Container>
    );
  }

  console.log(loadedProperties);

  const text = props.load === 'by_property_id' ?
    'Could not find property with specified id' :
    'There are no properties yet. Start adding some?';

  const content = loadedProperties.length === 0 ? (
    <Container id={props.tagId} className={classes.container}>
      <Card className={classes.card}>
        <p>{text}</p>
      </Card>
    </Container>
  ) : (
    <Stack id={props.tagId || 'list-stack'} spacing="30px" className={classes.listContainerInner}>
      {loadedProperties.map(item => (
        <PropertyItem key={item.id} property={item} propertyId={item.id} />
      ))}
    </Stack>
  )

  return (
    <>
      {content}
    </>
  );
};

export default List;