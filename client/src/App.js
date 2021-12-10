import { useState } from 'react';
import Navbar from './components/Navbar';
import Landpage from './pages/Landpage';

const App = () => {
  const [toggleMapList, setToggleMapList] = useState(true);
  return (
    <>
      <Navbar mapList={toggleMapList} setMapList={setToggleMapList}/>
      <Landpage mapList={toggleMapList}/>
    </>
  );
};

export default App;
