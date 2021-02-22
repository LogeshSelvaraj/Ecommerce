import React, { useState, useEffect } from "react";
import { getCategories } from "../../../functions/CategoryApi";
import { getSubs } from "../../../functions/SubCategory";
import {createProduct} from '../../../functions/ProductApi'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductForm from '../../../Components/Product/ProductCreateForm'


const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subcategory: "",
  stock: "",
  brand: "",
  categories: [],
  subcategories: [],
};

const CreateProducts = () => {
  const {user}=useSelector((state)=>({...state}))
  const [values, setValues] = useState(initialState);
  const [images,setImages]=useState([]);
  const [specs, SetSpecs] = useState([
    {
      name: "",
      detail: "",
    },
    {
      name: "",
      detail: "",
    },
    {
      name: "",
      detail: "",
    },
    {
      name: "",
      detail: "",
    },
  ]);
  const { title, description, price, stock, brand, categories, subcategories } = values;

  const loadcategory = () => {
    getCategories().then((res) => {
      setValues((prev) => {
        return {
          ...prev,
          categories: res.data,
        };
      });
    });
  };

  const loadSubcategory = () => {
    getSubs().then((res) => {
      setValues((prev) => {
        return {
          ...prev,
          subcategories: res.data,
        };
      });
    });
  };

  useEffect(() => {
    loadcategory();
    loadSubcategory();
  }, []);

  const handleChange = (e) => {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

 

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload={values,specs,images}
  
    createProduct(user.token,payload).then((res)=>{
        toast.success(`${res.data.title} product created`)
      }).catch((err)=>{
        toast.error(err.response.data)
      })
    }

  return (
      <ProductForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        specs={specs}
        SetSpecs={SetSpecs}
        images={images}
        setImages={setImages}
        categories={categories}
        subcategories={subcategories}
        title={title}
        description={description}
        price={price}
        stock={stock}
        brand={brand}
      />
  );
};

export default CreateProducts;
