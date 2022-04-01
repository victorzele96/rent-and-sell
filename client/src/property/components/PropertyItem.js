import { useState, useContext } from 'react';

import Paragraph from './Paragraph';
import DeployAvatar from '../../shared/components/UIElements/Avatar';

import { styled } from '@mui/material/styles';

import {
  Stack,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography
} from '@mui/material';

import FavoritesContext from '../../shared/context/favorites-context';

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

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    marginBottom: "40px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)"
  },
  details: {
    svg: {
      marginRight: "20px",
      fontSize: "25px"
    }
  },
  leftIcon: {
    marginRight: "1rem"
  },
  rightIcon: {
    marginLeft: "1rem"
  },
}));

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

  const favoritesCtx = useContext(FavoritesContext);

  const itemIsFavorite = favoritesCtx.itemisFavorite(props.property.id);

  const classes = useStyles();

  const handleExpandClick = () => setExpanded(prevState => !prevState);

  const favoritesHandler = () => {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.property.id,
        title: props.property.title,
        description: props.property.description,
        img: props.property.image,
        address: props.property.address,
        location: props.property.location,
        details: props.property.details,
        creator: props.property.creator
      });
    }

    // TODO: add favorites logic + backend connection
  };

  const shareHandler = () => {
    // TODO: add share api
  };

  return (
    <Card className={classes.root}>
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
        src={image}
        alt="property image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.property.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={favoritesHandler}
        >
          <FavoriteIcon
            color={itemIsFavorite ? "error" : "action"}
          />
        </IconButton>
        <IconButton aria-label="share" onClick={shareHandler}>
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
          <Stack spacing={3} className={classes.details}>
            <Typography paragraph letterSpacing={1} fontWeight={"bold"}>More Information:</Typography>
            <Paragraph show iconClassName={classes.rightIcon} icon={<SellIcon className={classes.leftIcon} />} info="Listing Status" text={"Listing Status: For " + props.property.details.listing_status} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<FmdGoodIcon className={classes.leftIcon} />} info="Address:" text={props.property.address} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<EventIcon className={classes.leftIcon} />} info="Time on RNS:" text={props.property.details.creation_date} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<AttachMoneyIcon className={classes.leftIcon} />} info="Price:" text={"₪ " + props.property.details.price} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<ConstructionIcon className={classes.leftIcon} />} info="Renovated:" text={props.property.details.renovated ? "yes" : "no"} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<HotelIcon className={classes.leftIcon} />} info="Rooms Number:" text={props.property.details.rooms_num} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<SquareFootIcon className={classes.leftIcon} />} info="Rooms Size:" text={props.property.details.room_size + " sq m"} />
            <Paragraph show={props.property.details.stories ? true : false} iconClassName={classes.rightIcon} icon={<HeightIcon className={classes.leftIcon} />} info="Stories:" text={props.property.details.stories} />
            <Paragraph show={props.property.details.floor ? true : false} iconClassName={classes.rightIcon} icon={<HeightIcon className={classes.leftIcon} />} info="Floor:" text={props.property.details.floor} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<LocalParkingIcon className={classes.leftIcon} />} info="Parking:" text={props.property.details.parking} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<AccessibleIcon className={classes.leftIcon} />} info="Accessiblity:" text={props.property.details.accessability ? "yes" : "no"} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<WbIncandescentIcon className={classes.leftIcon} />} info="Natural Illumination:" text={props.property.details.natural_illumination ? "yes" : "no"} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<PetsIcon className={classes.leftIcon} />} info="Pets:" text={props.property.details.pets ? "yes" : "no"} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<ParkIcon className={classes.leftIcon} />} info="Park:" text={props.property.details.park ? "yes" : "no"} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<CommuteIcon className={classes.leftIcon} />} info="Public Transport:" text={props.property.details.public_transport ? "yes" : "no"} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<DomainIcon className={classes.leftIcon} />} info="Public Institutes:" text={props.property.details.public_institutes ? "yes" : "no"} />
            <Paragraph show iconClassName={classes.rightIcon} icon={<CallIcon className={classes.leftIcon} />} info="Contact:" text={props.property.details.contact} />
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PropertyItem;
