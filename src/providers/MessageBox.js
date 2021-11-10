import React, { useReducer, createContext, useContext } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Context = createContext();

const initialState = {
  open: false,
  type: "success",
  message: "",
  timer: 0,
};

const CLOSE = "CLOSE";
const OPEN = "OPEN";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case CLOSE:
      return initialState;
    case OPEN: {
      const { message, type, timer } = payload;
      return {
        ...state,
        open: true,
        message,
        type,
        timer: timer || 3000,
      };
    }
    default:
      return state;
  }
};

const MessageBoxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClose = () => dispatch(closeMessageBox());

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={state.open}
        autoHideDuration={state.timer}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={state.type}>
          {state.message}
        </Alert>
      </Snackbar>
    </Context.Provider>
  );
};

export const useMessageBox = () => {
  return useContext(Context);
};

export const openMessageBox = ({ type, message }) => ({
  type: OPEN,
  payload: { type, message },
});

const closeMessageBox = () => ({ type: CLOSE });

export default MessageBoxProvider;
