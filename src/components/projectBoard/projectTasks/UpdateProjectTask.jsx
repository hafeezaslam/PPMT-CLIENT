import React, { useState, useEffect } from "react";
import {
  updateProjectTask,
  getProjectTask
} from "../../../actions/projectTaskAction";
import { useStateValue } from "../../../Store";
import { Link } from "react-router-dom";

function UpdateProjectTask(props) {
  const [isProjectTasksLoaded, setIsProjectTasksLoaded] = useState(false);
  const {
    state: {
      projectTask: { projectTask },
      errors
    },
    dispatch
  } = useStateValue();
  const { projectId, projectTaskId } = props.match.params;

  const [updatedProjectTask, setUpdatedProjectTask] = useState({
    id: "",
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: "",
    dueDate: ""
  });

  useEffect(() => {
    getProjectTask(props.history, projectId, projectTaskId, dispatch);
    setIsProjectTasksLoaded(true);
  }, []);

  useEffect(() => {
    isProjectTasksLoaded &&
      setUpdatedProjectTask({
        id: projectTask.id,
        summary: projectTask.summary,
        acceptanceCriteria: projectTask.acceptanceCriteria
          ? projectTask.acceptanceCriteria
          : "",
        status: projectTask.status,
        priority: projectTask.priority,
        dueDate: projectTask.dueDate ? projectTask.dueDate : ""
      });
  }, [projectTask]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUpdatedProjectTask((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateProjectTask(
      props.history,
      projectId,
      projectTaskId,
      updatedProjectTask,
      dispatch
    );
  }

  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${projectId}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Update Project Task</h4>
            <p className="lead text-center">
              {" "}
              Project Name: {projectId} | Project Task ID: {projectTaskId}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={
                    "form-control form-control-lg " +
                    (errors.summary && "is-invalid")
                  }
                  name="summary"
                  placeholder="Project Task summary"
                  onChange={handleChange}
                  value={updatedProjectTask.summary}
                />
                {errors.summary && (
                  <div className="invalid-feedback">{errors.summary}</div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  onChange={handleChange}
                  value={
                    updatedProjectTask.acceptanceCriteria
                      ? updatedProjectTask.acceptanceCriteria
                      : ""
                  }
                />
              </div>
              <h6>Due Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  onChange={handleChange}
                  value={updatedProjectTask.dueDate}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  onChange={handleChange}
                  value={updatedProjectTask.priority}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  onChange={handleChange}
                  value={updatedProjectTask.status}
                >
                  <option value="">Select Status</option>
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProjectTask;
