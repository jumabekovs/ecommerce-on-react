import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import { USER_SIGNOUT } from "../constants/userConstants";

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload), // finding right element to remove it
      };
    case USER_SIGNOUT:
      return initialState;
    default:
      return state;
  }
};
