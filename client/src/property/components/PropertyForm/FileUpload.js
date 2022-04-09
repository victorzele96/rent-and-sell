import { useEffect } from 'react';

import classes from './FileUpload.module.css';

const FileUpload = (props) => {

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const selectFilesHandler = (event) => {
    const images = event.target.files;

    // Object.values(images).map(image => {
    //   console.log(typeof image.type);
    //   if (image.type !== "image/jpg" || image.type !== "image/jpeg" || image.type !== "image/png") {
    //     console.error('wrong file type');
    //   }
    //   return image;
    // });
    Object.values(images).map(image => getBase64(image).then(base64 => {
      let imagesBase64 = [];
      const currentSession = JSON.parse(window.sessionStorage.getItem('new-property-images'));

      if (currentSession) {
        imagesBase64 = imagesBase64.concat(currentSession);
      }

      imagesBase64.push(base64);
      window.sessionStorage.setItem('new-property-images', JSON.stringify(imagesBase64));
    }));
  };

  useEffect(() => {
    window.sessionStorage.removeItem('new-property-images');
  }, []);

  return (
    <form method="post" action="#" id="#">
      <div className={classes.files}>
        <label>Upload Your File </label>
        <input
          className={classes["form-control"]}
          type="file"
          multiple={true}
          accept="image/*"
          onChange={selectFilesHandler}
        />
      </div>
    </form>
  );
};

export default FileUpload;