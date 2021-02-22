import axios from "axios"

export const createOrUpdateUser = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API_DOMAIN}/create-or-update-user`,
    {},
    { headers: { token: token } }
  );
};

export const getUser= async (token)=>{
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API_DOMAIN}/get-user`,
    {},
    { headers: { token: token } }
  );
}

export const getAdmin = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API_DOMAIN}/get-admin`,
    {},
    { headers: { token } }
  );
};


