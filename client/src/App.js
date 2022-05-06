import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

//? User
import Navbar from './shared/components/Navigation/Navbar';
import Favorites from './property/pages/Favorites';
import Chats from './chats/pages/Chats';
import NewProperty from './property/pages/NewProperty';
import MyProperties from './property/pages/MyProperties';
import ShowProperty from './property/pages/ShowProperty';
import AllProperties from './property/pages/AllProperties';
import Auth from './users/pages/Auth';
//?
//! Admin
import Dashboard from './admin/pages/Dashboard';
import Users from './admin/pages/Users';
import { DashboardNavbar } from './admin/components/DashboardNavbar';
import { DashboardSidebar } from './admin/components/DashboardSidebar';
//!

import { AuthContext } from './shared/context/auth-context';

import { useAuth } from './shared/hooks/auth-hook';

import { CssBaseline } from '@mui/material';

const App = () => {
  const [toggleMapList, setToggleMapList] = useState(true);
  const [open, setOpen] = useState(false);
  const { token, signin, signout, user } = useAuth();

  const userRoutes = (
    <>
      <Routes>
        {/* User routes */}
        <Route exact path={"/"} element={<AllProperties toggle={toggleMapList} tagId="main-content" />} />
        <Route exact path={"/auth"} element={<Auth tagId="main-content" />} />
        <Route exact path={"/favorites"} element={<Favorites tagId="main-content" />} />
        <Route exact path={"/chats"} element={<Chats tagId="main-content" />} />
        <Route exact path={"/add-property"} element={<NewProperty tagId="main-content" />} />
        <Route exact path={"/my-properties"} element={<MyProperties tagId="main-content" />} />
        <Route exact path={'/property/:propertyId'} element={<ShowProperty tagId="main-content" />} />
      </Routes>
    </>
  );

  const adminRoutes = (
    <>
      <Routes>
        {/* Admin routes */}
        <Route exact path={'/dashboard'} element={<Dashboard tagId="main-content" />} />
        <Route exact path={'/dashboard/users'} element={<Users tagId="main-content" />} />
      </Routes>
    </>
  );

  const adminContent = (
    <>
      <DashboardNavbar onSidebarOpen={() => setOpen(true)} />
      <DashboardSidebar
        onClose={() => setOpen(false)}
        open={open}
      />
      {adminRoutes}
    </>
  );

  const userContent = (
    <>
      <Navbar mapList={toggleMapList} setMapList={setToggleMapList} />
      {userRoutes}
    </>
  );

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: !!token,
        token,
        signin,
        signout,
        user
      }}
    >
      <div className="root">
        <CssBaseline />
        {user ? (
          user.isAdmin ? (
            adminContent
          ) : (
            userContent
          )) : (
          userContent
        )}
      </div>
    </AuthContext.Provider>
  );
};

export default App;
