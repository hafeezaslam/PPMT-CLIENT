import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = async (history, project, dispatch) => {
  try {
    console.log(project);
    await axios.post("/api/project", project);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getProjects = async (dispatch) => {
  const response = await axios.get("/api/project/all");
  console.log(response.data);
  dispatch({
    type: GET_PROJECTS,
    payload: response.data
  });
};

export const getProject = async (history, id, dispatch) => {
  try {
    const response = await axios.get(`/api/project/${id}`);
    console.log(response.data);
    dispatch({
      type: GET_PROJECT,
      payload: response.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteProject = async (id, dispatch) => {
  try {
    const response = await axios.delete(`/api/project/${id}`);
    console.log(response.data);
    dispatch({
      type: DELETE_PROJECT,
      payload: id
    });
  } catch (error) {}
};
