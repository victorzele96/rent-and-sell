import { useState } from 'react';
import Navbar from './components/Navbar';
import Landpage from './pages/Landpage';
import Copyright from './components/Copyright';

const App = () => {
  const [toggleMapList, setToggleMapList] = useState(true);
  return (
    <>
      <Navbar mapList={toggleMapList} setMapList={setToggleMapList} />
      <Landpage mapList={toggleMapList} />
      <Copyright sx={{ mt: 5 }} />
    </>
  );
};

export default App;
