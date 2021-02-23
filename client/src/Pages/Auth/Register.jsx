import React from "react";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "./Authform.css";

const Register = ({history}) => {
  const user = useSelector((state) => state.user);
  const [email, emailState] = useState("");

  useEffect(() => {
    if (user && user.token) history.push("/");
  });

  const handleChange = (event) => {
    emailState(event.target.value);
  };

  const handleSubmit = async (e) => {
    console.log(email);
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_PATH,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Please verify the confirmation link send to the the ${email}`
    );

    window.localStorage.setItem("emailForSignIn", email);

    emailState("");
  };

  return (
    <div className="firstPageregister">
      <div className="container">
        <div className="row">
          <div className="panel panel-primary allignment-form">
            <div className="panel-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <h2>Create account</h2>
                </div>
                <div className="form-group">
                  <label className="control-label" htmlFor="signupEmail">
                    Email
                  </label>
                  <input
                    id="signupEmail"
                    type="email"
                    maxLength="50"
                    className="form-control"
                    onChange={handleChange}
                    value={email}
                  ></input>
                </div>
                <div className="form-group">
                  <button
                    id="signupSubmit"
                    type="submit"
                    className="btn  btn-block btn-primary"
                    style={{ opacity: 0.8 }}
                  >
                    Next
                  </button>
                </div>
                <p style={{ textAlign: "center" }}>
                  Already have an account? <a href="#">Sign in</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
