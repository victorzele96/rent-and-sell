import { useState, useEffect, useCallback } from "react";

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
  const { isLoading, sendRequest } = useHttpClient();
  // const [filterState, setFilterState] = useState(null);

  const classes = useStyles();

  const loadProperties = useCallback(async (load, id) => {
    let url = process.env.REACT_APP_BACK_URL + '/properties';

    if (load === 'by_user_id') {
      url += `/user/${id}`;
    }

    if (load === 'by_property_id') {
      url += `/${id}`;
    }

    try {
      const responseData = await sendRequest(url);
      let data;
      let data_arr = [];
      let flag = false;
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
          if (false) {
            console.log(key);
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

  // const customFilter = useCallback(() => {
  //   if (filterState) {
  //     setLoadedProperties(prevState => prevState.filter((property) => {
  //       let flag = false;
  //       loop1:
  //       for (const [key1, value1] of Object.entries(property)) {
  //         if (key1 === 'address' || key1 === 'street') {
  //           continue;
  //         }
  //         loop2:
  //         for (const [key2, value2] of Object.entries(filterState)) {
  //           if (key1 === key2) {
  //             if (value1 === value2) {
  //               flag = true;
  //             } else {
  //               break loop1;
  //             }
  //           }
  //         }
  //       }
  //       if (flag) {
  //         return property;
  //       }
  //     }));
  //   } else {

  //   }
  // }, [filterState]);

  useEffect(() => {
    // try {
    //   setFilterState(JSON.parse(window.sessionStorage.getItem("filter-state")));
    // } catch (err) {
    //   console.log(err.message);
    // }
    loadProperties(props.load, props.id_prop);
    // customFilter();
  }, [loadProperties, props.load, props.id_prop]);

  if (isLoading) {
    return (
      <Container id={props.tagId} className={classes.container}>
        <Card className={classes.card}>
          <p>Loading...</p>
        </Card>
      </Container>
    );
  }

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
        <PropertyItem key={item.id} property={item} propertyId={item.id} onDelete={deletePropertyHandler} />
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