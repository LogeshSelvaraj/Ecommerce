import axios  from 'axios'

export const createCategory = async (category,token) => {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_API_DOMAIN}/category`,
      {name:category},
      { headers: { token } }
    );
  };
  
  export const getCategories=async () =>{
      return await axios.get(`${process.env.REACT_APP_BACKEND_API_DOMAIN}/categories`)
  }

  export const deleteCategory = async (slug,token) => {
    return await axios.delete(
      `${process.env.REACT_APP_BACKEND_API_DOMAIN}/category/${slug}`,
      { headers: { token } }
    );
  };

  export const editCategory= async (slug,category,token) => {
    return await axios.put(
      `${process.env.REACT_APP_BACKEND_API_DOMAIN}/category/${slug}`,{name:category},
      { headers: { token } }
    );
  };