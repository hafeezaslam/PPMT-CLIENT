import React, { createContext, useContext, useReducer } from "react";
import { rootReducer } from "./reducers/rootReducer";

const Context = createContext();

const initialState = {
  errors: {},
  project: {
    project: {},
    projects: []
  },
  projectTask: {
    projectTask: {},
    projectTasks: []
  },
  security: {
    validToken: false,
    user: {}
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Store;
// custom hook
export const useStateValue = () => useContext(Context);
