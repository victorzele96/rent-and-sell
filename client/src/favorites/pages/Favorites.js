import { useContext } from "react";

import { Card, Container } from "@mui/material";

import List from '../../property/components/List';

import FavoritesContext from '../../shared/context/favorites-context';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
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

const Favorites = (props) => {
  const classes = useStyles();

  const favoritesCtx = useContext(FavoritesContext);

  const content = favoritesCtx.totalFavorites === 0 ? (
    <Card className={classes.card}>
      <h1>Favorites</h1>
      <p>You got no favorites yet. Start adding some?</p>
    </Card>
  ) : (
    <>
      <h1>Favorites</h1>
      <List load='favorites' />
    </>
  )

  return (
    <Container id={props.tagId} className={classes.container}>
      {content}
    </Container>
  );
};

export default Favorites;