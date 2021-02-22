import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { getProduct ,setProductStar} from "../../functions/ProductApi";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings"
import RatingModal from '../Animations/RatingModal'
import AverageRating from '../Animations/AverageRating'
import RelatedProducts from '../Home/RelatedProducts';
import "./SingleProduct.css";

const SingleProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [floatables, setfloatables] = useState(false);
  const params = useParams();
  const [product, setProduct] = useState();
const [star,setStar]=useState(0)

  useEffect(() => {
    getProduct(params.id)
      .then((res) => setProduct(res.data[0]))
      .catch((err) => console.log(err));
    if (user && user.role === "admin") {
      setfloatables(true);
    }
  }, [user]);

  useEffect(()=>{
    if(product&&user){
        const existingRating = product.ratings.find(
            (ele) => ele.postedBy.toString() === user._id.toString()
          );
          existingRating && setStar(existingRating.star)
    }
  },[product,user])

  const changeRating=(newRating,name)=>{
      console.log(newRating,name)
      setStar(newRating)
        setProductStar(user.token,name,newRating)
  }


  return (
    <>
    <div className="row w-100">
      {product && (
        <>
          <div className="col-12 ">
            <h3 className="single-title">{product.title}</h3>
            <div className="d-flex flex-row ratings">
             <AverageRating ratings={product.ratings}/>
            </div>
          </div>
          <div className="col-md-5 image-carousel">
            <Carousel showArrows={false} showIndicators={false} autoPlay infiniteLoop>
              {product.images.length ? (
                product.images.map((img) => <img key={img.public_id} src={img.url} alt="product" />)
              ) : (
                <img src="/Images/24369860.jpg" alt="default product" />
              )}
            </Carousel>
          </div>
          <div className="col-md-7 detail">
            <h4>Description</h4>
            <p className="description">{product.description}</p>
            <div className="row">
              <div className="col-md-7">
                <h4>Specifications</h4>
                <ul style={{ listStyle: "none" }} className="list-group">
                  {product.specs.map((s) => {
                    return (
                      <li className="w-100  row">
                        <span className="d-block col-5 h6">{s.name}</span>
                        <span className="d-block text-right col-7">
                          <span>{s.detail}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {!floatables && (
                <div className="col-md-5 mt-5 product-links">
                  <a href={`/`}>
                    <span className="d-block btn btn-primary w-75 mb-3 m-auto ">Buy Now</span>
                  </a>
                  <div className="mt-3"></div>
                  <a href={`/`}>
                    <span className="d-block btn btn-primary w-75 m-auto">
                      <i className="fa fa-shopping-cart "></i> Add to cart
                    </span>
                  </a>
                   <RatingModal>
                  <StarRatings
                rating={star}
                changeRating={(newRating,name)=>changeRating(newRating,name)}
                numberOfStars={5}
                name={product._id}
                starRatedColor="green"
                starHoverColor="green"
                starDimension="25px"
                starSpacing="3px"
              />
                  </RatingModal> 
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
    <div className="row">
          <RelatedProducts productId={params.id}/>
    </div>
    </>
  );
};

export default SingleProduct;
