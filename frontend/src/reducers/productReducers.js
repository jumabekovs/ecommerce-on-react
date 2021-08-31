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
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
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
      return { ...state, loading: true, products: [] };
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
    case PRODUCT_DELETE_SUCCESS: {
      const products = state.products.filter((product) => {
        return product._id !== action.payload;
      });
      return {
        ...state,
        products,
      };
    }
    default:
      return state;
  }
};

const productCategoryListInitialState = {
  loading: true,
  categories: [],
};

export const productCategoryListReducer = (
  state = productCategoryListInitialState,
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case PRODUCT_CATEGORY_LIST_FAIL:
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

const productSaveInitialState = {
  product: {},
  loading: true,
  error: null,
};

export const productSaveReducer = (state = productSaveInitialState, action) => {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_SAVE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const productDeleteInitialState = {
  product: {},
};

export const productDeleteReducer = (
  state = productDeleteInitialState,
  action
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
