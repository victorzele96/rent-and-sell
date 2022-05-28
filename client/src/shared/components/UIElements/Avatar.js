import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';

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
      <Box sx={{ textAlign: "center", mb: 1, mt: 1 }}>
        <p style={{ margin: 0 }}><strong> {"Welcome, "}</strong></p>
        {fname.length + lname.lenth >= 24 ? (
          <>
            <p style={{ margin: 0 }}><strong> {fname}</strong></p>
            <p style={{ margin: 0 }}><strong> {lname}</strong></p>
          </>
        ) : (
          <p style={{ margin: 0 }}><strong> {fname + " " + lname}</strong></p>
        )}
      </Box>

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
    <Stack sx={props.sx}>
      {props.type === 'sidebar' && sidebarAvatar(props.fname, props.lname)}
      {props.type === 'list' && listAvatar(props.fname, props.lname)}
    </Stack>
  );
};

export default DeployAvatar;
