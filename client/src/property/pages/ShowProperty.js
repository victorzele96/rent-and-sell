import { useContext } from "react";
import { useParams } from "react-router-dom";

import { Container } from "@mui/material";

import List from '../../property/components/List';

import AuthContext from "../../shared/context/auth-context";

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: "fit-content",
    blockSize: "fit-content",
    marginTop: "5vh",
    textAlign: "center",

  }
}));

const ShowProperty = (props) => {
  const { propertyId } = useParams();
  const authCtx = useContext(AuthContext);
  const classes = useStyles();

  return (
    <Container id={props.tagId} className={classes.container}>
      <List id_prop={propertyId} load='by_property_id' />
    </Container>
  )
}

export default ShowProperty;