import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from "@mui/material";

import PropertyInfoForm from "../components/PropertyForm/PropertyInfoForm";
import FileUpload from "../components/PropertyForm/FileUpload";
import PropertyReview from "../components/PropertyForm/PropertyReview";

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
  const [activeStep, setActiveStep] = useState(0);
  const [propertyData, setPropertyState] = useState({});

  const steps = ["Information", "Gallery", "Review"];

  const classes = useStyles();

  const nextHandler = () => {
    setActiveStep(activeStep + 1);

    let images = [];
    try {
      images = [...JSON.parse(window.sessionStorage.getItem("new-property-images"))];
    } catch (e) {
      console.log(e);
    }

    const property = {
      ...JSON.parse(sessionStorage.getItem("new-property-state")),
      images
    };

    setPropertyState(property)
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
    // <Container maxWidth={false} className={classes.container}>
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
    </Container>
    // </Container>
  );
};

export default NewProperty;
