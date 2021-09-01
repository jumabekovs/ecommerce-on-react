import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../actions/categoriesActions";
import SearchBoxInline from "./SearchBoxInline";

function Sidebar({ isOpen, toggle }) {
  const dispatch = useDispatch();

  const { categories = [], brands = [] } = useSelector(
    (state) => state.categoriesState
  );

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <aside className={isOpen ? "sidebar open" : "sidebar"}>
      <div className="sidebar_search">
        <SearchBoxInline />
      </div>
      <h3 id="sidebar">Shopping Categories</h3>
      <button className="sidebar-close-button" onClick={toggle}>
        <i className="fa fa-close"></i>
      </button>
      <div className="sidebar-inner">
        <p>Categories</p>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <Link
                onClick={toggle}
                to={`/?category=${encodeURIComponent(category)}`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-inner">
        <p>Brands</p>
        <ul>
          {brands.map((category) => (
            <li key={category}>
              <Link
                onClick={toggle}
                to={`/?brand=${encodeURIComponent(category)}`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
