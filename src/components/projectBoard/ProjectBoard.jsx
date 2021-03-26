import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getProjectTasks } from "../../actions/projectTaskAction";
import { useStateValue } from "../../Store";
import BoardContent from "./BoardContent";

function ProjectBoard(props) {
  const { id } = props.match.params;

  const { state, dispatch } = useStateValue();

  useEffect(() => {
    if (state.security.user) {
      getProjectTasks(id, dispatch);
    } else {
      props.history.push("/login");
    }
  }, [state.security]);

  return (
    <div className="container">
      <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>
      <br />
      <hr />
      <BoardContent />
    </div>
  );
}

export default ProjectBoard;
