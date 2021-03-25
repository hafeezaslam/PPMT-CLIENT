import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import AddProject from "./components/project/AddProject";
import UpdateProject from "./components/project/UpdateProject";
import ProjectBoard from "./components/projectBoard/ProjectBoard";
import AddProjectTask from "./components/projectBoard/projectTasks/AddProjectTask";
import UpdateProjectTask from "./components/projectBoard/projectTasks/UpdateProjectTask";
import Landing from "./components/layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useStateValue } from "./Store";
import setJwtToken from "./securityUtils/setJwtToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const jwtToken = localStorage.jwtToken;
  const {
    state: { security },
    dispatch
  } = useStateValue();

  console.log(security.user);

  useEffect(() => {
    if (jwtToken) {
      setJwtToken(jwtToken);
      const decodedJwtToken = jwt_decode(jwtToken);

      const currTime = Date.now() / 1000;
      if (decodedJwtToken.exp < currTime) {
        logout(dispatch);
      } else {
        dispatch({
          type: SET_CURRENT_USER,
          payload: decodedJwtToken
        });
      }
    }
    setIsLoaded(true);
  }, []);

  return (
    <Router>
      {isLoaded && (
        <div className="App">
          <Header />
          {
            // public routes
          }
          {/* routing for router ver < 5 */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          {
            // secured routes
          }
          <SecuredRoute
            exact
            path="/dashboard"
            security={security}
            component={Dashboard}
          />
          <SecuredRoute
            exact
            path="/addProject"
            security={security}
            component={AddProject}
          />
          <SecuredRoute
            exact
            path="/updateProject/:id"
            security={security}
            component={UpdateProject}
          />
          <SecuredRoute
            exact
            path="/projectBoard/:id"
            security={security}
            component={ProjectBoard}
          />
          <SecuredRoute
            exact
            path="/addProjectTask/:id"
            security={security}
            component={AddProjectTask}
          />
          <SecuredRoute
            exact
            path="/updateProjectTask/:projectId/:projectTaskId"
            security={security}
            component={UpdateProjectTask}
          />
        </div>
      )}
    </Router>
  );
}

export default App;
