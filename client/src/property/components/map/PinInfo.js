import { Link } from 'react-router-dom';
import { InfoWindow } from '@react-google-maps/api';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 'bold'
  },
  paragraph: {
    marginTop: "5px",
    marginBottom: "5px"
  },
  notBold: {
    fontWeight: 'normal'
  }
}));

const PinInfo = (props) => {
  const classes = useStyles();

  return (
    <InfoWindow
      position={props.selected.location}
      onCloseClick={props.onClose}
    >
      <div className={classes.bold}>
        <address>
          {props.selected.address}
        </address>
        <p className={classes.paragraph}>rooms: {props.selected.details.rooms_num}</p>
        <p className={classes.paragraph}>price: {props.selected.details.price}</p>
        <span>For more info <Link to={'/property/' + props.selected.id} className={classes.notBold}>click here!</Link></span>
      </div>
    </InfoWindow>
  )
}
export default PinInfo;