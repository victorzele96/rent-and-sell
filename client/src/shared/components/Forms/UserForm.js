import { useEffect, useState } from "react";

import {
  Dialog,
  DialogActions,
  Button,
  TextField,
  Box
} from "@mui/material";

import CircularProgressModal from "../UIElements/CircularProgressModal";

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-around",
    padding: 20
  },
}));

const UserForm = (props) => {
  const [userState, setUserState] = useState();
  const classes = useStyles();

  const cancelHandler = () => {
    props.onCancel();
  };

  const submitHandler = () => {
    props.onSubmit(userState);
  };

  const changeHandler = (event) => {
    setUserState(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    setUserState(props.user)
  }, [props.user]);

  useEffect(() => { console.log(userState) }, [userState]);

  return (
    <>
      <Dialog
        open={props.open}
        onClose={cancelHandler}
      >
        {props.isLoading && (
          <CircularProgressModal />
        )}

        <DialogActions sx={{ width: "250px", height: "350px", justifyContent: "center" }}>
          <Box className={classes.form}>
            <TextField
              required
              fullWidth
              name="firstName"
              label="First Name"
              type="text"
              id="firstName"
              onChange={changeHandler}
              className={classes.text}
              value={userState?.firstName || ''}
            />
            <TextField
              required
              fullWidth
              name="lastName"
              label="Last Name"
              type="text"
              id="lastName"
              onChange={changeHandler}
              className={classes.text}
              value={userState?.lastName || ''}
            />
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              type="text"
              id="email"
              onChange={changeHandler}
              className={classes.text}
              value={userState?.email || ''}
            />
            <Box sx={{ mt: 2 }}>
              <Button
                onClick={cancelHandler}
                sx={{ float: "left" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={submitHandler}
                sx={{ float: "right" }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserForm;