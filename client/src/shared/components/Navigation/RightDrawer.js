import * as React from 'react';
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

// import classes from './RightDrawer.module.css';

const RightDrawer = () => {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(prevState => !prevState);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
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
        <ListItem button component="a" href="#">
          <ListItemIcon>
            <FilterAltIcon />
          </ListItemIcon>
          <ListItemText primary="Filter" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'right'}>
        <MenuIcon
          fontSize="large"
          onClick={toggleDrawer()}
        />
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