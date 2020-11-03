import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

  const PrivateRouteRegister = ({component: Component, ...rest}) => {

    const currentUser = useSelector(state => state.currentUser.currentUser);

    const isLogin = () => {
      if (!Array.isArray(currentUser)) {
        return true
      } else {
        return false
      }
    }
    
    return (
      
        <Route {...rest} render={props => (
            !isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRouteRegister
