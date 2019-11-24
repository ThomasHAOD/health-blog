import React, { useContext, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./utilities/history";
import Context from "./utilities/Context";
import AuthCheck from "./utilities/authcheck";

import Nav from "./components/Nav";
import LoginSuccess from "./components/LoginSuccess";
import Posts from "./components/Posts";

const PrivateRoute = ({ component: Component, auth }) => (
  <Route
    render={props =>
      auth === true ? (
        <Component auth={auth} {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

const Routes = () => {
  const context = useContext(Context);

  return (
    <div>
      <Router history={history}>
        <Nav />
        <div>
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/authcheck" component={AuthCheck} />
            <Route
              path="/login_success"
              render={props => {
                context.handleAuth(props);
                return <LoginSuccess />;
              }}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Routes;
