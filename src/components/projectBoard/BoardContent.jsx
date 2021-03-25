import React from "react";
import { useStateValue } from "../../Store";
import ProjectTask from "./projectTasks/ProjectTask";

function BoardContent() {
  const {
    state: {
      projectTask: { projectTasks },
      errors
    }
  } = useStateValue();
  console.log(errors);

  if (projectTasks.length < 1) {
    if (errors.projectNotFound) {
      return (
        <div className="alert alert-danger text-center" role="alert">
          {errors.projectNotFound}
        </div>
      );
    } else if (errors.projectIdentifier) {
      return (
        <div className="alert alert-danger text-center" role="alert">
          {errors.projectIdentifier}
        </div>
      );
    } else {
      return (
        <div className="alert alert-info text-center" role="alert">
          No Project Tasks on this board
        </div>
      );
    }
  } else {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {projectTasks
              .filter((task) => task.status === "TO_DO")
              .map((task) => (
                <ProjectTask key={task.id} projectTask={task} />
              ))}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {projectTasks
              .filter((task) => task.status === "IN_PROGRESS")
              .map((task) => (
                <ProjectTask key={task.id} projectTask={task} />
              ))}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {projectTasks
              .filter((task) => task.status === "DONE")
              .map((task) => (
                <ProjectTask key={task.id} projectTask={task} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BoardContent;
