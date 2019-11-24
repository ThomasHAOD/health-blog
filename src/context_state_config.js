import React, { useReducer } from "react";
import Context from "./utilities/Context";
import * as ACTIONS from "./store/actions/actions";
import * as AuthReducer from "./store/reducers/auth_reducer";
import * as FormReducer from "./store/reducers/form_reducer";
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

  const handleAuthentication = props => {
    if (props.locaiton.hash) {
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
          handleUserAddProfile: profile => handleAddProfile(profile),
          handleUserRemoveProfile: () => handleRemoveProfile(),

          handleAuth: props => handleAuthentication(props),
          authObj: auth
        }}
      >
        <Routes />
      </Context.Provider>
    </div>
  );
};
