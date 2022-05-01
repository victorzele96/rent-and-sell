import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Alert,
  Backdrop,
  CircularProgress
} from "@mui/material";

import PropertyInfoForm from "../components/PropertyForm/PropertyInfoForm";
import FileUpload from "../components/PropertyForm/FileUpload";
import PropertyReview from "../components/PropertyForm/PropertyReview";

import { useHttpClient } from "../../shared/hooks/http-hook";

import AuthContext from "../../shared/context/auth-context";

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    "overflow-y": "scroll",
    marginTop: "40px",
    // maxHeight: "660px",
    // maxWidth: "1300px"
  },
  innerContainer: {
    alignItems: "center",
    // paddingBottom: "40px",
    marginBottom: "32px",
    // "overflow": "hidden"
  }
}));

const NewProperty = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useHttpClient();
  const [activeStep, setActiveStep] = useState(0);
  const [propertyData, setPropertyData] = useState({});

  const steps = ["Information", "Gallery", "Review"];

  const classes = useStyles();

  const requestHandler = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACK_URL + '/properties',
        'POST',
        JSON.stringify({
          description: propertyData.description,
          address: propertyData.address,
          images: propertyData.images,
          creator: authCtx.userId,
          details: propertyData.details
        }),
        {
          'Content-Type': 'application/json'
        },
        'no-cors'
      );
    } catch (err) {
      console.log(err);
    }

    // setTimeout(() => {
    //   navigate('/');
    // }, 5000);
  };

  const nextHandler = () => {
    setActiveStep(activeStep + 1);

    let images;
    try {
      images = JSON.parse(window.sessionStorage.getItem("new-property-images"));
    } catch (e) {
      console.log(e);
    }

    const property = {
      ...JSON.parse(sessionStorage.getItem("new-property-state")),
      images
    };

    setPropertyData(property);

    if (activeStep === steps.length - 1) { // Submit
      console.log(propertyData);
      // TODO: send data to backend server
      requestHandler();
    }
  };

  const backHandler = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PropertyInfoForm />;
      case 1:
        return <FileUpload />;
      case 2:
        return <PropertyReview property={propertyData} />;
      default:
        throw new Error("Unknown step");
    }
  };

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
      <Container id={props.tagId} component="main" className={classes.innerContainer}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Add Property
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Your post was added successfully.
                </Typography>
                <Typography variant="subtitle1"></Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "2rem" }}>
                  {activeStep !== 0 && (
                    <Button onClick={backHandler} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={nextHandler}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </>
        </Paper>
        {error && (
          <Box id="error-container" sx={{ marginTop: '20px' }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </Container>
    </>
  );
};

export default NewProperty;
