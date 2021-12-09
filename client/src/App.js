import Landpage from "./pages/Landpage";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";

import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path={"/"} element={<Landpage />} />
        <Route exact path={"/signin"} element={<Signin />} />
        <Route exact path={"/signup"} element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
