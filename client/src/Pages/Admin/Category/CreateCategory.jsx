import React, { useState } from "react";
import {useSelector} from 'react-redux';
import Collapse from "@material-ui/core/Collapse";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {createCategory} from "../../../functions/CategoryApi"
import { toast } from "react-toastify";
import "./CreateCategory.css"

const CreateCategory = (props) => {
    const {user}=useSelector((state)=>({...state}))
  const [checked, setChecked] = useState(false);
  const [name,setname]=useState("")

  const handleClick = () => {
    setChecked((prev) => !prev);
  };

  const handleSubmit=(e)=>{
      e.preventDefault()
      createCategory(name,user.token).then((res)=>{
          setname("")
          setChecked(prev=>!prev)
          props.rerender()
          toast.success(`${res.data.name} is created`)
      }).catch((err)=>{
                 toast.error(err.response.data)
      })

  }

  return (
    <>
      <div>
        <h3>
          Create category 
          <span className="text-primary" onClick={handleClick}>
           {!checked && <AddCircleIcon />} 
          </span>
        </h3>
      </div>
      <div>
        
        <Collapse in={checked}>
          <form className="" onSubmit={handleSubmit}>
          <fieldset className="d-inline-flex vertical-align-middle mt-3">
          <input className="input-box-category" type="text" placeholder="name" onChange={(e)=>{setname(e.target.value)}}  value={name}/> 
            <button className="btn btn-primary btn-default ml-3">Add</button>
          </fieldset>
          </form>
        </Collapse>
      </div>
    </>
  );
};

export default CreateCategory;
