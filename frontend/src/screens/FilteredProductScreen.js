import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { filteredListProducts } from "../actions/productActions";
import { useParams } from "react-router-dom";

export default function FilteredProductScreen() {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    filteredProducts: products,
  } = useSelector((state) => state.productList);
  const params = useParams();
  useEffect(() => {
    console.log(params.category);
    dispatch(filteredListProducts(params.category));
  }, [dispatch, params.category]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
