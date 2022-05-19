import { useContext } from "react";

import { Container } from "@mui/material";

import List from '../components/list/List';

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
  const favoritesCtx = useContext(FavoritesContext);

  const deletePropertyHandler = deletedPropertyId => {
    favoritesCtx.removeFavorite(deletedPropertyId);
  };

  const classes = useStyles();

  return (
    <Container sx={favoritesCtx.totalFavorites === 0 ? { width: "fit-content", blockSize: "fit-content" } : null} id={props.tagId} className={classes.container}>
      <List
        load='favorites'
        tagId={props.tagId}
        onDelete={deletePropertyHandler}
        properties={favoritesCtx.favorites}
      />
    </Container>
  );
};

export default Favorites;