import {
  PRODUCTS_BY_CATEGORY_FAIL,
  PRODUCTS_BY_CATEGORY_REQUEST,
  PRODUCTS_BY_CATEGORY_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
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
import $api from "../services/api";
import { toast } from "react-toastify";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await $api.get("/api/products");

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

export const saveProduct =
  (product, image = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
      const {
        userSignin: { userInfo },
      } = getState();
      const formData = new FormData();
      for (const key in product) {
        if (key !== "_id") {
          formData.append(key, product[key]);
        }
      }
      if (image) {
        formData.append("image", image);
      }
      if (!product._id) {
        const promise = $api.post("/api/products", formData, {
          headers: {
            Authorization: "Bearer " + userInfo.token,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.promise(promise, {
          pending: "Creating proccess...",
          success: "Successfully Created 👌",
          error: "Error in Creating 🤯",
        });

        const { data } = await promise;

        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        const promise = $api.put(`/api/products/${product._id}`, formData, {
          headers: {
            Authorization: "Bearer " + userInfo.token,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.promise(promise, {
          pending: "Updating proccess...",
          success: "Successfully Updated 👌",
          error: "Error in Updating 🤯",
        });

        const { data } = await promise;

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
    const { data } = await $api.get(`/api/category/${productCategory}`);
    dispatch({ type: PRODUCTS_BY_CATEGORY_SUCCESS, payload: data }); // to get an array add .products
  } catch (error) {
    dispatch({ type: PRODUCTS_BY_CATEGORY_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await $api.get(`/api/products/${productId}`);
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

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const promise = $api.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    toast.promise(promise, {
      pending: "Deleting proccess...",
      success: "Successfully Deleted 👌",
      error: "Error in Deleting 🤯",
    });

    await promise;
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: productId,
      success: true,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message // shows occured error
          : error.message,
    });
  }
};
