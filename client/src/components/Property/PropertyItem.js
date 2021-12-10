import { useState } from 'react';

import DeployAvatar from '../Avatar';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import LocalParkingIcon from '@mui/icons-material/LocalParking'; //חניה
import AccessibleIcon from '@mui/icons-material/Accessible'; //נגישות
import CallIcon from '@mui/icons-material/Call'; //צור קשר
import EventIcon from '@mui/icons-material/Event'; //תאריך פירסום
import CheckIcon from '@mui/icons-material/Check'; //ווי
import ClearIcon from '@mui/icons-material/Clear'; //איקס
import CommuteIcon from '@mui/icons-material/Commute'; //תחבורה ציבורית
import ConstructionIcon from '@mui/icons-material/Construction'; //מעוצב או משופץ
import DomainIcon from '@mui/icons-material/Domain'; //מוסדות מרכזיים
import FmdGoodIcon from '@mui/icons-material/FmdGood'; //מיקום
import PetsIcon from '@mui/icons-material/Pets'; //בעל"ח
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent'; //האם הבית מואר
import SquareFootIcon from '@mui/icons-material/SquareFoot'; //מ"ר
import HeightIcon from '@mui/icons-material/Height'; //קומה
import HotelIcon from '@mui/icons-material/Hotel'; //מס' חדרים
import SellIcon from '@mui/icons-material/Sell'; //מחירה
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ParkIcon from '@mui/icons-material/Park';

import image from '../../static/images/types-of-homes-hero.png';

import classes from './PropertyItem.module.css';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PropertyItem = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(prevState => !prevState);

  return (
    <Card sx={{ maxWidth: 700, marginTop: 10 }}>
      <CardHeader
        avatar={
          <DeployAvatar type="list" fname="arie" lname="fishman" />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Villa in San Andreas"
        subheader="September 14, 2016"
      />
      <CardMedia //card image
        component="img"
        height="auto"
        paddingTop='56.25%' // 16:9,
        marginTop='30'
        src={image}
        alt="property image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          One of the most impressive villas in Los Santos.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes["advanced-info"]}>
          <Typography paragraph letterSpacing={1} fontWeight={"bold"}>More Information:</Typography>
          <div className={classes.content}>
            <Typography paragraph><SellIcon />Listing Status: For Sale</Typography>
            <Typography paragraph><EventIcon />Days on RNS: 3 hours</Typography>
            <Typography paragraph><AttachMoneyIcon />Price: ₪ 1,750,000</Typography>
            <Typography paragraph><FmdGoodIcon />Address: 5454 Interstate 55 North Frontage Rd, Jackson, MS 39211, United States</Typography>
            <Typography paragraph><ConstructionIcon />Renovated: <ClearIcon /></Typography>
            <Typography paragraph><HotelIcon />Rooms Number: 3 Rooms</Typography>
            <Typography paragraph><SquareFootIcon />Room Size: 75 sq m</Typography>
            <Typography paragraph><HeightIcon />Stories: 2</Typography>
            <Typography paragraph><LocalParkingIcon />Parking: 1 car</Typography>
            <Typography paragraph><AccessibleIcon />Accessablity: <CheckIcon /></Typography>
            <Typography paragraph><WbIncandescentIcon />Natural Illumination: <CheckIcon /></Typography>
            <Typography paragraph><PetsIcon />Pets: <ClearIcon /></Typography>
            <Typography paragraph><ParkIcon />Park: <ClearIcon /></Typography>
            <Typography paragraph><CommuteIcon />Public Transport: <CheckIcon /></Typography>
            <Typography paragraph><DomainIcon />Public Institutes: <CheckIcon /></Typography>
            <Typography paragraph><CallIcon />Contact: +97251944245</Typography>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PropertyItem;
