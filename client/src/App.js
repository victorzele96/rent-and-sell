import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './shared/components/Navigation/Navbar';
import Map from './property/components/Map';
import List from './property/components/List';
import Favorites from './favorites/pages/Favorites';
import Chats from './chats/pages/Chats';
import NewProperty from './property/pages/NewProperty';
import MyProperties from './property/pages/MyProperties';
import Auth from './users/pages/Auth';

import { CssBaseline } from '@mui/material';
import ShowProperty from './property/pages/ShowProperty';

const App = () => {
  const [toggleMapList, setToggleMapList] = useState(true);

  const routes = (
    <>
      <Routes>
        {toggleMapList && (
          <Route exact path={"/"} element={<Map />}
          />
        )}
        {!toggleMapList && (
          <Route exact path={"/"} element={<List load='all' tagId="main-content" />}
          />
        )}
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
    <div className="root">
      <CssBaseline />
      <Navbar mapList={toggleMapList} setMapList={setToggleMapList} />
      {routes}
    </div>
  );
};

export default App;
