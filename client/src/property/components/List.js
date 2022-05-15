import { Button, Card, Container, Stack } from "@mui/material";

import PropertyItem from "./PropertyItem";

import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";

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
  if (props.load === 'by-property-id') {
    text = 'Could not find property with specified id';
  }

  if (props.load === 'all' || props.load === 'by-user-id') {
    text = 'There are no properties yet. Start adding some?';
  }

  if (props.load === 'favorites') {
    text = 'There are no favorites yet. Start adding some?';
  }

  const content = props.properties.length === 0 ? (
    <Container id={props.tagId} className={classes.container}>
      <Card className={classes.card}>
        <p>{text}</p>
        {props.load === 'by-user-id' && <Button variant="outlined" component={Link} to="/add-property">Add Property</Button>}
      </Card>
    </Container>
  ) : (
    <Stack id={props.tagId || 'list-stack'} spacing="30px" className={classes.listContainerInner}>
      {props.properties.map(property => (
        <PropertyItem
          key={property.id}
          property={property}
          propertyId={property.id}
          onDelete={props.onDelete}
        />
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