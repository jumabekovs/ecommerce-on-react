import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import useQueries from "../services/useQueries";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import Product from "./Product";

function ProductsList() {
  const { queries } = useQueries();

  const { products, loading, error } = useSelector(
    (state) => state.productList
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(listProducts(queries));
  }, [dispatch, queries]);

  if (loading) return <LoadingBox />;
  if (error) return <MessageBox variant="danger">{error}</MessageBox>;
  if (products.length === 0)
    return <MessageBox variant="danger">Product Not Found</MessageBox>;

  return (
    <div className="row center">
      {products.map((product) => (
        <Product key={product._id} product={product}></Product>
      ))}
    </div>
  );
}

export default React.memo(ProductsList);
