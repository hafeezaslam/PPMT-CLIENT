import React from "react";
import { Link } from "react-router-dom";
import { deleteProjectTask } from "../../../actions/projectTaskAction";
import { useStateValue } from "../../../Store";

function ProjectTask({ projectTask }) {
  const { dispatch } = useStateValue();

  let priorityString, priorityClass;
  switch (projectTask.priority) {
    case 1:
      priorityClass = "bg-danger";
      priorityString = "HIGH";
      break;
    case 2:
      priorityClass = "bg-warning";
      priorityString = "MEDIUM";
      break;
    case 3:
      priorityClass = "bg-info";
      priorityString = "LOW";
      break;
    default:
  }

  function handleDelete() {
    deleteProjectTask(
      projectTask.projectIdentifier,
      projectTask.projectSequence,
      dispatch
    );
  }

  return (
    <div className="card mb-1 bg-light">
      <div className={`card-header text-primary text-light ${priorityClass}`}>
        ID: {projectTask.projectSequence} -- Priority: {priorityString}
      </div>
      <div className="card-body bg-light">
        <h5 className="card-title">{projectTask.summary}</h5>
        <p className="card-text text-truncate ">
          {projectTask.acceptanceCriteria}
        </p>
        <Link
          to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
          className="btn btn-primary"
        >
          View / Update
        </Link>

        <button onClick={handleDelete} className="btn btn-danger ml-4">
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectTask;
