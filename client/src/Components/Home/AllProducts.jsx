import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import ProductCard from "../Product/ProductCard";
import { getAllProducts, getTotalProductCount } from "../../functions/ProductApi";

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    loadPage();
  }, [page]);

  const loadPage = () => {
    getAllProducts(page)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
    getTotalProductCount()
      .then((res) => {
        setTotal(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="heading-2 text-center mt-5">All Prodcuts</h1>
      <div className="row w-100 products">
        {products && products.map((flag) => <ProductCard key={flag._id} product={flag} />)}
      </div>
      <br />
      <div className="row w-100">
        <div className="pb-3 home-pagination">
          <Pagination current={page} total={(total / 4) * 10} onChange={(value) => setPage(value)} />
        </div>
      </div>
    </>
  );
};

export default AllProducts;
