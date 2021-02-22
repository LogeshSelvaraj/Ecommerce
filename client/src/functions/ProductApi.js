
import axios from "axios"

export const createProduct=async (token,payload)=>{

 
    return await axios.post(
         `${process.env.REACT_APP_BACKEND_API_DOMAIN}/product`,
         payload,
         { headers:{
             token,
        } })

}

export const getProducts=async(limit)=>{
    return await axios.get(
        `${process.env.REACT_APP_BACKEND_API_DOMAIN}/products-newarrivals/${limit}`
       )
}

export const getFlasgships=async(page)=>{
    return await axios.post(
        `${process.env.REACT_APP_BACKEND_API_DOMAIN}/product-flagship`,{page}
    )
}

export const remove=async(productId)=>{
    return await axios.delete(
        `${process.env.REACT_APP_BACKEND_API_DOMAIN}/product/${productId}`
    )
}

export const update=async(token,payload)=>{
    return await axios.put(  `${process.env.REACT_APP_BACKEND_API_DOMAIN}/product/`,payload,{
        headers:{token}
    })
}

export const getProduct=async(productId)=>{
    return await axios.get(`${process.env.REACT_APP_BACKEND_API_DOMAIN}/product/${productId}`)
}

export const getTotalFlagshipCount=async()=>{
    return await axios.get(`${process.env.REACT_APP_BACKEND_API_DOMAIN}/products-count-flagship/`)
}

export const getTotalProductCount=async()=>{
    return await axios.get(`${process.env.REACT_APP_BACKEND_API_DOMAIN}/products-count/`)
}

export const getAllProducts=async(page)=>{
    return await axios.post(`${process.env.REACT_APP_BACKEND_API_DOMAIN}/all-products/`,{page})
}

export const setProductStar=async(token,productId,star)=>{
    return await axios.post(`${process.env.REACT_APP_BACKEND_API_DOMAIN}//product/rating/`,{productId,star},{
        headers:{token}
    })
}

export const relatedProduct=async(productId)=>{
    return await axios.get(`${process.env.REACT_APP_BACKEND_API_DOMAIN}/product/related/${productId}`)
}




