import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import "./Authform.css";
import "./bootstrap-social.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";
import { createOrUpdateUser } from "../../functions/Api";


const Login = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, emailState] = useState("");
  const [password, passState] = useState("");
  const [loading, setLoading] = useState(false);


  const roleBasedRedirect = (role) => {
    let intended=history.location.state
    if(intended){
      history.push((intended.from))
    }
  else  if (role === "admin") {
      history.push("/admin/dashboard");
        dispatch({
          type: "LOGINAS_ADMIN",
        });
    } else {
      history.push("/");
      dispatch({
        type: "LOGINAS_USER",
      });
    }
  };

  useEffect(() => {
    // let intended=history.location.state
    // if(intended){
    //   return;
    // }else{
      if (user && user.token) roleBasedRedirect(user.role);
    // }
  },[user]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const idToken = (await result.user.getIdTokenResult()).token;

      createOrUpdateUser(idToken)
         
        .then((res) => {
           console.log(res);
          dispatch({
            type: "LOGIN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idToken,
              role: res.data.role,
              _id: res.data.id,
            },
          });
          roleBasedRedirect(res.data.role)
        })
        .catch((err) => console.log(err));

    } catch (err) {
      setLoading(false);
      toast.error(err.message);
      console.log(err);
    }
  }

  async function googleLogin(e) {
    e.preventDefault();
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const idToken = (await result.user.getIdTokenResult()).token;
        
      createOrUpdateUser(idToken)
        .then((res) => {
          dispatch({
            type: "LOGIN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idToken,
              role: res.data.role,
              _id: res.data.id,
            },
          });
          roleBasedRedirect(res.data.role);
        })
        .catch((err) => console.log(err));
        })

        // console.log(props);

        

        // dispatch(userState(props));

        // dispatch({
        //   type:"LOGIN_USER",
        //   payload:{
        //     user:result.user.email,
        //     token:result.user.getIdToken()
        //   }
        // })
     
      
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  }

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
            <div className="panel panel-primary allignment-form">
              <div className="panel-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <h2>Login</h2>
                  </div>
                  <div className="form-group">
                    <label className="control-label" htmlFor="signupEmail">
                      Email
                    </label>
                    <input
                      id="signupEmail"
                      type="email"
                      maxLength="50"
                      autoFocus
                      className="form-control"
                      onChange={(e) => {
                        emailState(e.target.value);
                      }}
                      value={email}
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
                      onChange={(e) => {
                        passState(e.target.value);
                      }}
                      value={password}
                    ></input>
                  </div>
                  <div className="form-group">
                    <button
                      id="signupSubmit"
                      type="submit"
                      className="btn  btn-block btn-primary"
                      style={{
                        opacity: !email || password.length < 6 ? 0.5 : 0.8,
                      }}
                      disabled={!email || password.length < 6}
                    >
                      Login with email
                    </button>
                  </div>
                  <div className="form-group">
                    <i
                      className="btn btn-block btn-social btn-google"
                      onClick={googleLogin} 
                    >
                      <span className="fab fa-google"></span>
                      <p className="oauth-button">Sign in with Google</p>
                    </i>
                  </div>

                  <p>
                    <a href="/forgot/password">Forgot password?</a> Not
                    registered? <a href="/register">Sign up here</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
