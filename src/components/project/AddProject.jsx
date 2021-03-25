import React, {useState} from 'react';
import {useStateValue} from '../../Store';
import {createProject} from '../../actions/projectAction';

function AddProject(props) {

  const [newProject, setNewProject] = useState(
    {
      projectName: "",
      projectIdentifier: "",
      description: "",
      startDate: "",
      endDate: ""
    }
  );

  const {state: {errors}, dispatch} = useStateValue();

  // console.log(state, dispatch);
  function handleChange(e) {
    const {name, value} = e.target;
    setNewProject(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createProject(props.history, newProject, dispatch);
  }

  return (
    <div className="project">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center">Create / Edit Project form</h5>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                            type="text"
                            className={`form-control form-control-lg ${(errors.projectName && "is-invalid")}`}
                            placeholder="Project Name"
                            name = "projectName"
                            value={newProject.projectName}
                            onChange = {handleChange}
                            />
                            {errors.projectName && (
                            <div className="invalid-feedback">
                              {errors.projectName}
                            </div>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                            type="text"
                            className={"form-control form-control-lg " + (errors.projectIdentifier && "is-invalid")}
                            placeholder="Unique Project ID"
                            name="projectIdentifier"
                            value= {newProject.projectIdentifier}
                            onChange = {handleChange}
                            />
                            {errors.projectIdentifier && (
                            <div className="invalid-feedback">
                              {errors.projectIdentifier}
                            </div>
                            )}
                        </div>
                        <div className="form-group">
                            <textarea
                            className={"form-control form-control-lg " + (errors.description && "is-invalid")}
                            placeholder="Project Description"
                            name = "description"
                            value = {newProject.description}
                            onChange = {handleChange}
                            >
                            </textarea>
                            {errors.description && (
                            <div className="invalid-feedback">
                              {errors.description}
                            </div>
                            )}
                        </div>
                        <h6>Start Date</h6>
                        <div className="form-group">
                            <input
                            type="date"
                            className="form-control form-control-lg"
                            name="startDate"
                            value={newProject.startDate}
                            onChange = {handleChange}
                            />
                        </div>
                        <h6>Estimated End Date</h6>
                        <div className="form-group">
                            <input
                            type="date"
                            className="form-control form-control-lg"
                            name="endDate"
                            value={newProject.endDate}
                            onChange = {handleChange}
                            />
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AddProject;
