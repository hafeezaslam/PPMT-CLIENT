import React, { useEffect } from "react";
import ProjectItem from "../components/project/ProjectItem";
import CreateProjectButton from "../components/project/CreateProjectButton";
import { useStateValue } from "../Store";
import { getProjects } from "../actions/projectAction";

function Dashboard({ history }) {
  const { state, dispatch } = useStateValue();
  const projects = state.project.projects;

  console.log("Dashboard rendered");

  console.log(projects);

  useEffect(() => {
    if (state.security.user) {
      getProjects(dispatch);
    } else {
      history.push("/login");
    }
  }, [state.security]);

  return (
    <div className="projects">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Projects</h1>
            <br />
            <CreateProjectButton />
            <br />
            <hr />
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
