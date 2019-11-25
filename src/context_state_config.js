import React, { useReducer } from "react";
import Context from "./utilities/Context";
import * as ACTIONS from "./store/actions/actions";
import * as AuthReducer from "./store/reducers/auth_reducer";
import * as FormReducer from "./store/reducers/form_reducer";
import * as PostsReducer from "./store/reducers/post_reducer";
import Routes from "./Routes";
import Auth from "./utilities/Auth";

const auth = new Auth();

const ContextState = () => {
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    AuthReducer.AuthReducer,
    AuthReducer.initialState
  );

  const handleLogin = () => {
    dispatchAuthReducer(ACTIONS.login_success());
  };

  const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.login_failure);
  };

  const [stateFormReducer, dispatchFormReducer] = useReducer(
    FormReducer.FormReducer,
    FormReducer.initialState
  );

  const handleFormChange = event => {
    dispatchFormReducer(ACTIONS.user_input_change(event.target.value));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist();
    dispatchFormReducer(
      ACTIONS.user_input_submit(event.target.useContext.value)
    );
  };

  const [statePostsReducer, dispatchPosts] = useReducer(
    PostsReducer.PostsReducer,
    PostsReducer.initialState
  );

  const handleSetPosts = posts => {
    dispatchPosts(ACTIONS.set_db_posts(posts));
  };

  const handleRemovePosts = () => {
    dispatchPosts(ACTIONS.remove_db_posts());
  };

  const [stateAuth, dispatchAuth] = useReducer(
    AuthReducer.AuthReducer,
    AuthReducer.initialState
  );

  const handleDBProfile = profile => {
    dispatchAuth(ACTIONS.set_db_profile(profile));
  };

  const handleRemoveDBProfile = () => {
    dispatchAuth(ACTIONS.remove_db_profile());
  };

  const handleAddProfile = profile => {
    dispatchAuthReducer(ACTIONS.add_profile(profile));
  };

  const handleRemoveProfile = () => {
    dispatchAuthReducer(ACTIONS.remove_profile());
  };

  const handleAuthentication = props => {
    if (props.location.hash) {
      auth.handleAuth();
    }
  };

  return (
    <div>
      <Context.Provider
        value={{
          useContextChangeState: stateFormReducer.user_textChange,
          useContextSubmitState: stateFormReducer.user_textSubmit,
          useContextSubmit: event => handleFormSubmit(event),
          useContextChange: event => handleFormChange(event),

          authState: stateAuthReducer.is_authenticated,
          profileState: stateAuthReducer.profile,
          handleUserLogin: () => handleLogin(),
          handleUserLogout: () => handleLogout(),

          dbProfileState: stateAuthReducer.db_profile,

          handleAddDBProfile: profile => handleDBProfile(profile),
          handleRemoveDBProfile: () => handleRemoveDBProfile(),
          handleUserAddProfile: profile => handleAddProfile(profile),
          handleUserRemoveProfile: () => handleRemoveProfile(),

          postsState: statePostsReducer.posts,
          handleAddPosts: posts => handleSetPosts(posts),
          handleRemovePosts: () => handleRemovePosts(),

          handleAuth: props => handleAuthentication(props),
          authObj: auth
        }}
      >
        <Routes />
      </Context.Provider>
    </div>
  );
};

export default ContextState;
