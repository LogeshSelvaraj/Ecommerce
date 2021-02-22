import React,{useState,useEffect} from 'react'
import "./ProductCard.css"
import { useSelector } from "react-redux";


const ProductCard = ({product}) => {
    const [floatables,setfloatables]=useState(false)
    const {user} = useSelector(state => ({...state}))

    useEffect(()=>{
        if(user&&user.role==="admin"){
            setfloatables(true)
        }
    },[user])

 
    return (
        
    <div className="col-md-3 col-sm-6 my-4">
     
        <div className="product-grid" onClick={()=>console.log(product.title)}>
            <div className="product-image">
                <a href={`/product/${product._id}`} className="image">
                    <img className="pic-1 pt-4" src={product.images[0]?product.images[0].url : "/images/24369860.jpg" } alt="product"
                    />
                </a>
      
           { !floatables && <ul className="product-links">
                    <li><a href="#"><i className="fa fa-shopping-cart"></i> Add to cart</a></li>
                    <li className="text-left"><a href="#"><i className="fa fa-heart"></i>Wishlist</a></li>
                </ul>}
            </div>
            <div className="product-content">
                <a href={`/product/${product._id}`}> <h3 className="title">{product.title}</h3></a>
              <a href={`/product/${product._id}`}> <div className="price" style={{cursor:"pointer"}}>Rs.{product.price}</div></a>
            </div>
        </div>
    </div>
    

    )
}

export default ProductCard
