import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import projecttTaskReducer from "./projecttTaskReducer";
import securityReducer from "./securityReducer";

export const rootReducer = (state, action) => {
  console.log(state, action);
  return {
    errors: errorReducer(state, action),
    project: projectReducer(state, action),
    projectTask: projecttTaskReducer(state, action),
    security: securityReducer(state, action)
  };
};
