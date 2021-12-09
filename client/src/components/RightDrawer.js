import * as React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ChatIcon from '@mui/icons-material/Chat';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import classes from './RightDrawer.module.css';
import DeployAvatar from './Avatar';

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
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className={classes.avatar}>
        <ListItem>
          <ListItemIcon />
          <DeployAvatar fname="Arie" lname="Fishman" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component="a" href="#">
          <ListItemIcon>
            <BookmarkAddIcon />
          </ListItemIcon>
          <ListItemText primary="Favorites" />
        </ListItem>
        <ListItem button component="a" href="#">
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chats" />
        </ListItem>
        <ListItem button component="a" href="#">
          <ListItemIcon>
            <AddBusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Add Property" />
        </ListItem>
      </List>
      <Divider />
      <List>

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