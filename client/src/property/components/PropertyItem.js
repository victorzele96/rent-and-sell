import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DeployAvatar from "../../shared/components/UIElements/Avatar";

import Paragraph from "./Paragraph";
import Report from "./Report";
import ShareProperty from "./ShareProperty";
import HoverRating from "./HoverRating";
import ImageGallery from "./carousel/ImageGallery";

import { styled } from "@mui/material/styles";

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
  Box,
  MenuItem,
  Menu,
} from "@mui/material";

import FavoritesContext from "../../shared/context/favorites-context";
import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useResponsive } from "../../shared/hooks/responsive-hook";

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
  const [currentValue, setCurrentValue] = useState(0);
  const [openGallery, setOpenGallery] = useState(false);

  const favoritesCtx = useContext(FavoritesContext);
  const authCtx = useContext(AuthContext);

  const { isLoading, sendRequest } = useHttpClient();
  const navigate = useNavigate();
  const { width } = useResponsive();

  const classes = useStyles();

  const [share, setShare] = useState(false);

  const toggleShare = () => {
    setShare((prev) => !prev);
  };

  const [deleteState, setDeleteState] = useState(false);

  const toggleDeleteState = () => {
    setDeleteState((prev) => !prev);
  };

  const handleExpandClick = () => setExpanded((prevState) => !prevState);

  const viewHandler = () => {
    navigate(`/property/${props.propertyId}`);
  };

  const editHandler = async () => {
    sessionStorage.setItem("edit-property", JSON.stringify(props.property));
    navigate(`/edit-property/${props.propertyId}`);
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
      setDeleteState(false);
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
      </>
    ) : null;
  }

  const options = [
    'Report'
  ];

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [menuOption, setMenuOption] = useState();

  const moreMenuSelectHandler = (event) => {
    setMenuOption(event.target.value);
  };

  const moreMenuOpenHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMoreMenuHandler = () => {
    setAnchorEl(null);
  };

  const closeModalHandler = () => {
    setMenuOption(null);
  };

  const closeModalGalleryHandler = () => {
    setOpenGallery(false);
  };

  const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  }

  const formatMovementDate = (date) => {
    const daysPassed = calcDaysPassed(new Date(), date);

    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat("he-IL").format(date);
  };
  let creation_date = props.property.details.creation_date ? props.property.details.creation_date : new Date();
  const days = formatMovementDate(new Date(creation_date));

  const round = (value, step = 1.0) => {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
  };

  useEffect(() => {
    if (!props.preview) {
      let avg = 0;
      if (props.propertyRate) {
        if (props.propertyRate.length > 0) {
          props.propertyRate.map((rate) => {
            avg += rate.userRating;
            return avg;
          });
          avg = avg / props.propertyRate.length;
          setCurrentValue(round(avg - 0.01));
        }
      }
    }
  }, [props.propertyRate, props.preview]);

  const getWidth = () => {
    if (width <= 425) {
      return width * 0.97;
    }
    if (width > 425 && width <= 768) {
      return width * 0.8;
    }
    if (width > 768) {
      return 700;
    }
  };

  return (
    <>
      <ImageGallery
        open={openGallery}
        onClose={closeModalGalleryHandler}
        images={props.property.images}
      />
      {menuOption === 0 && (
        <>
          <Report propertyId={props.propertyId} onClose={closeModalHandler} />
        </>
      )}
      <Card className={classes.root} sx={{ width: getWidth() }}>
        <CardHeader
          avatar={<DeployAvatar type="list" fname="arie" lname="fishman" />}
          action={
            <>
              {(authCtx.user && authCtx.user.userId.toString() !== props.property.creator.toString() && !props.preview) && (
                <IconButton
                  aria-label="more"
                  id="more-button"
                  aria-controls={openMenu ? 'more-menu' : undefined}
                  aria-expanded={openMenu ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={moreMenuOpenHandler}
                >
                  <MoreVertIcon />
                </IconButton>
              )}
              <Menu
                id="more-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={openMenu}
                onClose={closeMoreMenuHandler}
                PaperProps={{
                  style: {
                    width: '10ch',
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} onClick={moreMenuSelectHandler}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </>
          }
          title={props.property.address}
          subheader={days}
        />
        <CardMedia //card image
          onClick={() => setOpenGallery(true)}
          component="img"
          height='250px'
          sx={{ objectFit: 'cover', cursor: 'pointer' }}
          src={props.property.images[0]}
          alt="property image"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.property.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Box sx={{ width: "100%" }}>
            {!props.preview && (
              <Box sx={{ ml: 1, mb: "0.5rem" }}>
                <HoverRating
                  property={props.property}
                  currentValue={currentValue}
                />
              </Box>
            )}
            <Box>
              <Box sx={{ float: "left" }}>{actionIcons}</Box>
              <Box sx={{ float: 'right' }}>
                <Box sx={{ float: 'left' }} >
                  {!props.preview && (
                    <Button
                      className={classes.btn}
                      variant="outlined"
                      onClick={viewHandler}
                    >
                      View
                    </Button>
                  )}
                  {delAndEdit}
                </Box>
                <Box sx={{ float: 'right' }}>
                  <Dialog onClose={toggleShare} open={share}>
                    <DialogTitle style={{ paddingBottom: "10px" }}>Share</DialogTitle>
                    <Divider />
                    <ShareProperty propertyId={props.property.id} />
                  </Dialog>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </Box>
              </Box>
            </Box>
          </Box>
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
    </>
  );
};

export default PropertyItem;
