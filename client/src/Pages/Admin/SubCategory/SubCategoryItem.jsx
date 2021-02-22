import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "./SubCategoryItem.css";
import { upadteSub,deleteSub } from "../../../functions/SubCategory";
import { useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import { toast } from "react-toastify";

const SubCategoryItem = (props) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(props.name);
  const parentList=props.parentList
  const [parent,setParent]=useState(props.parent)

  const deleteItem = () => {
    const confrimMessage=window.confirm(`Delete ${props.name} ?`)
    confrimMessage &&  deleteSub(props.slug, user.token).then((res) => {
      toast.error(`${res.data.name} is deleted`)
      props.rerender()
    }
   ).catch((err)=>{
        toast.error(err.response.data)
   })
  };

 const handleEdit=()=>{

    upadteSub(editValue,parent,props.slug,user.token).then(()=>{
            setEdit(prev=>!prev)
            toast.success("updated succesfully")
            props.rerender()
        }).catch((err)=>{
            toast.error(err.response.data)
        })
  }

  return (
    <div className="category-item-box d-flex  text-center">
      <div className="content-1 d-flex align-items-center">
        {!edit ? (
            <>
          <div className="sub-name flex-1 w-75 text-left">
          <span >{props.name}</span>
          </div><div className="flex-1 text-righ parent-name"> 
          <span >({(parentList.filter((c)=>{return c._id===props.parent})).map(d=>d.name)})</span>
          </div>

          </>
        ) : (
            <>
            <div className="flex-1 w-75">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          ></input>
          </div>

           <div className="flex-1">
      <select onChange={(e)=>setParent((e.target.value))}> 
           {parentList.map((c)=><option key={c._id} value={c._id} selected={c._id===props.parent} >{c.name}</option>)} 
        </select>
      </div> 
          </>

        )}
      </div>
      <div className="content-2">
        {!edit ? (
          <span
            className="button-1 mr-2"
            onClick={() => {
              setEdit((prev) => !prev);
            }}
          >
            <EditIcon />
          </span>
        ) : (
          <span className="button-1 mr-2" onClick={handleEdit}>
            <DoneIcon />
          </span>
        )}
        <span className="button-2" onClick={deleteItem}>
          <DeleteIcon />
        </span>
      </div>
     
    </div>
  );
};

export default SubCategoryItem;