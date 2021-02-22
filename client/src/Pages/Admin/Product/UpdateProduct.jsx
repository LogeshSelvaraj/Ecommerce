import React,{useState,useEffect} from 'react'
import ProductForm from '../../../Components/Product/ProductCreateForm';
import { getCategories } from "../../../functions/CategoryApi";
import { getSubs } from "../../../functions/SubCategory";
import { useSelector } from "react-redux";
import {update,getProduct} from '../../../functions/ProductApi'
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { CircularProgress } from '@material-ui/core';


const initialState = {
    _id:"",
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


const UpdateProduct = (props) => {
    const params=useParams();
    const id=params.id
    const [loading,setLoading]=useState(true)
    const {user}=useSelector((state)=>({...state}))
  const [values, setValues] = useState(initialState);
  const [images,setImages]=useState([]);
  const [specs, SetSpecs] = useState([]);
  const { title, description, price, stock, brand, categories, subcategories,category,subcategory} = values;

  
    const loadProduct=()=>{
        getProduct(id).then((res)=>{
            const product=res.data[0]
           
            setValues(prev=>{
                const updateState = {
                    _id:product._id,
                    title:product.title,
                    description:product.description,
                    price:product.price,
                    category:product.category,
                    subcategory:product.subcategory,
                    stock:product.stock,
                    brand:product.brand,
                    categories: prev.categories,
                    subcategories:prev.subcategories,
                  };
                  return updateState
            })
            setImages(product.images)
            SetSpecs(product.specs)
            setLoading(false)
        }).catch(err=>console.log(err))
    }

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
    loadProduct()
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
  
    update(user.token,payload).then((res)=>{
        toast.success(`${res.data.title} product updated`)
      }).catch((err)=>{
        toast.error(err.response.data)
      })
    }

  return (
   loading ? <div style={{ paddingTop: "200px" }}>
   <CircularProgress />
 </div>  :  <ProductForm
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
        category={category}
        subcategory={subcategory}
      /> 
  );
}

export default UpdateProduct
