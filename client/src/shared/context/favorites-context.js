import { createContext, useState } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteProperty) => { },
  removeFavorite: (propertyId) => { },
  itemisFavorite: (propertyId) => { }

});

export const FavoritesContextProvider = (props) => {
  const [userFavorites, setUserFavorites] = useState([]);

  const addFavoriteHandler = (favoriteProperty) => {
    setUserFavorites(prevUserFavorites => prevUserFavorites.concat(favoriteProperty));
  };

  const removeFavoriteHandler = (propertyId) => {
    setUserFavorites(prevUserFavorites => prevUserFavorites.filter(property => property.id !== propertyId));
  };

  const itemIsFavoriteHandler = (propertyId) => {
    return userFavorites.some(property => property.id === propertyId);
  };

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemisFavorite: itemIsFavoriteHandler
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;