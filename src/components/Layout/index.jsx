import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';
import PrivateRouteRegister from '../PrivateRouteRegister';
import Navbar from '../Navbar'
import Home from '../../pages/Home'
import Register from '../../pages/Register'
import Login from '../../pages/Login'
import User from '../../pages/User'
import 'bootstrap/dist/css/bootstrap.css';


const Layout = () => {
  
  return (
    <>
    <Router>
        <Navbar />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <PrivateRouteRegister component={Register} path="/register" exact />
          <PrivateRouteRegister component={Login} path="/login" exact />
          <PrivateRoute component={User} path="/users/:userID" exact />
        </Switch>
      </Router>
    </>
  )
}

export default Layout
