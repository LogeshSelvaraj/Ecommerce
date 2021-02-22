import React, { useState, useEffect } from "react";
import Sidebar from "../../../Components/Sidebarf/Sidebar";
import AdminProductCard from "../../../Components/Product/AdminProductCards";
import { getProducts,remove } from "../../../functions/ProductApi";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-toastify";

const AdminDashBoard = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    getProducts(20)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const handleEdit=(prod)=>{
     history.push(`/admin/update-product/${prod._id}`)
  }

  const handleRemove=(productId,productTitle)=>{
    const confirm=window.confirm(`Do you really want to delete the product ${productTitle}`)
   confirm &&  remove(productId).then((res)=>{
        loadProducts()
        toast.error(res.data+" delete successfully")
      }).catch((err)=>toast.error(err.data))

  }

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-lg-10 col-md-9 d-flex align-items-center flex-column ">
          {loading ? (
            <div style={{ paddingTop: "200px" }}>
              <CircularProgress />
            </div>
          ) : (
            <>
              {products.map((product) => {
                return <AdminProductCard key={product.title} product={product} handleEdit={handleEdit} handleRemove={handleRemove} />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
