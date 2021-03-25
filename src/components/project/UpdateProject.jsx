import React, { useState, useEffect } from "react";
import { getProject, createProject } from "../../actions/projectAction";
import { useStateValue } from "../../Store";

export default function UpdateProject(props) {
  const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);
  const [updateProject, setUpdateProject] = useState({
    id: "",
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: ""
  });

  const {
    state: {
      project: { project },
      errors
    },
    dispatch
  } = useStateValue();

  useEffect(() => {
    getProject(props.history, props.match.params.id, dispatch);
    setIsProjectsLoaded(true);
  }, []);

  useEffect(() => {
    isProjectsLoaded &&
      setUpdateProject({
        id: project.id,
        projectName: project.projectName,
        projectIdentifier: project.projectIdentifier,
        description: project.description,
        startDate: project.startDate ? project.startDate : "",
        endDate: project.endDate ? project.endDate : ""
      });
  }, [project]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUpdateProject((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createProject(props.history, updateProject, dispatch);
  }

  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Project form</h5>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={
                    "form-control form-control-lg " +
                    (errors.projectName && "is-invalid")
                  }
                  placeholder="Project Name"
                  name="projectName"
                  value={updateProject.projectName}
                  onChange={handleChange}
                />
                {errors.projectName && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className={
                    "form-control form-control-lg " +
                    (errors.projectIdentifier && "is-invalid")
                  }
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  value={updateProject.projectIdentifier}
                  onChange={handleChange}
                  disabled
                />
                {errors.projectIdentifier && (
                  <div className="invalid-feedback">
                    {errors.projectIdentifier}
                  </div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className={
                    "form-control form-control-lg " +
                    (errors.description && "is-invalid")
                  }
                  placeholder="Project Description"
                  name="description"
                  value={updateProject.description}
                  onChange={handleChange}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <h6>Start Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="startDate"
                  value={updateProject.startDate}
                  onChange={handleChange}
                />
              </div>
              <h6>Estimated End Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="endDate"
                  value={updateProject.endDate}
                  onChange={handleChange}
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
