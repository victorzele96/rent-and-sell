import { useState } from 'react';

import Paragraph from './Paragraph';
import DeployAvatar from '../../shared/components/UIElements/Avatar';

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

const PropertyItem = (props) => {
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
        title={props.property.title}
        subheader="September 14, 2016" // צריך למשוך תאריך יצירה ולעדכן תאריך ביחס לתאריך הנוכחי
      />
      <CardMedia //card image
        component="img"
        height="auto"
        // paddingTop='56.25%' // 16:9,
        // marginTop='30'
        src={image}
        alt="property image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.property.description}
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
            <Typography paragraph><SellIcon />Listing Status: For {props.property.details.listing_status}</Typography>
            <Paragraph show icon={<FmdGoodIcon />} info="Address:" text={props.property.address} />
            <Paragraph show icon={<EventIcon />} info="Time on RNS:" text={props.property.details.creation_date} />
            <Paragraph show icon={<AttachMoneyIcon />} info="Price:" text={"₪ " + props.property.details.price} />
            <Paragraph show icon={<ConstructionIcon />} info="Renovated:" text={props.property.details.renovated ? "yes" : "no"} />
            <Paragraph show icon={<HotelIcon />} info="Rooms Number:" text={props.property.details.rooms_num} />
            <Paragraph show icon={<SquareFootIcon />} info="Rooms Size:" text={props.property.details.room_size + " sq m"} />
            <Paragraph show={props.property.details.stories ? true : false} icon={<HeightIcon />} info="Stories:" text={props.property.details.stories} />
            <Paragraph show={props.property.details.floor ? true : false} icon={<HeightIcon />} info="Floor:" text={props.property.details.floor} />
            <Paragraph show icon={<LocalParkingIcon />} info="Parking:" text={props.property.details.parking} />
            <Paragraph show icon={<AccessibleIcon />} info="Accessiblity:" text={props.property.details.accessability ? "yes" : "no"} />
            <Paragraph show icon={<WbIncandescentIcon />} info="Natural Illumination:" text={props.property.details.natural_illumination ? "yes" : "no"} />
            <Paragraph show icon={<PetsIcon />} info="Pets:" text={props.property.details.pets ? "yes" : "no"} />
            <Paragraph show icon={<ParkIcon />} info="Park:" text={props.property.details.park ? "yes" : "no"} />
            <Paragraph show icon={<CommuteIcon />} info="Public Transport:" text={props.property.details.public_transport ? "yes" : "no"} />
            <Paragraph show icon={<DomainIcon />} info="Public Institutes:" text={props.property.details.public_institutes ? "yes" : "no"} />
            <Paragraph show icon={<CallIcon />} info="Contact:" text={props.property.details.contact} />
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PropertyItem;
