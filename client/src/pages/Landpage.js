import { Routes, Route } from 'react-router-dom';

import Map from '../components/Map';
import Signup from './auth/Signup/Signup';
import Signin from './auth/Signin/Signin';
import Favorites from './Favorites';
import Chats from './Chats';
import NewProperty from './NewProperty';

import classes from './Landpage.module.css';

const Landpage = () => {
  return (
    <div>
      <Routes>
        <Route exact path={"/"} element={<Map />} />
        <Route exact path={"/signin"} element={<Signin />} />
        <Route exact path={"/signup"} element={<Signup />} />
        <Route exact path={"/favorites"} element={<Favorites />} />
        <Route exact path={"/chats"} element={<Chats />} />
        <Route exact path={"/add-property"} element={<NewProperty />} />
      </Routes>
    </div>
  );
};

export default Landpage;
