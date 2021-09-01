import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_SUCCESS,
} from "../constants/categoriesConstants";

const initialState = {
  categories: [],
  brands: [],
  loading: false,
  error: null,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, loading: true };
    case FETCH_CATEGORIES_FAILED:
      return { ...state, loading: false, error: action.payload };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.categories,
        brands: action.brands,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
