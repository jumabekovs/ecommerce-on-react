import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_SUCCESS,
} from "../constants/categoriesConstants";
import $api from "../services/api";

export const fetchCategories = () => async (dispatch) => {
  dispatch({
    type: FETCH_CATEGORIES,
  });

  try {
    const { data } = await $api.get(`/api/products`);
    const categoriesSet = new Set();
    const brandsSet = new Set();

    data.map((product) => {
      return categoriesSet.add(product.category);
    });

    data.map((product) => {
      return brandsSet.add(product.brand);
    });

    const categories = Array.from(categoriesSet);
    const brands = Array.from(brandsSet);

    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      categories,
      brands,
    });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORIES_FAILED, payload: error.message });
  }
};
