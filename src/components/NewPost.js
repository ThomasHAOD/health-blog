import React, { useContext } from "react";
import axios from "axios";

import history from "../utilities/history";
import Context from "../utilities/Context";

const NewPost = () => {
  const context = useContext(Context);

  const handleSubmit = event => {
    event.preventDefault();
    const user_id = "1";
    const username = "Tam";
    const data = {
      title: event.target.title.value,
      body: event.target.body.value,
      username: username,
      uid: user_id
    };

    axios
      .post("/api/post/posttodb", data)
      .then(response => console.log(response))
      .catch(err => console.log(err))
      .then(setTimeout(() => history.replace("/"), 700));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input id="title" label="Title" margin="normal" type="text" />
        <br />
        <input
          id="body"
          label="Body"
          multiline
          rowsMax="4"
          margin="normal"
          type="text"
        />
        <br />
        <button type="submit"> Submit </button>
      </form>
      <br />
      <button onClick={() => history.replace("/posts")}> Cancel </button>
    </div>
  );
};

export default NewPost;
