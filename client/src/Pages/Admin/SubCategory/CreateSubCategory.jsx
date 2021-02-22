import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Collapse from "@material-ui/core/Collapse";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { createSub } from "../../../functions/SubCategory";
import { getCategories } from "../../../functions/CategoryApi";
import { toast } from "react-toastify";
import SubCategoryList from "./SubCategoryList";

const CreateSubCategory = (props) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [name, setname] = useState("");
  const [parentId, setParentId] = useState("");
  const [listCheck, setListCheck] = useState(false);

  const handleClick = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    getCategories().then((res) => {
      setList(res.data);
    });
  }, [checked]);

  const handleSubmit = (e) => {
    e.preventDefault();

    createSub(name, parentId, user.token)
      .then((res) => {
        setname("");
        setChecked((prev) => !prev);
        setListCheck(prev=>!prev)
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <div className="pt-5">
        <h3>
          Create Sub category
          <span className="text-primary" onClick={handleClick}>
            {!checked && <AddCircleIcon />}
          </span>
        </h3>
      </div>
      <div>
        <Collapse in={checked}>
          <form className="d-flex flex-column mt-3" onSubmit={handleSubmit}>
            <fieldset className="mb-3">
              <select onChange={(e) => setParentId(e.target.value)}>
                <option disabled selected hidden>
                  Select Parent Category
                </option>
                {list.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="">
              <input
                className="input-box-category"
                type="text"
                placeholder="name"
                onChange={(e) => {
                  setname(e.target.value);
                }}
                value={name}
              />
              <button className="btn btn-primary btn-default ml-3">Add</button>
            </fieldset>
          </form>
        </Collapse>
      </div>
      <span className="sub-list pr-4 " onClick={() => setListCheck((prev) => !prev)}>
        <i className="fas fa-list pl-2" style={{ fontSize: "2rem" }}></i>
      </span>
      {listCheck && <SubCategoryList />}
    </>
  );
};

export default CreateSubCategory;
