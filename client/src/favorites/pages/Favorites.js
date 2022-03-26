import List from '../../property/components/List';

const Favorites = (props) => {
  return (
    <section style={{ "textAlign": "center", "marginTop": "5rem", "fontSize": "2rem" }}>
      <h1>Favorites</h1>
      <List properties={props.properties} />
    </section>
  );
};

export default Favorites;