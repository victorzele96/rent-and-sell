import { useContext } from "react";

import { Container } from "@mui/material";

import List from '../../property/components/List';

import AuthContext from "../../shared/context/auth-context";

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: "fit-content",
    blockSize: "fit-content",
    marginTop: "5vh",
    textAlign: "left",
  }
}));

const MyProperties = (props) => {
  const authCtx = useContext(AuthContext);
  const classes = useStyles();

  return (
    <Container id={props.tagId} className={classes.container}>
      <List id_prop={authCtx.userId} load='by_user_id' />
    </Container>
  )
}

export default MyProperties;