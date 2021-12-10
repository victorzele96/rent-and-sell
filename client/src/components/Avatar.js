import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};

const sidebarAvatar = (fname, lname) => {
  return (
    <>
      <Avatar style={{ alignSelf: "center", width: 60, height: 60, fontSize: "30px" }} {...stringAvatar(fname + " " + lname)} />
      <p style={{ marginBottom: 0, alignSelf: "center" }}><strong> {"Welcome, "}</strong></p>
      <p style={{ margin: 0, alignSelf: "center" }}><strong> {fname + " " + lname}</strong></p>
    </>
  );
};

const listAvatar = (fname, lname) => {
  return (
    <>
      <Avatar aria-label="recipe" {...stringAvatar(fname + " " + lname)} />
    </>
  );
};

const DeployAvatar = (props) => {
  return (
    <Stack>
      {props.type === 'sidebar' && sidebarAvatar(props.fname, props.lname)}
      {props.type === 'list' && listAvatar(props.fname, props.lname)}
    </Stack>
  );
};

export default DeployAvatar;
