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
} from "../constants/productConstants";

/* state takes empty array */
const productListInitialState = {
  loading: true,
  products: [],
  filteredProducts: [],
  error: null,
  categories: [],
};

export const productListReducer = (state = productListInitialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        categories: action.categories,
      };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PRODUCTS_BY_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        filteredProducts: action.payload,
      };
    case PRODUCTS_BY_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const productDetailInitialState = {
  product: {},
  loading: true,
  error: null,
};

export const productDetailsReducer = (
  state = productDetailInitialState,
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
