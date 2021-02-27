import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router'
import ProductCard from '../Product/ProductCard'
import {categoryBasedProducts} from '../../functions/ProductApi'

const Category = () => {
    const [products,setProducts]=useState()
    const params=useParams()
    useEffect(()=>{
        categoryBasedProducts(params.id).then(res=>setProducts(res.data)).catch(err=>console.log(err))
    },[])
  
    return (
        <>
        <div className="category-body">
        <h1 className="heading-2 text-center pt-5">
        {params.name} Products
      </h1>
      <div className="row w-100 products">
        {products &&products.length&& products.map((flag) => <ProductCard key={flag._id} product={flag} />)}
      </div>
      </div>
        </>
    )
}

export default Category
