import { useState } from 'react';
import { Link as routeLink } from 'react-router-dom';

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
  Avatar
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useForm } from '../../shared/hooks/form-hook';

const Auth = (props) => {
  // const authCtx = useContext(AuthContext);
  const [isSigninMode, setIsSigninMode] = useState(true);
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const changeHandler = (event) => {
    setFormData(
      {
        ...formState.inputs,
        [event.target.name]: event.target.value
      },
      formState.inputs.email.isValid && formState.inputs.password.isValid
    );
  };

  const switchModeHandler = () => {
    if (!isSigninMode) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
          lastName: undefined,
          confirmPassword: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: {
            value: '',
            isValid: false
          },
          lastName: {
            value: '',
            isValid: false
          },
          confirmPassword: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsSigninMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    console.log(formState);
    // if (isSigninMode) {
    //   try {
    //     const responseData = await sendRequest(
    //       process.env.REACT_APP_BACKEND_URL + '/users/login',
    //       'POST',
    //       JSON.stringify({
    //         email: formState.inputs.email.value,
    //         password: formState.inputs.password.value
    //       }),
    //       {
    //         'Content-Type': 'application/json'
    //       }
    //     );
    //     authCtx.signin(responseData.userId, responseData.token);
    //   } catch (err) { }
    // } else {
    //   try {
    //     const formData = new FormData();
    //     formData.append('firstName', formState.inputs.firstName.value);
    //     formData.append('lastName', formState.inputs.lastName.value);
    //     formData.append('email', formState.inputs.email.value);
    //     formData.append('password', formState.inputs.password.value);
    //     formData.append('confirmPassword', formState.inputs.confirmPassword.value);
    //     const responseData = await sendRequest(
    //       process.env.REACT_APP_BACKEND_URL + '/users/signup',
    //       'POST',
    //       formData
    //     );

    //     authCtx.signin(responseData.userId, responseData.token);
    //   } catch (err) { }
    // }
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
      <Container component="main" maxWidth="xs">
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