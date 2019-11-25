import React, { useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import history from "../utilities/history";
import Context from "../utilities/Context";

const ShowPost = props => {
  const context = useContext(Context);

  const [stateLocal, setState] = useState({
    post_title: null,
    post_body: null,
    post_author: null
  });

  useEffect(() => {
    if (props.location.state && !stateLocal.fetched) {
      setState({
        ...stateLocal,
        fetched: true,
        post_title: props.location.state.post.post.title,
        post_body: props.location.state.post.post.body,
        post_author: props.location.state.post.post.author,
        post_id: props.location.state.post.post.pid
      });
    }
  }, [stateLocal, props.location]);

  useEffect(() => {
    if (!props.location.state && !stateLocal.fetched) {
      const post_id = props.location.pathname.substring(6);

      axios
        .get("/api/get/post", { params: { post_id: post_id } })
        .then(res =>
          res.data.length !== 0
            ? setState({
                ...stateLocal,
                fetched: true,
                post_title: res.data[0].title,
                post_body: res.data[0].body,
                post_author: res.data[0].author,
                post_id: res.data[0].pid
              })
            : null
        )
        .catch(err => console.log(err));
    }
  }, [stateLocal, props.location]);

  return (
    <div>
      <div>
        <h2>Post</h2>
        {stateLocal.comments_arr || props.location.state ? (
          <div>
            <h1>{stateLocal.post_title}</h1>
            <h3>{stateLocal.post_body}</h3>
            <p>By {stateLocal.post_author}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShowPost;
