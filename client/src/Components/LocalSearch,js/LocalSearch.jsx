import React from 'react'
import "./LocalSearch.css"
import SearchIcon from '@material-ui/icons/Search';

const LocalSearch = ({keyword,setKeyword}) => {

    const handleChange=(e)=>{
        console.log(e.target.value)
        setKeyword(e.target.value.toLowerCase())
    }

    return (
        <div className="my-4  search-box ">
      <input className="input-box text-center" type="text" placeholder="search" value={keyword} onChange={handleChange}></input><span className="float-right"><SearchIcon/></span>
      </div>
    )
}

export default LocalSearch
