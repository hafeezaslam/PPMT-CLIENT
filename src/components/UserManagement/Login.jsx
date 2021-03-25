import React, { useEffect, useState } from "react";
import { login } from "../../actions/securityActions";
import { useStateValue } from "../../Store";

function Login(props) {
  const [loginRequest, setLoginRequest] = useState({
    username: "",
    password: ""
  });

  console.log("Login rendered");

  const {
    state: { errors, security },
    dispatch
  } = useStateValue();

  useEffect(() => {
    if (security.validToken) {
      props.history.push("/dashboard");
    }
  }, [security]);

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginRequest((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(loginRequest, dispatch);
  }

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control form-control-lg ${
                    errors.username && "is-invalid"
                  }`}
                  placeholder="Email Address"
                  name="username"
                  value={loginRequest.username}
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
                  value={loginRequest.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
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

export default Login;
