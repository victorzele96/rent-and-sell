import List from '../../property/components/List';

import classes from './Favorites.module.css';

const Favorites = (props) => {
  return (
    <section className={classes["favorites-section"]}>
      <h1>Favorites</h1>
      <List properties={props.properties} />
    </section>
  );
};

export default Favorites;