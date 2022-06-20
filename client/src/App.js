import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login.js"
import Register from "./components/Register";
import Layout from './components/Layout.js';
import RequireLogin from './components/RequireLogin.js';
import Home from './components/Home.js';
import Open from './components/Open.js';
import ActualProtected from './components/ActualProtected.js';
import PersistLogin from './components/PersistantLogin.js';
import LoggedIn from './components/LoggedIn.js';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route element={<LoggedIn />}>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
          </Route>

          <Route exact path="/" element={<Open />} />
          <Route element={<RequireLogin />}>
            <Route exact path='/home' element={<Home />} />
            <Route path='/protected' element={<ActualProtected />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/open" />} />
      </Route>
    </Routes>
  );
}

export default App;
