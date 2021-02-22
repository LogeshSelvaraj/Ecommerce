import React from 'react'
import ImageUpload from "./ImageUpload";
import Specs from "./Specs";

const ProductCreateForm = (
   { handleChange,
    handleSubmit,
    specs,
    SetSpecs,
    images,
    setImages,
    categories,
    subcategories,
    title,
    description,
    price,
    stock,
    brand,
    category,
    subcategory
   }) => {

    return (
        <>
      <h3 className="py-3">Create new product</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input className="form-control" id="title" onChange={handleChange} value={title} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            className="form-control"
            id="description"
            value={description}
            onChange={handleChange} required
          />
        </div>
        <Specs specs={specs} SetSpecs={SetSpecs}/>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            id="price"
            value={price}
            onChange={handleChange}
            placeholder="Enter price in rupees"
            required
          ></input>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select className="form-control" id="category" onChange={handleChange} required defaultValue={category}>
           {! category && <option value="">Select a Category</option>}
            {categories.map((c) => 
             (
              <option key={c.name} value={c._id} s>{c.name}</option>
            )
            )}
          </select>
        </div>
        <div className="form-group">
          <label>Sub Category</label>
          <select className="form-control" id="subcategory" onChange={handleChange} required defaultValue={subcategory}>
         { !subcategory && <option value="">Select a Sub Category</option>}   
            {subcategories.map((c) => (
              <option key={c.name} value={c._id}>{c.name} </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input className="form-control" id="stock" value={stock} onChange={handleChange} required></input>
        </div>
        <div className="form-group">
          <label>Brand</label>
          <input className="form-control" id="brand" value={brand} onChange={handleChange} required></input>
        </div>
          <ImageUpload images={images} setImages={setImages} />
        <button className="btn btn-primary mb-5" type="submit">
          Submit
        </button>
      </form>
    </>
    )
}

export default ProductCreateForm
