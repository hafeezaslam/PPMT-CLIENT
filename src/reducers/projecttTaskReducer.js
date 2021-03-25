import {
  GET_PROJECT_TASKS,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK
} from "../actions/types";

function projectTaskReducer({ projectTask }, action) {
  console.log(projectTask, action.payload);

  switch (action.type) {
    case GET_PROJECT_TASKS:
      return {
        ...projectTask,
        projectTasks: action.payload
      };
    case GET_PROJECT_TASK:
      return {
        ...projectTask,
        projectTask: action.payload
      };
    case DELETE_PROJECT_TASK:
      return {
        ...projectTask,
        projectTasks: projectTask.projectTasks.filter(
          (task) => task.projectSequence !== action.payload
        )
      };
    default:
      return projectTask;
  }
}

export default projectTaskReducer;
