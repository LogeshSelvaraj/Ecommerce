import firebase from "firebase"


  // var firebaseConfig = {
  //   apiKey: process.env.REACT_APP_API_KEY,
  //   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  //   databaseURL: process.env.REACT_APP_DATABASE_URL,
  //   projectId: process.env.REACT_APP_PROJECT_ID,
  //   storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
  //   messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
  //   appId:process.env.REACT_APP_APP_ID,
  //   measurementId:process.env.REACT_APP_MEASUREMENT_ID,
  // };


  var firebaseConfig = {
    apiKey: "AIzaSyC7L6EK1t0MoEhLqU0npDBf9BbiLK74kck",
    authDomain: "ecommerce-6a1b0.firebaseapp.com",
    databaseURL: "https://ecommerce-6a1b0.firebaseio.com",
    projectId: "ecommerce-6a1b0",
    storageBucket: "ecommerce-6a1b0.appspot.com",
    messagingSenderId: "708754772114",
    appId: "1:708754772114:web:8bb1be18518ae7e67ad64b",
    measurementId: "G-ZMQB2CEMBZ",
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

//   export
export const auth=firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
