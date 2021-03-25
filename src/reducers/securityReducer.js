import { SET_CURRENT_USER } from "../actions/types";

function booleanActionPayload(payload) {
  if (payload) return true;
  else return false;
}

function securityReducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log(state, action);
      return {
        ...state.security,
        validToken: booleanActionPayload(action.payload),
        user: action.payload
      };
    default:
      return state.security;
  }
}

export default securityReducer;
