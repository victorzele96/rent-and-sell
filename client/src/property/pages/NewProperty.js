import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Backdrop,
  CircularProgress
} from "@mui/material";

import PropertyInfoForm from "../components/PropertyForm/PropertyInfoForm";
import FileUpload from "../components/PropertyForm/FileUpload";
import PropertyReview from "../components/PropertyForm/PropertyReview";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useResponsive } from "../../shared/hooks/responsive-hook";

import { AuthContext } from "../../shared/context/auth-context";

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    "overflow-y": "scroll",
    marginTop: "40px",
  },
  innerContainer: {
    alignItems: "center",
    marginBottom: "32px",
  }
}));

const NewProperty = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, sendRequest } = useHttpClient();
  const [activeStep, setActiveStep] = useState(0);
  const [propertyData, setPropertyData] = useState({});

  const { width } = useResponsive();

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
          details: propertyData.details
        }),
        {
          'Authorization': 'Bearer ' + authCtx.token,
          'Content-Type': 'application/json'
        },
      );

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('new-property-state'));
    setPropertyData(data);
  }, []);

  const nextHandler = (errors) => {
    if (errors.length === 0) {
      setActiveStep(activeStep + 1);

      // let images;
      let paths;
      try {
        // images = JSON.parse(window.sessionStorage.getItem("new-property-images"));
        paths = JSON.parse(sessionStorage.getItem("new-property-images-paths"));
      } catch (e) {
        console.log(e);
      }

      const property = {
        ...JSON.parse(sessionStorage.getItem("new-property-state")),
        images: paths
      };

      setPropertyData(property);

      if (activeStep === steps.length - 1) { // Submit
        console.log(propertyData);
        // TODO: send data to backend server
        requestHandler();
      }
    }
  };

  const backHandler = () => {
    if (activeStep === 0) {
      navigate(-1);
    } else {
      setActiveStep(activeStep - 1);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PropertyInfoForm onBackClick={backHandler} onNextClick={nextHandler} />;
      case 1:
        return <FileUpload onBackClick={backHandler} onNextClick={nextHandler} />;
      case 2:
        return <PropertyReview onBackClick={backHandler} onNextClick={nextHandler} property={propertyData} />;
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
                <StepLabel>{width <= 375 ? '' : label}</StepLabel>
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
              </>
            )}
          </>
        </Paper>
      </Container>
    </>
  );
};

export default NewProperty;
