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
  CircularProgress,
} from "@mui/material";

import PropertyInfoForm from "../components/PropertyForm/PropertyInfoForm";
import FileUpload from "../components/PropertyForm/FileUpload";
import PropertyReview from "../components/PropertyForm/PropertyReview";

import { useResponsive } from "../../shared/hooks/responsive-hook";

import { AuthContext } from "../../shared/context/auth-context";
import PropertyContext from "../../shared/context/property-context";

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
  const propertyCtx = useContext(PropertyContext);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [propertyData, setPropertyData] = useState({});

  const { width } = useResponsive();

  const steps = ["Information", "Gallery", "Review"];

  const classes = useStyles();

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('new-property-state'));
    setPropertyData(data);
  }, []);

  const nextHandler = (errors) => {
    if (!errors || errors.length === 0) {
      if (activeStep === steps.length - 1) { // Submit
        propertyCtx.createProperty(authCtx.token);
        if (!propertyCtx.isLoading) {
          setTimeout(() => {
            navigate('/');
          }, 2500);
        }
      }
      if (!propertyCtx.isLoading) {
        setActiveStep(activeStep + 1);
      }

    } else {
      console.log(errors);
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
        return <PropertyReview onBackClick={backHandler} onSubmitClick={nextHandler} property={propertyData} />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <>
      {propertyCtx.isLoading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={propertyCtx.isLoading}
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
            {activeStep === steps.length && (
              <>
                <Typography variant="h5" gutterBottom>
                  Your post was edited successfully.
                </Typography>
                <Typography variant="subtitle1"></Typography>
              </>
            )}
            {activeStep !== steps.length && (
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
