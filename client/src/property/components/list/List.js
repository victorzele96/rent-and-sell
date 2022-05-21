import { useState, useEffect, Children } from "react";

import { Button, Card, Container, Stack } from "@mui/material";

import PropertyItem from "../PropertyItem";

import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import Search from "./Search";

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
  const [loadedProperties, setLoadedProperties] = useState(props.properties);
  const [searchValue, setSearchValue] = useState(null);

  const searchHandler = (value) => {
    setSearchValue(value);
  }

  const resetSearch = () => {
    setLoadedProperties(props.properties);
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
    console.log('properties', loadedProperties);
  }, [loadedProperties]);

  const classes = useStyles();

  if (props.isLoading) {
    return (
      <Container id={props.tagId} className={classes.container}>
        <Card className={classes.card}>
          <p>Loading...</p>
        </Card>
      </Container>
    );
  }

  let text;
  let placeHolder;
  if (props.load === 'by-property-id') {
    text = 'Could not find property with specified id';
  }

  if (props.load === 'all' || props.load === 'by-user-id') {
    text = 'There are no properties yet. Start adding some?';
    placeHolder = props.load === 'all' ? "Search..." : 'My Properties...'
  }

  if (props.load === 'favorites') {
    text = 'There are no favorites yet. Start adding some?';
    placeHolder = "Favorites..."
  }

  const content = loadedProperties.length === 0 ? (
    <Container id={props.tagId} className={classes.container}>
      <Card className={classes.card}>
        <p>{text}</p>
        {props.load === 'by-user-id' && <Button variant="outlined" component={Link} to="/add-property">Add Property</Button>}
      </Card>
    </Container>
  ) : (
    <Stack id={props.tagId || 'list-stack'} spacing="30px" className={classes.listContainerInner}>
      {Children.toArray(
        loadedProperties.map((property, key) => (
          <PropertyItem
            property={property}
            propertyId={property.id}
            propertyRate={property.ratings}
            onDelete={props.onDelete}
          />
        ))
      )}
    </Stack>
  )

  return (
    <>
      <Search
        placeHolder={placeHolder}
        setValue={searchHandler}
        onReset={resetSearch}
      />
      {content}
    </>
  );
};

export default List;