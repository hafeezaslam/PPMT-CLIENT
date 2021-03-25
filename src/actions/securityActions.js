import axios from "axios";
import setJwtToken from "../securityUtils/setJwtToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

export const createNewUser = async (newUser, history, dispatch) => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");
    clearErrors(dispatch);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const login = async (loginRequest, dispatch) => {
  try {
    // post login request
    const res = await axios.post("/api/users/login", loginRequest);
    // get token from respnse data
    const { token } = res.data;
    // store token in device local storage
    localStorage.setItem("jwtToken", token);
    // set our token in header
    setJwtToken(token);
    // decode token in react
    const decoded = jwt_decode(token);
    console.log(decoded);
    clearErrors(dispatch);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJwtToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
  window.location.href = "/";
};

const clearErrors = (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });
};
