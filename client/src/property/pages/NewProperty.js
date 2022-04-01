import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropertyInfoForm from "../components/PropertyForm/PropertyInfoForm";
import PropertyGalleryForm from "../components/PropertyForm/PropertyGalleryForm";
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

  const steps = ["Information", "Gallery", "Review"];

  const [form, setForm] = useState({});

  const classes = useStyles();

  const propertyInfoHandler = (propertyData) => {
    setForm({ ...propertyData });
    console.log(form);
  };

  const nextHandler = () => {
    setActiveStep(activeStep + 1);
  };

  const backHandler = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PropertyInfoForm onPropertyInfo={propertyInfoHandler} />;
      case 1:
        return <PropertyGalleryForm />;
      case 2:
        return <PropertyReview />;
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
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
