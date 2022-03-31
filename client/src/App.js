import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './shared/components/Navigation/Navbar';
import Map from './property/components/Map';
import List from './property/components/List';
import Favorites from './favorites/pages/Favorites';
import Chats from './chats/pages/Chats';
import NewProperty from './property/pages/NewProperty';
import Copyright from './shared/components/UIElements/Copyright';

import DUMMY_DATA from "./property/components/propertyData";
import Auth from './users/pages/Auth';

const App = () => {
  const [toggleMapList, setToggleMapList] = useState(true);
  return (
    <>
      <Navbar mapList={toggleMapList} setMapList={setToggleMapList} />
      <div className="content">
        <Routes>
          <Route exact path={"/"} element={toggleMapList ?
            <Map properties={DUMMY_DATA} /> : (
              <div id="list" className="list-div">
                <List properties={DUMMY_DATA} />
              </div>
            )} />
          <Route exact path={"/auth"} element={<Auth />} />
          <Route exact path={"/favorites"} element={(
            <div id="favorites" className="list-div">
              <Favorites properties={DUMMY_DATA} />
            </div>
          )} />
          <Route exact path={"/chats"} element={<Chats />} />
          <Route exact path={"/add-property"} element={<NewProperty />} />
        </Routes>
      </div>
      {/* <Copyright sx={{ mt: 2, md: 2 }} /> */}
    </>
  );
};

export default App;
