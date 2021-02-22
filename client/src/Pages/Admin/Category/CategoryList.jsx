import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { getCategories } from "../../../functions/CategoryApi";
import CategoryItem from "./CategoryItem";

import "./CategoryItem.css";
import LocalSearch from "../../../Components/LocalSearch,js/LocalSearch"

const CategoryList = forwardRef((props, ref) => {
  const [list, setList] = useState([]);
  const [render, setRender] = useState(false);
  const [keyword,setKeyword]=useState("")

  useEffect(() => {
    getCategories().then((res) => {
      setList(res.data);
    });
  }, [render]);

  const deleteItem = () => {
    setRender((prev) => !prev);
  };

  useImperativeHandle(ref, () => ({
    refresh() {
      setRender((prev) => !prev);
    },
  }));

  

  const search=(keywords)=>(item)=>{
     return item.name.toLowerCase().includes(keywords)
  }

  return (
    <div className="category-list p-5 w-50">
     
    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      {list.filter(search(keyword)).map((category, index) => {
        return (
          <CategoryItem
            key={index}
            slug={category.slug}
            name={category.name}
            delete={deleteItem}
          />
        );
      })}
    </div>
  );
});

export default CategoryList;
