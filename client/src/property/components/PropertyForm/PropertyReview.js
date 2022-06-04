import { useContext, useEffect } from 'react';

import { Box, Button } from '@mui/material';

import PropertyContext from '../../../shared/context/property-context';

import PropertyItem from "../PropertyItem";

const PropertyReview = (props) => {
  const propertyCtx = useContext(PropertyContext);
  const submitHandler = () => {
    props.onSubmitClick();
  };

  // const uploadImage = useCallback(async () => {
  //   const url = `https://api.cloudinary.com/v1_1/rent-and-sell/image/upload`;
  //   const formData = new FormData();
  //   let imagesUrl = [];
  //   setIsLoading(true);
  //   for (const image of propertyCtx.propertyForm.images) {
  //     formData.append('file', image);
  //     formData.append('upload_preset', 'junk_images');
  //     const data = await fetch(url, {
  //       method: 'POST',
  //       body: formData
  //     }).then(r => r.json());
  //     imagesUrl.push(data.secure_url);
  //     console.log(data);
  //   }
  //   setIsLoading(false);
  //   setImgUrl(imagesUrl[0]);
  // }, [setImgUrl]);

  useEffect(() => {
    propertyCtx.uploadImage('rns-properties');
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PropertyItem preview={true} property={propertyCtx.propertyForm} />
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