import { useEffect, useRef, useState } from 'react';

import {
  Paper,
  Grid,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
  Container,
  Card,
  InputAdornment
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)"
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  container: {
    marginTop: "1rem",
  },
  chatMessageCard: {
    width: "fit-content",
    blockSize: "fit-content",
    marginTop: "16px",
    paddingRight: "16px",
    paddingLeft: "16px",
    marginBottom: "16px",
    overflow: "hidden",
  },
  chatMessageGrid: {
    padding: "8px",
  },
  chatMessageOuterGrid: {
    paddingRight: "20px",
    maxWidth: "300px",
    paddingLeft: "20px",
    textAlign: "center"
  },
  right: {
    marginLeft: "auto",
    backgroundColor: "#1d8dfde0",
    color: "#fff",
    borderRadius: "16px"
  },
  left: {
    marginRight: "auto",
    backgroundColor: "#e4e4e4",
    color: "black",
    borderRadius: "16px"
  },
});

const initialChatMessages = [
  {
    user: 'John Wick',
    message: "Hey man, What's up ?",
    time: '09:30'
  },
  {
    user: 'Remy Sharp',
    message: "Hey, Iam Good! What about you ?",
    time: '09:31'
  },
  {
    user: 'John Wick',
    message: "Cool. i am good, let's catch up!",
    time: '10:30'
  },
];

const initialUsers = [
  {
    name: 'John Wick',
    avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
    id: 'u1'
  },
  {
    name: 'Remy Sharp',
    avatarUrl: "https://material-ui.com/static/images/avatar/1.jpg",
    id: 'u2'
  },
  {
    name: 'Alice',
    avatarUrl: "https://material-ui.com/static/images/avatar/3.jpg",
    id: 'u3'
  },
  {
    name: 'Cindy Baker',
    avatarUrl: "https://material-ui.com/static/images/avatar/2.jpg",
    id: 'u4'
  },
];

const Chats = (props) => {
  const classes = useStyles();

  const messagesEndRef = useRef(null);

  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [users, setUsers] = useState(initialUsers);
  const [message, setMessage] = useState("");

  // const userChangeHandler = (event) => {
  //   setUsers(event.target.value);
  // };

  const onEnterUserChangeHandler = (event) => {
    if (event.key === 'Enter') {
      setMessage(event.target.value);
      setUsers(initialUsers);
      sendMessageHandler();

      // TODO: add backend logic
    }
  };

  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const sendMessageHandler = () => {
    console.log(users);
    if (users && message) {
      setChatMessages([...chatMessages, { user: users.filter(user => user.name === 'John Wick')[0].name, message: message, time: `${new Date().getHours()}:${new Date().getMinutes()}` }]);
      setMessage('');

      // TODO: add backend logic
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  const listChatMessages = chatMessages.map((chatMessage, index) => {
    return (
      <>
        <ListItem key={'message' + index.toString()}>
          <Grid container className={classes.chatMessageGrid}>
            <Card className={`${classes.ChatMessageCard} ${chatMessage.user === 'John Wick' ? classes.right : classes.left}`}>
              <Grid item xs={12} className={classes.chatMessageOuterGrid}>
                <ListItemText align={chatMessage.user === 'John Wick' ? "right" : "left"} primary={chatMessage.message} />
              </Grid>
              <Grid item xs={12} className={classes.chatMessageOuterGrid}>
                <ListItemText align={chatMessage.user === 'John Wick' ? "right" : "left"} secondary={chatMessage.time} />
              </Grid>
            </Card>
          </Grid>
        </ListItem>
        <div name="bottom-scroll-point" ref={messagesEndRef} />
      </>
    );
  });

  const usersList = users.map((user, index) => {
    return (
      <>
        {user.name !== 'John Wick' && (
          <ListItem button key={'user' + index.toString()}>
            <ListItemIcon>
              <Avatar alt={user.name} src={user.avatarUrl} />
            </ListItemIcon>
            <ListItemText primary={user.name}>`${user.name}`</ListItemText>
            <ListItemText secondary="online" align="right" />
          </ListItem>
        )}
      </>
    );
  });

  return (
    <Container id={props.tagId} className={classes.container} maxWidth={false}>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
              </ListItemIcon>
              <ListItemText primary="John Wick"></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField
              id="outlined-basic-search"
              placeholder="Search"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Divider />
          <List>
            {usersList}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {listChatMessages}
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField
                onKeyPress={onEnterUserChangeHandler}
                id="outlined-basic-email"
                label="Message"
                value={message}
                onChange={messageChangeHandler}
                fullWidth />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab
                onClick={sendMessageHandler}
                color="primary"
                aria-label="add"
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chats;