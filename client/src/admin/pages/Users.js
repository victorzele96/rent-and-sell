import { useEffect, useCallback, useState, useContext } from 'react';

import { Box, Container } from '@mui/material';
import { UserListResults } from '../components/user/UserListResults';
import { UserListToolbar } from '../components/user/UserListToolbar';
import { DashboardLayout } from '../components/DashboardLayout';

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from '../../shared/context/auth-context';

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [changeableUsersList, setChangeableUsersList] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  const authCtx = useContext(AuthContext);

  const loadUsers = useCallback(async () => {
    let url = process.env.REACT_APP_BACK_URL + '/users';

    try {
      const responseData = await sendRequest(url);
      let data;
      let data_arr = [];
      let flag = false;
      // eslint-disable-next-line
      for (const [key, value] of Object.entries(responseData)) {
        if (Array.isArray(value)) {
          data = value;
          flag = true;
        } else {
          if (value?.length > 1) {
            value.map(item => data_arr.push(item));
          } else {
            data_arr.push(value);
          }
        }
      }
      setLoadedUsers(prevState => prevState.concat(flag ? data : data_arr));
    } catch (err) {
      console.log(err.message);
    }
  }, [sendRequest]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const searchHandler = (name) => {
    setChangeableUsersList(prevState => prevState.filter(user => (user.firstName.toLowerCase() + ' ' + user.lastName.toLowerCase()).includes(name.toLowerCase())))
  };

  const reset = () => {
    setChangeableUsersList(loadedUsers);
  };

  const deleteUserHandler = async (user) => {
    console.log("Delete");
    try {
      await sendRequest(
        process.env.REACT_APP_BACK_URL + `/users/${user.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + authCtx.token
        }
      );
      setLoadedUsers(prevState => prevState.filter(loadedUser => loadedUser.id !== user.id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const editUserHandler = async (user) => {

  };

  useEffect(() => {
    setChangeableUsersList(loadedUsers);
  }, [loadedUsers]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        marginTop: "50px"
      }}
    >
      <Container maxWidth={false}>
        <UserListToolbar onReset={reset} onSearch={searchHandler} />
        <Box sx={{ mt: 3 }}>
          <UserListResults users={changeableUsersList} isLoading={isLoading} onEdit={editUserHandler} onDelete={deleteUserHandler} />
        </Box>
      </Container>
    </Box>
  );
};
Users.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Users;
