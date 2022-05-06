import { Box, Container } from '@mui/material';
import { UserListResults } from '../components/user/UserListResults';
import { UserListToolbar } from '../components/user/UserListToolbar';
import { DashboardLayout } from '../components/DashboardLayout';
import { users } from '../__mocks__/users';

const Users = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        marginTop: "50px"
      }}
    >
      <Container maxWidth={false}>
        <UserListToolbar />
        <Box sx={{ mt: 3 }}>
          <UserListResults users={users} />
        </Box>
      </Container>
    </Box>
  </>
);
Users.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Users;
