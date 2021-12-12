import { useState, useRef } from 'react';

import classes from './FileUpload.module.css';

const FileUpload = (props) => {
  const [files, setFiles] = useState({});
  const fileInputField = useRef(null);

  console.log(files);
  return (
    <form method="post" action="#" id="#">
      <div className={classes.files}>
        <label>Upload Your File </label>
        <input
          className={classes["form-control"]}
          type="file"
        // multiple={5}
        />
      </div>
    </form>
  );
};

export default FileUpload;