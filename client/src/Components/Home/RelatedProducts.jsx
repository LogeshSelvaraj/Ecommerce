import React,{useEffect,useState} from 'react'
import {relatedProduct} from '../../functions/ProductApi'
import ProductCard  from '../Product/ProductCard';

const RelatedProducts =({productId}) => {
    const [products,setProducts]=useState([])

    useEffect(()=>{
        relatedProduct(productId).then(res=>{
            setProducts(res.data)
        }).catch(err=>console.log(err))
    },[])
    return (
        <>
     {products.length && <h1 className="heading-2 text-center mt-5 related-heading">Related Prodcuts</h1>} 
      <div className="row w-100 products">
        {products && products.map((flag) => <ProductCard key={flag._id} product={flag} />)}
      </div>
    </>
    )
}

export default RelatedProducts
