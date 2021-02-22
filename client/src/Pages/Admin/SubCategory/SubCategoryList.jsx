import React,{useEffect,useState} from 'react'
import SubCategoryItem from "./SubCategoryItem"
import {getSubs} from "../../../functions/SubCategory"
import {getCategories} from "../../../functions/CategoryApi"

const SubCategoryList = (props) => {

    const [list,setList]=useState([])
    const [parentList,setParentList]=useState([])

    useEffect(()=>{
        loadSubs()
        getCategories().then((res) => {
            setParentList(res.data);
    })},[])
    
    const loadSubs=()=>{
        getSubs().then((res)=>{
            setList(res.data)
        })
    }


    const rerender=()=>{
        loadSubs()
    }
  
    return (
        <div className="w-75">

            {list.map((c)=>{
                return <SubCategoryItem parentList={parentList} key={c._id} parent={c.category}  name={c.name} slug={c.slug} rerender={rerender} />
            })}
     
        </div>
    )
}

export default SubCategoryList
