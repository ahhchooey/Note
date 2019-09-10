import React from "react";
import {connect} from "react-redux";
import {Route, Redirect, withRouter} from "react-router-dom";


const mapstatetoprops = (state) => ({
  loggedin: Boolean(state.session.currentUser)
});

//protects auth routes from users that are already logged in
const Auth = ({path, exact, loggedin, component: Component}) => (
  <Route
    path={path}
    exact={exact}
    render={props => loggedin ? <Redirect to="/note" /> : <Component {...props} />}
  />
);

//protects guts from users that are not logged in
const Protected = ({path, exact, loggedin, component: Component}) => (
  <Route
    path={path}
    exact={exact}
    render={props => !loggedin ? <Redirect to="/" /> : <Component {...props} />}
  />
);

export const AuthRoute = withRouter(connect(mapstatetoprops)(Auth));

export const ProtectedRoute = withRouter(connect(mapstatetoprops)(Protected));

