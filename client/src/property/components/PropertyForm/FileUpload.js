import { useEffect, useState } from 'react';

import { DropzoneAreaBase } from 'material-ui-dropzone';

import classes from './FileUpload.module.css';

const FileUpload = (props) => {
  const [images, setImages] = useState([]);

  const addImageHandler = (newImages) => {
    console.log('onAdd', newImages);
    setImages([].concat(images, newImages));
    // TODO: add serverside formdata
  };

  const deleteImageHandler = (deleteImage) => {
    console.log('onDelete', deleteImage);

    let indexToDelete = images.indexOf(deleteImage);
    setImages(prevState => prevState.filter(image => images.indexOf(image) !== indexToDelete));
    // TODO: add serverside formdata
  };

  useEffect(() => {
    console.log(images);
    window.sessionStorage.setItem("new-property-images", JSON.stringify(images));
  }, [images]);

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
    </div>
  );
};

export default FileUpload;