import { GET_ERRORS } from "../actions/types";

function errorReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state.errors;
  }
}

export default errorReducer;
