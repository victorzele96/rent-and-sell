import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './shared/components/Navigation/Navbar';
import Favorites from './property/pages/Favorites';
import Chats from './chats/pages/Chats';
import NewProperty from './property/pages/NewProperty';
import MyProperties from './property/pages/MyProperties';
import ShowProperty from './property/pages/ShowProperty';
import AllProperties from './property/pages/AllProperties';
import Auth from './users/pages/Auth';

import { AuthContext } from './shared/context/auth-context';

import { useAuth } from './shared/hooks/auth-hook';

import { CssBaseline } from '@mui/material';

const App = () => {
  const [toggleMapList, setToggleMapList] = useState(true);
  const { token, signin, signout, userId } = useAuth();

  const routes = (
    <>
      <Routes>
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

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: !!token,
        token,
        userId,
        signin,
        signout
      }}
    >
      <div className="root">
        <CssBaseline />
        <Navbar mapList={toggleMapList} setMapList={setToggleMapList} />
        {routes}
      </div>
    </AuthContext.Provider>
  );
};

export default App;
