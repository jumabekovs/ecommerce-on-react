import Axios from "axios";
import {
  PRODUCTS_BY_CATEGORY_FAIL,
  PRODUCTS_BY_CATEGORY_REQUEST,
  PRODUCTS_BY_CATEGORY_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get("/api/products");

    const categoriesSet = new Set();

    data.map((product) => {
      return categoriesSet.add(product.category);
    });

    const categories = Array.from(categoriesSet);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data, categories }); // to get an array add .products
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      const { data } = await Axios.post("/api/products", product, {
        headers: { Authorization: "Bearer " + userInfo.token },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        `/api/products/${product._id}`,
        product,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

export const filteredListProducts = (productCategory) => async (dispatch) => {
  dispatch({
    type: PRODUCTS_BY_CATEGORY_REQUEST,
    payload: productCategory,
  });
  try {
    const { data } = await Axios.get(`/api/category/${productCategory}`);
    dispatch({ type: PRODUCTS_BY_CATEGORY_SUCCESS, payload: data }); // to get an array add .products
  } catch (error) {
    dispatch({ type: PRODUCTS_BY_CATEGORY_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // shows occured error
          : error.message,
    });
  }
};
