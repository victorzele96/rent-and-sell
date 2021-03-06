import { useState } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';

import DeployAvatar from "../../../shared/components/UIElements/Avatar";
import ConfirmationModal from "../../../shared/components/UIElements/ConfirmationModal";
import CircularProgressModal from "../../../shared/components/UIElements/CircularProgressModal";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserForm from '../../../shared/components/Forms/UserForm';

export const UserListResults = ({ users, isLoading, onEdit, onDelete, ...rest }) => {
  const [selectedUsersIds, setSelectedUsersIds] = useState([]); // check boxes
  const [selectedUser, setSelectedUser] = useState(); // the user to be edited or deleted
  const [openConfirm, setOpenConfirm] = useState(false); // to confirm delete
  const [openEdit, setOpenEdit] = useState(false); // to confirm delete
  const [requestType, setRequestType] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const selectAllHandler = (event) => {
    let newSelectedUserIds;

    if (event.target.checked) {
      newSelectedUserIds = users.map((user) => user.id);
    } else {
      newSelectedUserIds = [];
    }

    setSelectedUsersIds(newSelectedUserIds);
  };

  const selectOneHnalder = (event, id) => {
    const selectedIndex = selectedUsersIds.indexOf(id);
    let newSelectedUserIds = [];

    if (selectedIndex === -1) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUsersIds, id);
    } else if (selectedIndex === 0) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUsersIds.slice(1));
    } else if (selectedIndex === selectedUsersIds.length - 1) {
      newSelectedUserIds = newSelectedUserIds.concat(selectedUsersIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUserIds = newSelectedUserIds.concat(
        selectedUsersIds.slice(0, selectedIndex),
        selectedUsersIds.slice(selectedIndex + 1)
      );
    }

    setSelectedUsersIds(newSelectedUserIds);
  };

  const limitChangeHandler = (event) => {
    setLimit(event.target.value);
  };

  const pageChangeHandler = (event, newPage) => {
    setPage(newPage);
  };

  const editHandler = (user) => {
    setOpenEdit(true);
    setSelectedUser(user);
  };

  const deleteHandler = (user) => {
    setOpenConfirm(true);
    setSelectedUser(user);
    setRequestType('delete');
  };

  const confirmHandler = (requestType, updatedUser) => {
    if (requestType === 'edit') onEdit(updatedUser);
    if (requestType === 'delete') onDelete(selectedUser);
    setOpenConfirm(false);
  }

  const cancelHandler = () => {
    setOpenEdit(false);
    setOpenConfirm(false);
    setSelectedUser(null);
    setRequestType(null);
  };

  return (
    <>
      <UserForm
        onCancel={cancelHandler}
        onSubmit={(updatedUser) => confirmHandler('edit', updatedUser)}
        open={openEdit}
        user={selectedUser}
        isLoading={isLoading}
      />
      <ConfirmationModal
        onCancel={cancelHandler}
        onConfirm={() => confirmHandler(requestType)}
        open={openConfirm}
        title={"Confirm User Delete Request"}
        text={"Are you sure you want to delete this user?"}
      />
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsersIds.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsersIds.length > 0
                        && selectedUsersIds.length < users.length
                      }
                      onChange={selectAllHandler}
                    />
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Role
                  </TableCell>
                  <TableCell>
                    Edit
                  </TableCell>
                  <TableCell>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * limit, page * limit + limit).map((user) => (
                  <TableRow
                    hover
                    key={user.id}
                    selected={selectedUsersIds.indexOf(user.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsersIds.indexOf(user.id) !== -1}
                        onChange={(event) => selectOneHnalder(event, user.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell sx={{ width: 400 }}>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <DeployAvatar
                          type="list"
                          fname={user.firstName.toUpperCase()}
                          lname={user.lastName.toUpperCase()}
                          sx={{ mr: 2 }}
                        />
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {user.firstName + " " + user.lastName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ width: 450 }}>
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {user.role ? user.role : "user"}
                    </TableCell>
                    <TableCell>
                      {(!user.role || user.role !== 'admin') && (
                        // if not admin
                        <IconButton onClick={() => editHandler(user)}>
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell>
                      {(!user.role || user.role !== 'admin') && (
                        // if not admin
                        <IconButton onClick={() => deleteHandler(user)}>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={users.length}
          onPageChange={pageChangeHandler}
          onRowsPerPageChange={limitChangeHandler}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
      {isLoading && !openEdit && (
        <CircularProgressModal />
      )}
    </>
  );
};

UserListResults.propTypes = {
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
