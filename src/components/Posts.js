import React, { useEffect, useState } from "react";
import axios from "axios";

export const Posts = () => {
  const [state, setState] = useState("");

  useEffect(() => {
    axios.get("/api/hello").then(res => setState(res.data));
  }, []);

  return (
    <div>
      Posts go here!
      <p>{state}</p>
    </div>
  );
};

export default Posts;
