import axios from "axios";
import {
  GET_ERRORS,
  GET_PROJECT_TASK,
  GET_PROJECT_TASKS,
  DELETE_PROJECT_TASK,
} from "./types";

export const addProjectTask = async (
  history,
  projectIdentifier,
  projectTask,
  dispatch
) => {
  try {
    await axios.post(`/api/projectTask/${projectIdentifier}`, projectTask);
    history.push(`/projectBoard/${projectIdentifier}`);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getProjectTasks = async (projectIdentifier, dispatch) => {
  try {
    const response = await axios.get(`/api/projectTask/${projectIdentifier}/`);
    console.log(response.data);
    dispatch({
      type: GET_PROJECT_TASKS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getProjectTask = async (
  history,
  projectIdentifier,
  projectTaskId,
  dispatch
) => {
  try {
    const response = await axios.get(
      `/api/projectTask/${projectIdentifier}/${projectTaskId}`
    );
    console.log(response.data);
    dispatch({
      type: GET_PROJECT_TASK,
      payload: response.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const updateProjectTask = async (
  history,
  projectIdentifier,
  projectTaskId,
  projectTask,
  dispatch
) => {
  console.log(projectTask);
  try {
    const response = await axios.patch(
      `/api/projectTask/${projectIdentifier}/${projectTaskId}`,
      projectTask
    );
    history.push(`/projectBoard/${projectIdentifier}`);
    console.log(response.data);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const deleteProjectTask = async (
  projectIdentifier,
  projectTaskId,
  dispatch
) => {
  try {
    if (
      window.confirm(
        `Are you sure you want to delete ${projectTaskId} project task.`
      )
    ) {
      const response = await axios.delete(
        `/api/projectTask/${projectIdentifier}/${projectTaskId}`
      );
      console.log(response.data);
      dispatch({
        type: DELETE_PROJECT_TASK,
        payload: projectTaskId,
      });
    }
  } catch (error) {}
};
