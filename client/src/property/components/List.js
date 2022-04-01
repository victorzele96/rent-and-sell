import { useState, useEffect } from "react";

import { Card, Container, Stack } from "@mui/material";

import { makeStyles } from '@mui/styles';

import PropertyItem from "./PropertyItem";

import DUMMY_DATA from "./propertyData";

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
  }
}));

const List = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProperties, setLoadedProperties] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    setLoadedProperties(DUMMY_DATA);
    // fetch('https://learn-react-1-8c84e-default-rtdb.firebaseio.com/meetups1.json')
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     const meetups = [];

    //     for (const key in data) {
    //       const meetup = {
    //         id: key,
    //         ...data[key]
    //       };
    //       meetups.push(meetup);
    //     }

    //   setIsLoading(false);
    //   setLoadedMeetups(meetups);
    // });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Container className={classes.loadingContainer}>
        <Card className={classes.loadingCard}>
          <p>Loading...</p>
        </Card>
      </Container>
    );
  }

  return (
    // <Container maxWidth={false} className={classes.listContainer}>
    <Stack spacing="30px" className={classes.listContainerInner}>
      {loadedProperties.map(item => (
        <PropertyItem key={item.id} property={item} />
      ))}
    </Stack>
    // </Container>
  );
};

export default List;