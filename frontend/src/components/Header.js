import React from "react";
import { Link, useHistory } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";

function Header({ openMenu }) {
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

  return (
    <header className="row">
      <div className="brand">
        <button className="open-sidebar" onClick={openMenu}>
          <i className="fa fa-bars"></i>
        </button>
        <Link className="brand" to="/">
          Paul & Shark
        </Link>
        <Link className="brand_small" to="/">
          P & S
        </Link>
      </div>
      <div>
        <SearchBox />
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
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown">
            <a href="http://localhost:5000/admin">
              Admin <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-content">
              <li>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
