import { useContext, useEffect, useState } from 'react';
import { Link as routeLink, useNavigate } from 'react-router-dom';

import {
  Card,
  Link,
  Grid,
  Container,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  CircularProgress,
  Backdrop
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import AuthContext from '../../shared/context/auth-context';

/* 
  TODO: 1) check if the form-hook can be used
  TODO: 2) connect to backend
*/


const Auth = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSigninMode, setIsSigninMode] = useState(true);
  const [firstName, setFirstName] = useState({ value: '', isValid: false });
  const [lastName, setLastName] = useState({ value: '', isValid: false });
  const [email, setEmail] = useState({ value: '', isValid: false });
  const [password, setPassword] = useState({ value: '', isValid: false });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', isValid: false });
  const [formData, setFormData] = useState({
    firstName: undefined,
    lastName: undefined,
    email: '',
    password: '',
    confirmPassword: undefined
  });
  const [formIsValid, setFormIsValid] = useState(false);

  // const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const changeHandler = (event) => {
    const enteredValue = event.target.value
    let valid = enteredValue !== '';

    if (event.target.name === 'firstName') {
      setFirstName({ value: enteredValue, isValid: valid });
    }

    if (event.target.name === 'lastName') {
      setLastName({ value: enteredValue, isValid: valid });
    }

    if (event.target.name === 'email') {
      valid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(enteredValue);
      setEmail({ value: enteredValue, isValid: valid });
    }

    if (event.target.name === 'password') {
      valid = enteredValue.length > 5;
      setPassword({ value: enteredValue, isValid: valid });
    }

    if (event.target.name === 'confirmPassword') {
      valid = enteredValue === password.value;
      setConfirmPassword({ value: enteredValue, isValid: valid });
    }
  };

  const switchModeHandler = () => {
    if (isSigninMode) {
      // Sign up
      setFormData(
        {
          ...formData,
          firstName: { value: '', isValid: false },
          lastName: { value: '', isValid: false },
          confirmPassword: { value: '', isValid: false },
        }
      );
      setFormIsValid(false);
    } else {
      // Sign in
      setFormData(
        {
          ...formData,
          firstName: undefined,
          lastName: undefined,
          confirmPassword: undefined
        }
      );
      setFormIsValid(email.isValid && password.isValid);
    }
    setIsSigninMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (!isSigninMode) {
      // Sign up
      setFormIsValid(firstName.isValid && lastName.isValid && email.isValid && password.isValid && confirmPassword.isValid);
    } else {
      // Sign in
      setFormIsValid(email.isValid && password.isValid);
    }
  }, [firstName, lastName, email, password, confirmPassword, formIsValid, isSigninMode]);

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (!isSigninMode) {
      // Sign up
      try {
        setIsLoading(true);
        if (formIsValid) {
          const response = await fetch('http://localhost:9000/api/users/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstName: firstName.value,
              lastName: lastName.value,
              email: email.value,
              password: password.value,
              confirmPassword: confirmPassword.value
            })
          });

          const responseData = await response.json();
          console.log(responseData);
          setIsLoading(false);
          authCtx.signin();
          navigate('/');
        } else {
          throw new Error('User input is not valid, please enter valid input.');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong, please try again.');
      }
    } else {
      // Sign in
      try {
        setIsLoading(true);
        if (formIsValid) {
          const response = await fetch('http://localhost:9000/api/users/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
            })
          });

          const responseData = await response.json();
          console.log(responseData);
          setIsLoading(false);
          authCtx.signin();
          navigate('/');
        } else {
          throw new Error('User input is not valid, please enter valid input.');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong, please try again.');
      }
    }
    setIsLoading(false);
  };

  const content = (
    <>
      {!isSigninMode && (
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              onChange={changeHandler}
            />
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <TextField
          autoFocus={isSigninMode}
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          onChange={changeHandler}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={changeHandler}
        />
      </Grid>
      {!isSigninMode && (
        <>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </>
      )}
    </>
  );

  return (
    <>
      {isLoading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress size={85} thickness={2.5} />
        </Backdrop>
      )}
      <Container id={props.tagId} component="main" maxWidth="xs">
        <CssBaseline />
        <Card sx={{ marginTop: 8, padding: 3, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isSigninMode ? 'Sign In' : 'Sign Up'}
            </Typography>
            <Box component="form" onSubmit={authSubmitHandler} Validate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {content}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isSigninMode ? 'Sign In' : 'Sign Up'}
              </Button>
              <Grid container>
                <Grid item>
                  <Link component={routeLink} to="/auth" onClick={switchModeHandler} variant="body2">
                    {isSigninMode ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                  </Link>
                </Grid>
                {isSigninMode && (
                  <>
                    <Grid item xs sx={{ textAlign: "right" }}>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default Auth;