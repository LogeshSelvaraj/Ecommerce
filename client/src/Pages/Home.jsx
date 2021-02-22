import React, { useState, useEffect } from "react";
import ProductCard from "../Components/Product/ProductCard";
import { getProducts } from "../functions/ProductApi";
import "./Home.css";
import { CircularProgress } from "@material-ui/core";
import HomeBanner from "../Components/Animations/HomeBanner";
import AllProducts from '../Components/Home/AllProducts'
import FlagshipProducts from '../Components/Home/FlagshipProducts'

const Home = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNewArraivals();
  
  }, []);

 

  const loadNewArraivals = () => {
    getProducts(4)
      .then((res) => {
        setProducts(res.data);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {loading ? (
        <div className="circularprogress">
          <CircularProgress />
        </div>
      ) : (
        <>
        <HomeBanner/>
          <h1 className="heading-1 text-center">
            New Arrivals!
          </h1>
          <div className="row w-100 products">
            {products &&products.length&&
              products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
              <FlagshipProducts />
              <AllProducts/>
        </>
      )}
    </>
  );
};

export default Home;
