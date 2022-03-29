import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import DeployAvatar from '../UIElements/Avatar';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ChatIcon from '@mui/icons-material/Chat';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import Filter from './Filter';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import classes from './RightDrawer.module.css';

const RightDrawer = () => {
  const [state, setState] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => setExpanded(prevState => !prevState);

  const toggleDrawer = (anchor, open) => (event) => {
    /* 
      wont effect the toggle for clicking any key except
      F1 - F12, Esc, Print Screen, Scroll Lock, Pause|Break, 
      Insert, Home, End, Page Up, Page Down,
      other spacial keys that not for typing.
    */
    if (event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift' || event.key === 'Backspace'
        || event.key === 'Alt' || event.key === 'Control' || event.key === ' '
        || event.key === 'Delete' || event.key === 'Enter' || event.key === 'Space'
        || event.key === 'CapsLock'
        || (event.keyCode >= 37 && event.keyCode <= 40)
        || (event.keyCode >= 47 && event.keyCode <= 57)
        || (event.keyCode >= 65 && event.keyCode <= 91)
        || (event.keyCode >= 96 && event.keyCode <= 107)
        || (event.keyCode >= 109 && event.keyCode <= 111)
        || event.keyCode === 144 || event.keyCode === 110
        || (event.keyCode >= 186 && event.keyCode <= 192)
        || (event.keyCode >= 219 && event.keyCode <= 222)
        || event.keyCode === 226)) {
      return;
    }
    setState(prevState => !prevState);
  };

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

  const list = (anchor) => (
    <Box
      className={classes.drawer}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem style={{ margin: "auto", display: "inline-block" }} >
          <ListItemIcon />
          <DeployAvatar type="sidebar" fname="Dear" lname="Guest" />
        </ListItem>
        {true ? ( //change to state!!!!
          <ListItem
            button
            component={Link}
            to="/signin"
            onClick={toggleDrawer(anchor, false)}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        )}
      </List>
      <Divider />
      <div onClick={toggleDrawer(anchor, false)}>
        <List>
          <ListItem button component={Link} to="/favorites">
            <ListItemIcon>
              <BookmarkAddIcon />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
          <ListItem button component={Link} to="/chats">
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Chats" />
          </ListItem>
          <ListItem button component={Link} to="/add-property">
            <ListItemIcon>
              <AddBusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Add Property" />
          </ListItem>
        </List>
      </div>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <FilterAltIcon />
          </ListItemIcon>
          <ListItemText primary="Filter" />
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </ListItem>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Filter />
        </Collapse>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'right'}>
        <IconButton
          onClick={toggleDrawer()}
          className={classes.menueBtn}
        >
          <MenuIcon
          // fontSize="large"
          />
        </IconButton>
        <Drawer
          anchor={'right'}
          open={state}
          onClose={toggleDrawer()}
        >
          {list('right')}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default RightDrawer;