import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Context from "../utilities/Context";

const Posts = props => {
  const context = useContext(Context);

  const [localState, setState] = useState({ posts: [], fetched: false });

  useEffect(() => {
    if (!context.postsState) {
      axios
        .get("api/get/allposts")
        .then(res =>
          context.handleAddPosts(res.data).catch(err => console.log(err))
        );
    }
    if (context.postsState && !localState.fetched) {
      setState({
        ...localState,
        posts: [...context.postsState],
        fetched: true
      });
    }
  }, [context, localState]);
  return <div></div>;
};

export default Posts;
