import { useEffect, useState } from 'react';

import { DropzoneAreaBase } from 'material-ui-dropzone';

import { Alert, Box, Button } from '@mui/material';

import classes from './FileUpload.module.css';

const FileUpload = (props) => {
  const [images, setImages] = useState([]);
  const [paths, setPaths] = useState([]);
  const [error, setError] = useState(null);

  const addImageHandler = (newImages) => {
    console.log('onAdd', newImages);
    let imagesPaths = [];
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(newImages)) {
      imagesPaths.push(value.file.path);
    }
    setPaths([].concat(paths, imagesPaths));
    setImages([].concat(images, newImages));
    // TODO: add serverside formdata
  };

  const deleteImageHandler = (deleteImage) => {
    console.log('onDelete', deleteImage);

    let indexToDelete = images.indexOf(deleteImage);
    setImages(prevState => prevState.filter(image => images.indexOf(image) !== indexToDelete));

    setPaths(prevState => prevState.filter(path => paths.indexOf(path) !== indexToDelete));
    // TODO: add serverside formdata
  };

  const nextHandler = () => {
    if (images.length === 0) {
      setError('You must upload at least one image.');
    }
    props.onNextClick(error ? [error] : []);
  };

  useEffect(() => {
    if (images.length > 0) {
      setError(null);
    }
  }, [images]);

  useEffect(() => {
    sessionStorage.setItem("new-property-images", JSON.stringify(images));
    sessionStorage.setItem("new-property-images-paths", JSON.stringify(paths));
  }, [images, paths]);

  return (
    <div className={classes.container}>
      <div>
        <DropzoneAreaBase
          style={classes}
          fileObjects={images}
          onAdd={addImageHandler}
          onDelete={deleteImageHandler}
          showPreviews={true}
          showPreviewsInDropzone={false}
          acceptedFiles={['image/*']}
          showFileNames={false}
          showAlerts={false}
          filesLimit={6}
          useChipsForPreview
          previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
          previewChipProps={{ classes: { root: classes.previewChip } }}
          previewText="Selected files"
        />
      </div>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button onClick={props.onBackClick} sx={{ ml: 1 }}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={nextHandler}
          sx={{ ml: 1 }}
        >
          Next
        </Button>
      </Box>
      {error && (
        <Box sx={{ marginTop: '10px' }}>
          <Alert severity="error">
            {error}
          </Alert>
        </Box>
      )}
    </div>
  );
};

export default FileUpload;