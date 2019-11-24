import React, { useEffect, useState } from "react";
import axios from "axios";

export const Posts = props => {
  useEffect(() => {
    axios.get("/api/hello").then(res => setState(res.data));
  }, []);

  const [state, setState] = useState("");

  return (
    <div>
      Posts go here!
      <p>{state}</p>
    </div>
  );
};

export default Posts;
