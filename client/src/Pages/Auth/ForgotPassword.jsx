import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Authform.css";

function ForgotPassword({ history }) {
  const user = useSelector((state) => state.user);
  const [email, emailState] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.token) history.push("/");
  });

  const handleSubmit = async () => {
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_RESET_LINK,
      handleCodeInApp: true,
    };
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        toast.success("Password Reset LInk has been sent to your given email ");
        emailState("");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && (
        <div className="loading-animation">
          <CircularProgress />
        </div>
      )}
      {!loading && (
        <div className="container">
          <div className="row">
            <div className="panel panel-primary allignment-form2">
              <div className="panel-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <h2>Forgot Password</h2>
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
                      onChange={(e) => {
                        emailState(e.target.value);
                      }}
                      value={email}
                    ></input>
                  </div>

                  <div className="form-group">
                    <button
                      id="signupSubmit"
                      type="submit"
                      className="btn  btn-block btn-primary"
                      style={{
                        opacity: !email ? 0.5 : 0.8,
                      }}
                      disabled={!email}
                    >
                      Send email
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
