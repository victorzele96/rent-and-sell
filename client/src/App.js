import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './shared/components/Navigation/Navbar';
import Map from './property/components/Map';
import List from './property/components/List';
import Signin from './users/pages/Signin';
import Signup from './users/pages/Signup';
import Favorites from './favorites/pages/Favorites';
import Chats from './chats/pages/Chats';
import NewProperty from './property/pages/NewProperty';
import Copyright from './shared/components/UIElements/Copyright';

import DUMMY_DATA from "./property/components/propertyData";

const App = () => {
  const [toggleMapList, setToggleMapList] = useState(true);
  return (
    <>
      <Navbar mapList={toggleMapList} setMapList={setToggleMapList} />
      <div className="content">
        <Routes>
          <Route exact path={"/"} element={toggleMapList ?
            <Map properties={DUMMY_DATA} /> : (
              <div style={{ height: "1080px", overflow: "hidden", overflowY: "auto", marginTop: "50px" }}>
                <List properties={DUMMY_DATA} />
              </div>
            )} />
          <Route exact path={"/signin"} element={<Signin />} />
          <Route exact path={"/signup"} element={<Signup />} />
          <Route exact path={"/favorites"} element={(
            <div style={{ height: "1040px", overflow: "hidden", overflowY: "auto", marginTop: "50px" }}>
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
