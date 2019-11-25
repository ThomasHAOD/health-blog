import React, { useEffect, useContext } from "react";
import history from "./history";
import Context from "./Context";

import axios from "axios";

const AuthCheck = () => {
  const context = useContext(Context);

  useEffect(() => {
    if (context.authObj.isAuthenticated()) {
      const profile = context.authObj.userProfile;
      context.handleUserLogin();
      context.handleUserAddProfile(profile);
      axios
        .post("http://localhost:5000/api/post/userprofiletodb", profile)
        .then(
          axios
            .get("http://localhost:5000/api/get/userprofilefromdb", {
              params: { email: "tam@tam.com" }
            })
            .then(res => context.handleAddDBProfile(res.data))
        )
        .then(history.replace("/"));
    } else {
      context.handleUserLogout();
      context.handleUserRemoveProfile();
      context.handleUserRemoveProfile();
      history.replace("/");
    }
  }, [context.authObj.userProfile, context]);

  return <div></div>;
};

export default AuthCheck;
