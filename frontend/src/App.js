import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useHistory } from "react-router-dom";
import { signout } from "./actions/userActions";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import FilteredProductScreen from "./screens/FilteredProductScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";

function App() {
  const categories = useSelector((state) => state.productList.categories);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const history = useHistory();
  const dispatch = useDispatch();

  const signoutHandler = (e) => {
    e.preventDefault();
    dispatch(signout(history));
  };
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <div className="grid-container">
      <header className="row">
        <div className="brand">
          <button onClick={openMenu}>&#9776;</button>
        </div>
        <div>
          <Link className="brand" to="/">
            Collibris
          </Link>
        </div>
        <div>
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  <Link to="/signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </div>
      </header>
      <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu}>
          х
        </button>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <Link to={`/category/${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <main>
        <Route
          path="/category/:category"
          component={FilteredProductScreen}
        ></Route>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <footer className="row center">All Rights Reserved</footer>
    </div>
  );
}

export default App;
