import React, { useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import Context from "../utilities/Context";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Posts = props => {
  const context = useContext(Context);

  const [localState, setState] = useState({ posts: [], fetched: false });

  useEffect(() => {
    if (!context.postsState) {
      axios
        .get("api/get/allposts")
        .then(res => context.handleAddPosts(res.data))
        .catch(err => console.log(err));
    }
    if (context.postsState && !localState.fetched) {
      setState({
        ...localState,
        posts: [...context.postsState],
        fetched: true
      });
    }
  }, [context, localState]);

  const RenderPosts = post => (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>
            <Link to={{ pathname: "/post/" + post.post.pid, state: { post } }}>
              {post.post.title}
            </Link>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <div>
      {context.authState ? (
        <Link to="/newpost">
          <Button variant="contained" color="primary">
            New Post
          </Button>
        </Link>
      ) : null}
      <h1>Posts</h1>
      <div>
        {localState.posts ? (
          localState.posts.map(post => (
            <RenderPosts key={post.pid} post={post} />
          ))
        ) : (
          <h2>No Posts Yet</h2>
        )}
      </div>
    </div>
  );
};

export default Posts;
