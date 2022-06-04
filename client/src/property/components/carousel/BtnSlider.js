import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import "./Slider.css";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  arrow: {
    backgroundColor: 'rgb(255, 255, 255, 0.6)',
    width: '40px',
    height: '40px'
  },
}));
const BtnSlider = (props) => {
  const classes = useStyles();

  return (
    <button
      onClick={props.moveSlide}
      className={`${props.direction === "next" ? "btn-slide next" : "btn-slide prev"} ${classes.arrow}`}
    >
      {props.direction === "next" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </button>
  );
}

export default BtnSlider;