import { GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "../actions/types";

function projectReducer(state, action) {
  console.log(state, action.payload);
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state.project,
        projects: action.payload
      };
    case GET_PROJECT:
      return {
        ...state.project,
        project: action.payload
      };
    case DELETE_PROJECT:
      return {
        ...state.project,
        projects: state.project.projects.filter(
          (project) => project.projectIdentifier !== action.payload
        )
      };
    default:
      return state.project;
  }
}

export default projectReducer;
