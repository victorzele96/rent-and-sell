import { Box, Button } from '@mui/material';

import PropertyItem from "../PropertyItem";

const PropertyReview = (props) => {
  console.log(props.property);
  const submitHandler = () => {
    props.onSubmitClick();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PropertyItem preview={true} property={props.property} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {props.activeStep !== 0 && (
          <Button onClick={props.onBackClick} sx={{ ml: 1 }}>
            Back
          </Button>
        )}

        <Button
          variant="contained"
          onClick={submitHandler}
          sx={{ ml: 1 }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default PropertyReview;