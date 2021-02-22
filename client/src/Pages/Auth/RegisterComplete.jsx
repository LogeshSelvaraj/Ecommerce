import React from "react";
import { useState, useEffect } from "react";
import "./Authform.css";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const RegisterComplete = ({ history }) => {
  const [email, emailState] = useState("");
  const [password, passState] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.token) history.push("/");
  });

  useEffect(() => {
    emailState(window.localStorage.getItem("emailForSignIn"));
  }, []);

  const handleChange = (e) => {
    passState(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (password.length < 6) {
      toast.error("Please enter proper password");
      return;
    }

    e.preventDefault();
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        const user = auth.currentUser;
        await user.updatePassword(password);
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="SecondPageregister">
      <div className="container">
        <div className="row">
          <div className="panel panel-primary allignment-form2">
            <div className="panel-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <h2>Complete Registartion</h2>
                </div>
                <div className="form-group">
                  <label className="control-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    value={email}
                    disabled
                  ></input>
                </div>
                <div className="form-group">
                  <label className="control-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    maxLength="25"
                    className="form-control"
                    onChange={handleChange}
                    value={password}
                    autoFocus
                  ></input>
                </div>
                <div className="form-group">
                  <button
                    id="signupSubmit"
                    type="submit"
                    className="btn  btn-block btn-primary"
                    style={{ opacity: 0.8 }}
                  >
                    Register
                  </button>
                </div>
                <p style={{ textAlign: "center" }}>
                  Already have an account? <a href="/login">Sign in</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
