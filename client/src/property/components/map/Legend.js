// import "./Legend.css";

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  legend: {
    position: 'absolute',
    zIndex: 10,
    borderRadius: '4px',
    padding: '6px 8px',
    font: '14px Arial, Helvetica, sans-serif',
    background: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '24px',
    color: '#555',
    bottom: 0,
    marginBottom: '3rem',
    left: '0.5rem'
  },
  title: {
    textAlign: 'center',
    fontSize: '16px',
    margin: '2px 12px 8px',
    color: '#777'
  },
  span: {
    position: 'relative',
    bottom: '3px'
  },
  i: {
    width: '12px',
    height: '18px',
    float: 'left',
    margin: '0 8px 0 0',
    opacity: 0.7,
    backgroundSize: '12px',
    backgroundColor: 'rgba(255, 255, 255, 1)'
  },
  greenIcon: {
    backgroundImage: 'url(https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png)',
    backgroundRepeat: 'no-repeat'
  },
  blueIcon: {
    backgroundImage: 'url(https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png)',
    backgroundRepeat: 'no-repeat'
  }
}));

const Legend = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.legend}>
      <h4 className={classes.title}>Legend</h4>
      <i className={`${classes.i} ${classes.greenIcon}`}></i><span className={classes.span}>For rent</span><br></br>
      <i className={`${classes.i} ${classes.blueIcon}`}></i><span className={classes.span}>For sale</span><br></br>
    </div >
  );
};

export default Legend;