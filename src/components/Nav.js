import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../utilities/Context";

const Nav = () => {
  const context = useContext(Context);

  return (
    <div>
      <Link to="/">Posts</Link>
      {!context.authState ? (
        <button onClick={() => context.authObj.login()}>Login</button>
      ) : (
        <button onClick={() => context.authObj.logout()}>Logout</button>
      )}
    </div>
  );
};

export default Nav;
