import { useContext } from "react";

import { Card, Container } from "@mui/material";

import List from '../../property/components/List';

import FavoritesContext from '../../shared/context/favorites-context';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "5vh",
  },
  card: {
    padding: "1rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
    textAlign: "center",
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
      <h1 style={{ textAlign: "center" }}>Favorites</h1>
      <div style={{ textAlign: "left" }}>
        <List load='favorites' />
      </div>
    </>
  )

  return (
    <Container style={favoritesCtx.totalFavorites === 0 ? { width: "fit-content", blockSize: "fit-content" } : null} id={props.tagId} className={classes.container}>
      {content}
    </Container>
  );
};

export default Favorites;