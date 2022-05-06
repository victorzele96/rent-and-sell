import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Paragraph from "./Paragraph";
import DeployAvatar from "../../shared/components/UIElements/Avatar";

import { styled } from "@mui/material/styles";

import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

import {
  Stack,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Dialog,
  Backdrop,
  CircularProgress,
  DialogTitle,
  DialogActions,
  Divider,
  Button,
  Box
} from "@mui/material";

import FavoritesContext from "../../shared/context/favorites-context";
import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/hooks/http-hook";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import LocalParkingIcon from "@mui/icons-material/LocalParking"; //חניה
import AccessibleIcon from "@mui/icons-material/Accessible"; //נגישות
import CallIcon from "@mui/icons-material/Call"; //צור קשר
import EventIcon from "@mui/icons-material/Event"; //תאריך פירסום
import CommuteIcon from "@mui/icons-material/Commute"; //תחבורה ציבורית
import ConstructionIcon from "@mui/icons-material/Construction"; //מעוצב או משופץ
import DomainIcon from "@mui/icons-material/Domain"; //מוסדות מרכזיים
import FmdGoodIcon from "@mui/icons-material/FmdGood"; //מיקום
import PetsIcon from "@mui/icons-material/Pets"; //בעל"ח
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent"; //האם הבית מואר
import SquareFootIcon from "@mui/icons-material/SquareFoot"; //מ"ר
import HeightIcon from "@mui/icons-material/Height"; //קומה
import HotelIcon from "@mui/icons-material/Hotel"; //מס' חדרים
import SellIcon from "@mui/icons-material/Sell"; //מחירה
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ParkIcon from "@mui/icons-material/Park";

