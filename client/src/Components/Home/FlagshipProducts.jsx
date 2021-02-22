import React,{useEffect,useState} from 'react'
import { Pagination } from "antd";
import ProductCard from '../Product/ProductCard'
import {getFlasgships,getTotalFlagshipCount} from '../../functions/ProductApi';

const FlagshipProducts = () => {
    const [page,setPage]=useState(1)
    const [total,setTotal]=useState()
    const [flagship,setFlagship]=useState()

    useEffect(()=>{
        loadPage()
    },[page])

    const loadPage=()=>{
        getFlasgships(page).then((res)=>{
            setFlagship(res.data)
        }  ).catch((err)=>console.log(err))
        getTotalFlagshipCount().then(res=>{
            setTotal(res.data)
        }).catch((err)=>console.log(err))
    }


    return (
        <>
              <h1 className="heading-2 text-center mt-5">
            Flagship Smartphones
          </h1>
          <div className="row w-100 products">
            {flagship && flagship.map((flag) => <ProductCard key={flag._id} product={flag} />)}
          </div>
          <br/>
          <div className="row w-100">
          <div className="pb-3 home-pagination">
            <Pagination current={page} total={(total/4)*10}  onChange={(value)=>setPage(value)} />
            </div>
            </div>
        </>
    )
}

export default FlagshipProducts
