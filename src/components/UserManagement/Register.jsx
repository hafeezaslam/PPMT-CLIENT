import React, { useState, useEffect } from "react";
import { createNewUser } from "../../actions/securityActions";
import { useStateValue } from "../../Store";

function Register(props) {
  const [newUser, setNewUser] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: ""
  });

  const {
    state: { security, errors },
    dispatch
  } = useStateValue();

  useEffect(() => {
    if (security.validToken) {
      props.history.push("/dashboard");
    }
  }, [security]);

  function handleChange(e) {
    const { name, value } = e.target;
    setNewUser((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createNewUser(newUser, props.history, dispatch);
  }

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Account</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control form-control-lg ${
                    errors.fullName && "is-invalid"
                  }`}
                  placeholder="Full Name"
                  name="fullName"
                  value={newUser.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={`form-control form-control-lg ${
                    errors.username && "is-invalid"
                  }`}
                  placeholder="Email Address"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={`form-control form-control-lg ${
                    errors.password && "is-invalid"
                  }`}
                  placeholder="Password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={`form-control form-control-lg ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={newUser.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