import image from "../../static/images/types-of-homes-hero.png";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    marginBottom: "40px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
  },
  details: {
    svg: {
      marginRight: "20px",
      fontSize: "25px",
    },
  },
  leftIcon: {
    marginRight: "1rem",
  },
  rightIcon: {
    marginLeft: "1rem",
  },
  btn: {
    width: "80px",
    marginLeft: 10,
    marginRight: 10
  },
  btnBox: {
    width: "100%",
    justifyContent: "right",
    display: "flex"
  }
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PropertyItem = (props) => {
  const [expanded, setExpanded] = useState(false);

  const favoritesCtx = useContext(FavoritesContext);
  const authCtx = useContext(AuthContext);

  const { isLoading, error, sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const classes = useStyles();

  const [share, setShare] = useState(false);

  const toggleShare = () => {
    setShare((prev) => !prev);
  };

  const [deleteState, setDeleteState] = useState(false);

  const toggleDeleteState = () => {
    setDeleteState((prev) => !prev);
  };

  const shareUrl = process.env.REACT_APP_FRONT_URL + '/property/' + props.propertyId; // TODO: need to be changed to url with specific item

  const handleExpandClick = () => setExpanded((prevState) => !prevState);

  const editHandler = async () => {
    console.log("Edit");
    // navigate('/add-property', { state: { mode: 'edit', property: props.property } });
  };

  const deleteHandler = async () => {
    console.log("Delete");
    try {
      await sendRequest(
        process.env.REACT_APP_BACK_URL + `/properties/${props.propertyId}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + authCtx.token
        }
      );
      props.onDelete(props.propertyId);
    } catch (err) {
      console.log(err.message);
    }
  };

  let actionIcons;
  let delAndEdit;

  if (!props.preview) {
    const itemIsFavorite = favoritesCtx.itemisFavorite(props.property.id);

    const favoritesHandler = () => {
      if (itemIsFavorite) {
        favoritesCtx.removeFavorite(props.property.id);
      } else {
        favoritesCtx.addFavorite(props.property);
      }

      // TODO: add favorites logic + backend connection
    };

    let showFavoritesBtn = false;
    let showDelEdit = false;
    if (authCtx.user) {
      if (props.property.creator.toString() !== authCtx.user.userId) {
        showFavoritesBtn = true;
      } else {
        showDelEdit = true;
      }
    }

    actionIcons = (
      <>
        {showFavoritesBtn && (
          <IconButton aria-label="add to favorites" onClick={favoritesHandler}>
            <FavoriteIcon color={itemIsFavorite ? "error" : "action"} />
          </IconButton>
        )}
        <IconButton aria-label="share" onClick={toggleShare}>
          <ShareIcon />
        </IconButton>
      </>
    );

    delAndEdit = showDelEdit ? (
      <>
        <Box spacing={2} className={classes.btnBox}>
          <Button
            className={classes.btn}
            variant="outlined"
            onClick={editHandler}
          >
            Edit
          </Button>
          <Button
            className={classes.btn}
            variant="contained"
            onClick={toggleDeleteState}
          >
            Delete
          </Button>
          <Box>
            <Dialog
              open={deleteState}
              onClose={toggleDeleteState}
              aria-labelledby="delete-alert-dialog-title"
              aria-describedby="delete-alert-dialog-description"
            >
              <DialogTitle id="delete-alert-dialog-title">
                Are you sure you want to delete this property?
              </DialogTitle>
              <DialogActions>
                {isLoading && (
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                  >
                    <CircularProgress style={{ marginTop: "40px" }} size={50} thickness={2.5} />
                  </Backdrop>
                )}
                <Button onClick={toggleDeleteState}>Cancel</Button>
                <Button onClick={deleteHandler} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </>
    ) : null;
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<DeployAvatar type="list" fname="arie" lname="fishman" />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.property.address}
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
        {actionIcons}
        {delAndEdit}
        <Dialog onClose={toggleShare} open={share}>
          <DialogTitle style={{ paddingBottom: "10px" }}>Share</DialogTitle>
          <Divider />
          <DialogActions sx={{ width: "250px", justifyContent: "center", paddingTop: "14px" }} onClick={toggleShare}>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
            <TelegramShareButton url={shareUrl}>
              <TelegramIcon size={40} round={true} />
            </TelegramShareButton>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
          </DialogActions>
        </Dialog>
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
            <Typography paragraph letterSpacing={1} fontWeight={"bold"}>
              More Information:
            </Typography>
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<SellIcon className={classes.leftIcon} />}
              info="Listing Status:"
              text={
                "For " + props.property.details.listing_status
              }
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<FmdGoodIcon className={classes.leftIcon} />}
              info="Address:"
              text={props.property.address}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<EventIcon className={classes.leftIcon} />}
              info="Time on RNS:"
              text={props.property.details["creation_date"]}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<AttachMoneyIcon className={classes.leftIcon} />}
              info="Price:"
              text={"₪ " + props.property.details.price}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<ConstructionIcon className={classes.leftIcon} />}
              info="Renovated:"
              text={props.property.details.renovated ? "yes" : "no"}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<HotelIcon className={classes.leftIcon} />}
              info="Rooms Number:"
              text={props.property.details["rooms_num"]}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<SquareFootIcon className={classes.leftIcon} />}
              info="Rooms Size:"
              text={props.property.details["room_size"] + " sq m"}
            />
            <Paragraph
              show={props.property.details.stories ? true : false}
              iconClassName={classes.rightIcon}
              icon={<HeightIcon className={classes.leftIcon} />}
              info="Stories:"
              text={props.property.details.stories}
            />
            <Paragraph
              show={props.property.details.floor ? true : false}
              iconClassName={classes.rightIcon}
              icon={<HeightIcon className={classes.leftIcon} />}
              info="Floor:"
              text={props.property.details.floor}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<LocalParkingIcon className={classes.leftIcon} />}
              info="Parking:"
              text={props.property.details.parking ? "yes" : "no"}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<AccessibleIcon className={classes.leftIcon} />}
              info="Accessiblity:"
              text={props.property.details.accessability ? "yes" : "no"}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<WbIncandescentIcon className={classes.leftIcon} />}
              info="Natural Illumination:"
              text={props.property.details["natural_illumination"] ? "yes" : "no"}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<PetsIcon className={classes.leftIcon} />}
              info="Pets:"
              text={props.property.details.pets ? "yes" : "no"}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<ParkIcon className={classes.leftIcon} />}
              info="Park:"
              text={props.property.details.park ? "yes" : "no"}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<CommuteIcon className={classes.leftIcon} />}
              info="Public Transport:"
              text={props.property.details["public_transport"] ? "yes" : "no"}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<DomainIcon className={classes.leftIcon} />}
              info="Public Institutes:"
              text={props.property.details["public_institutes"] ? "yes" : "no"}
            />
            <Paragraph
              show
              iconClassName={classes.rightIcon}
              icon={<CallIcon className={classes.leftIcon} />}
              info="Contact:"
              text={props.property.details.contact}
            />
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PropertyItem;
