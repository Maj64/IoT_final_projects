// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import SensorList from './components/Device/DeviceList';
// import SensorDetails from './components/SensorDetails';
// // import AddSensor from './components/AddSensor';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Switch>
//           <Route exact path="/" component={SensorList} />
//           {/* <Route exact path="/sensors/:id" component={SensorDetails} /> */}
//           {/* <Route exact path="/add-sensor" component={AddSensor} /> */}
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { Switch, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Home from './components/Home';
// import SensorForm from './components/SensorForm';
// import Sensors from './components/Sensors';

// function App() {
//   return (
//     <div>
//       <Switch>
//         <Route exact path="/">
//           <Login />
//         </Route>
//         <Route path="/home">
//           <Home />
//         </Route>
//         <Route path="/sensors/new">
//           <SensorForm />
//         </Route>
//         <Route path="/sensors">
//           <Sensors />
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// export default App;

import React, { useEffect } from "react";
// import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
// import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard";
// import Home from "./components/Home";
// import Sensors from './components/Sensors';
// import { authenticate } from './actions/authActions';

import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(authenticate());
  // }, [dispatch]);

  return (
    <Router>
      <div>
        <ul>
          {isAuthenticated ? (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          ) : (
            <div>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/login">Register</Link>
              </li>
            </div>
          )}
        </ul>
      </div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        {/* <Route exact path="/" component={Home} /> */}
        {/* <Route exact path="/dashboard" component={Dashboard} /> */}
        <ProtectedRoute
          exact
          path="/"
          component={() => <Redirect to="/dashboard" />}
        />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />

        {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
        {/* <PrivateRoute exact path="/sensors" component={Sensors} /> */}
      </Switch>
    </Router>
  );
}

export default App;
