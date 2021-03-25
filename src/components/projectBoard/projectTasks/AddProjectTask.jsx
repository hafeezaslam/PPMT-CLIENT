import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {addProjectTask} from '../../../actions/projectTaskAction';
import {useStateValue} from '../../../Store';

function AddProjectTask(props) {

  const {projectId} = props.match.params;
  const {state: {errors}, dispatch} = useStateValue();

  const [newProjectTask, setNewProjectTask] = useState({
    summary:"",
    acceptanceCriteria:"",
    dueDate:"",
    priority:"",
    status:""
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setNewProjectTask(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addProjectTask(props.history, projectId, newProjectTask, dispatch);
  }

  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${projectId}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Add Project Task</h4>
            <p className="lead text-center">Project Name + Project Code</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={"form-control form-control-lg " + (errors.summary && "is-invalid")}
                  name="summary"
                  placeholder="Project Task summary"
                  value={newProjectTask.summary}
                  onChange={handleChange}
                />
                {errors.summary && (
                <div className="invalid-feedback">
                  {errors.summary}
                </div>
                )}
                </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={newProjectTask.acceptanceCriteria}
                  onChange={handleChange}
                />
              </div>
              <h6>Due Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={newProjectTask.dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  value={newProjectTask.priority}
                  onChange={handleChange}
                >
                  <option value="">Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  value={newProjectTask.status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>

              <input
                type="submit"
                className="btn btn-primary btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}

export default AddProjectTask;