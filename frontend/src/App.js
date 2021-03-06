import React, {useState, useEffect} from 'react';
import './Form.css';
import Form from "./Form"
import AdminPage from './Components/AdminPage';
import UserPage from './Components/UserPage';
import LoginPage from './Components/LoginPage';
import LandingPage from './Components/LandingPage';
import ProtectedRoute from './ProtectedRoute'
import {BrowserRouter,Route, Switch, Link} from 'react-router-dom'



import Auth from "./auth";

import Loader from "./Loader";
import UserRegister from "./Components/RegistrationComponents/UserRegister";

function App() {
  var token;
  var refresh;

  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        {/* <ProtectedRoute
          currentPath="login"
          exact
          path="/login"
          component={Form}
        /> */}
        <ProtectedRoute
          currentPath="user"
          exact
          path="/user"
          component={UserPage}
        />
        <ProtectedRoute
          currentPath="admin"
          exact
          path="/admin"
          component={AdminPage}
        />
        <ProtectedRoute
          currentPath="login"
          exact
          path="/login"
          component={LoginPage}
        />
        <Route exact path="/signuppage" component={Form} />
        <Route path="*" component={() => "404 not found hehe"} />
      </Switch>
    </div>
  );
}

//this is the name we want to be called in index.js, we can change the name 'App' to anything we like but just be aware that we need to change it also to the index.js also
export default App;
