import axios from "axios";

export const createSub =async (name, parentid, token) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API_DOMAIN}/subcategory`,
    { name, parentid },
    {
      headers:{ token},
    }
  );
};

export const getSubs =async () => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_API_DOMAIN}/subcategories`
  );
};

export const upadteSub=async (name,parent,slug,token)=>{

  return await axios.put(`${process.env.REACT_APP_BACKEND_API_DOMAIN}/subcategory/${slug}`,{name,parent},{headers:{token}})
}

export const deleteSub = async (slug,token) => {

  return await axios.delete(
    `${process.env.REACT_APP_BACKEND_API_DOMAIN}/subcategory/${slug}`,
    { headers: { token } }
  );
};



