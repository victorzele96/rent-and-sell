import { Routes, Route } from 'react-router-dom';

import Map from '../components/Map';
import Signup from './auth/Signup';
import Signin from './auth/Signin';

import classes from './Landpage.module.css';

const Landpage = () => {
  return (
    <div>
      <Routes>
        <Route exact path={"/"} element={<Map />} />
        <Route exact path={"/signin"} element={<Signin />} />
        <Route exact path={"/signup"} element={<Signup />} />
      </Routes>
    </div>
  );
};

export default Landpage;
