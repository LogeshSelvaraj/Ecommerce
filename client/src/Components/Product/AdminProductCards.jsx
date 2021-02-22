import React from "react";
import AverageRating from '../Animations/AverageRating'
import "./AdminProductCard.css";

const AdminProductCard = ({ product,handleEdit,handleRemove }) => {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-10">
            <div className="row p-2 bg-white border rounded">
              <div className="col-md-3 mt-1">
                <img
                  className="img-fluid img-responsive rounded product-image"
                  src={product.images[0] ? product.images[0].url : "/Images/24369860.jpg"}
                  alt="product"
                style={  product.images[0] ? { height: "280px", width: "135px", margin: "10px 0 0 30px",objectFit:"contain" } : {}}
                />
              </div>
              <div className="col-md-6 mt-1">
                <h5>{product.title}</h5>
                <div className="d-flex flex-row">
                  <AverageRating ratings={product.ratings}/>
                </div>
                <div className="mt-1 mb-1 spec-1">
                  {product.specs.map((spec) => {
                    return (
                      <div key={spec._id}>
                        <span >
                          {spec.name} : {spec.detail}
                        </span>
                        <br />
                      </div>
                    );
                  })}
                  <br />
                </div>
                <p className="text-justify text-truncate para mb-0">
                  {product.description}
                  <br />
                  <br />
                </p>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1 m-auto">
                <div className="d-flex flex-row align-items-center">
                  <h4 className="mr-1">Rs.{product.price}</h4>
                </div>
             
                <div className="d-flex flex-column mt-4">
                  <button className="btn btn-primary btn-sm" type="button" onClick={()=>handleEdit(product)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm mt-2" type="button" onClick={()=>handleRemove(product._id,product.title)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductCard;
