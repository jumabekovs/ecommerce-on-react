import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  listProducts,
  saveProduct,
} from "../actions/productActions";
import MessageBox from "../components/MessageBox";
import { MEDIA_URL } from "../constants/apiConstants";

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const productList = useSelector((state) => state.productList);
  const { products, error } = productList;
  const productSave = useSelector((state) => state.productSave);
  const { success: successSave } = productSave;

  const dispatch = useDispatch();

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault(); // it wont refresh the page
    dispatch(
      saveProduct(
        {
          _id: id,
          name,
          price,
          image,
          brand,
          category,
          countInStock,
        },
        file
      )
    );
  };
  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {};
  }, [successSave, dispatch]);

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0] || null;
    setFile(file);
  };

  return (
    <div>
      <div className="content content-margined">
        <div className="product-header">
          <h3>Products</h3>
          <button className="button primary" onClick={() => openModal({})}>
            Create Product
          </button>
        </div>
        {modalVisible && (
          <form className="form" onSubmit={submitHandler}>
            <div>
              <h1>Create Product</h1>
            </div>
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Enter name"
                required
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                value={price}
                placeholder="Enter price"
                required
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="image">Image</label>
              {file ? (
                <img src={URL.createObjectURL(file)} alt="preview" />
              ) : image ? (
                <img src={MEDIA_URL + image} alt="product" />
              ) : null}
              <input type="file" onChange={handleFileUpload} />
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                value={brand}
                placeholder="Enter brand"
                required
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={category}
                placeholder="Enter category"
                required
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                type="text"
                id="countInStock"
                value={countInStock}
                placeholder="Enter countInStock"
                required
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                {id ? "Update" : "Create"}
              </button>
              <button
                className="secondary"
                onClick={() => setModalVisible(false)}
                type="button"
              >
                <i className="fa fa-caret-left" aria-hidden="true"></i>
                <i className="fa fa-caret-left" aria-hidden="true"></i> Go Back
              </button>
            </div>
          </form>
        )}

        <div className="product-list">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="button"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductsScreen;
