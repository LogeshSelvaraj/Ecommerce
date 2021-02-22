import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "./CategoryItem.css";
import { deleteCategory,editCategory } from "../../../functions/CategoryApi";
import { useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import { toast } from "react-toastify";

const CategoryItem = (props) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(props.name);

  const deleteItem = () => {
    const confrimMessage=window.confirm(`Delete ${props.name} ?`)
    confrimMessage &&  deleteCategory(props.slug, user.token).then((res) => {
      props.delete()
      toast.error(`${res.data.name} is deleted`)
    
    }
   );
  };

 const handleEdit=()=>{
        editCategory(props.name,editValue,user.token).then(()=>{
            setEdit(prev=>!prev)
            props.delete()
        })
  }

  return (
    <div className="category-item-box d-flex  text-center">
      <div className="content-1">
        {!edit ? (
          <span>{props.name}</span>
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          ></input>
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

export default CategoryItem;
