import React, { useEffect, useContext } from "react";
import history from "./history";
import Context from "./context";
import * as ACTIONS from "../store/actions/actions";

const AuthCheck = () => {
  const context = useContext(Context);

  useEffect(() => {
    if (context.authObj.isAuthenticated()) {
      context.handleUserLogin();
      history.replace("/");
    } else {
      context.handleUserLogout();
      history.replace("/");
    }
  }, []);

  return <div></div>;
};

export default AuthCheck;
