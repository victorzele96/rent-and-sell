import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography, IconButton
} from '@mui/material';

import { Search as SearchIcon } from '../../icons/search';
import SendIcon from '@mui/icons-material/Send';
import ReplayIcon from '@mui/icons-material/Replay';

export const UserListToolbar = (props) => {
  const [searchName, setSearchName] = useState('');

  const searchHandler = (event) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      props.onSearch(searchName);
    }
  }

  const resetHandler = () => {
    setSearchName('');
    props.onReset();
  }

  const searchChangeHandler = (event) => {
    if (event.target.value === '') {
      resetHandler();
      return;
    }
    setSearchName(event.target.value);
  };

  return (
    <Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Users
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ width: 600, display: "flex" }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search User"
                variant="outlined"
                onChange={searchChangeHandler}
                onKeyDown={searchHandler}
                value={searchName}
                sx={{ width: 475 }}
              />
              <IconButton onClick={searchHandler} sx={{ ml: 1 }}>
                <SendIcon sx={{ fontSize: "35px", color: "#1976d2" }} />
              </IconButton>
              {searchName !== '' && (
                <IconButton onClick={resetHandler}>
                  <ReplayIcon sx={{ fontSize: "35px", color: "#1976d2" }} />
                </IconButton>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};