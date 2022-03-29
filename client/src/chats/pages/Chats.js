import { useState } from 'react';

import {
  Box, Container, Divider, FormControl, Grid, IconButton,
  List, ListItem, ListItemText, Paper, TextField, Typography
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import classes from './Chats.module.css';

const Chats = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      user: 'John',
      message: 'Hi!'
    }
  ]);

  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessageHandler = () => {
    if (user && message) {
      console.log("Send!");
    }
  };

  const listChatMessages = chatMessages.map((chatMessage, index) => {
    return (
      <ListItem key={index}>
        <ListItemText primary={`${chatMessage.user}: ${chatMessage.message}`} />
      </ListItem>
    );
  });

  return (
    <Container>
      <Paper elevation={5} className={classes["chats-paper"]}>
        <Box p={3}>
          <Typography variant="h4" gutterBottom>
            Happy Chatting!
          </Typography>
          <Divider />
          <Grid container spacing={4} alignItems="center">
            <Grid className={classes["chat-window"]} xs={12} item>
              <List className={classes["chat-window-messages"]}>
                {listChatMessages}
              </List>
            </Grid>
            <Grid xs={2} item>
              <FormControl fullWidth>
                <TextField
                  onChange={handleUserChange}
                  value={user}
                  label="Nickname"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid xs={9} item>
              <FormControl fullWidth>
                <TextField
                  onChange={handleMessageChange}
                  value={message}
                  label="Type your message..."
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid xs={1} item>
              <IconButton
                onClick={sendMessageHandler}
                aria-label="send"
                color="primary"
              >
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chats;